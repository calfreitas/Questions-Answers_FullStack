import { useEffect, useState } from 'react';
import createInstanceAxios from '../Components/axios';
import { RefreshCcw, ChevronDown, ChevronUp, CircleX, CirclePlus, Trash2, Pencil } from 'lucide-react';
import LogoImageBackground from '../Components/sidenLogoDash';
import { all } from 'axios';

const axiosInstance = createInstanceAxios();

interface Users {
  name: string;
  cellphone?: string;
  base?: string;
};


function UsersManagement() {

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [allUsersFiltered, setAllUsersFiltered] = useState<Users[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [clickNewUser, setClickNewUser] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [idUser, setIdUser] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [cellphone, setCellphone] = useState<string>("");
  const [base, setBase] = useState<string>("");

  const [filters] = useState(["Sem Filtro"])

  useEffect(() => {
    async function getData() {
      await getAllUsers();
    }
    getData()

  }, []
  );

  async function getAllUsers() {
    setLoading(true);


    try {
      const response = await axiosInstance.get('/users/getUsers', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response) return

      response.data.map((item: any) => {
        if (!filters.find((cacheItem) => item.base == cacheItem)) {
          filters.push(item.base)
        }

      })

      setAllUsers(response.data);
      setAllUsersFiltered(response.data)
      setLoading(false);

      return response

    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setAllUsers([]);

    } finally {
      setLoading(false);

    }
  };

  async function sendDataUser(name: string, cellphone: string, base: string) {
    setLoading(true);
    const usernameInput = name.toUpperCase().toString();
    const baseInput = base.toUpperCase().toString();
    try {
      const responseNewuser = await axiosInstance.post('/users/postCreateUsers',
        { name: usernameInput, cellphone, base: baseInput, id_user_creation: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log('Usuário criado:', responseNewuser.data);

    } catch (error) {
      console.error("Erro ao criar novo usuário", error);

    } finally {
      setLoading(false);

    }
  };

  async function sendDataUserEdited(idUser: number, name: string, cellphone: string, base: string) {
    setLoading(true);
    try {
      const responseEditUser = await axiosInstance.put("/users/putUsers",
        { id: idUser, name, cellphone, base }, // Corpo da requisição correto
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclua o token se necessário
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Usuário editado:", responseEditUser.data);
    } catch (error) {
      console.error("Erro ao editar novo usuário", error);

    } finally {
      setLoading(false);

    }
  }

  async function deleteUser(idUser: number) {
    setLoading(true);
    try {
      const response = await axiosInstance.delete("/users/deleteUser", {
        data: { id: idUser }, // O corpo da requisição DELETE deve estar dentro de "data"
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Usuário deletado:", response.data);
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
    } finally {
      setLoading(false);
    }
  }


  function filterByBase(filter: string) {
    let cacheData: Users[] = []
    if (filter === "Sem Filtro") return setAllUsersFiltered(allUsers)
    allUsers.map((item) => {
      if (item.base?.includes(filter)) {
        cacheData.push(item)
      }

    })
    setAllUsersFiltered(cacheData)

  }

  return (
    <>
      <div className="flex mt-20 h-[calc(100vh-5rem)]">

        {/*div dos usuários*/}
        <section className="w-full bg-gray-900 flex flex-col gap-10 items-center justify-start overflow-hidden p-0 m-0">
          <LogoImageBackground />
          <div className="w-full flex flex-row justify-center gap-5 max-h-screen text-center text-lg text-white font-semibold z-10 p-2">
            <p className="text-white">Gerenciar usuários WhatsApp</p>
            {loading ? (
              <RefreshCcw className="active:opacity-50 transition-transform animate-spin"
                color="white" />
            ) : (
              <button onClick={async () => { await getAllUsers(); }}> <RefreshCcw className='active:opacity-50' /></button>
            )}
          </div>
          <div className="w-full flex flex-row md:flex-row justify-center items-center gap-5 md:gap-20">

            <button
              className={`w-40 h-[40px] flex flex-row items-center justify-center gap-2 border rounded-md z-10 transition active:opacity-50 ${clickNewUser ? "bg-red-900 text-white" : "bg-green-500 text-white"}`}
              onClick={() => {
                setClickNewUser(!clickNewUser);
              }}>
              {clickNewUser ? <CircleX /> : <CirclePlus />}
              {clickNewUser ? "Cancelar" : "Criar Novo"}
            </button>

            {/* Botão Filtrar */}
            {!clickNewUser ? (
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-between w-40 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
                  {selectedFilter || "Filtrar Base"}
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setSelectedFilter(filter);
                          setIsOpen(false);
                          filterByBase(filter)
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition">
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* Formulário Criar Novo */}
          {clickNewUser ? (
            <div className="w-full max-w-[1024px] z-10 flex justify-center">
              <section id="newUser" className="flex flex-col mt-20 md:mt-10 gap-2 max-w-[500px] w-[90%]">
                <p className="text-white font-semibold text-sm md:text-base">Novo Usuário</p>
                <input
                  id="name"
                  type="text"
                  className="md:w-[100%] border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium uppercase tracking-wide"
                  placeholder="Nome"
                  maxLength={200}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="text-white font-semibold text-sm md:text-base">Telefone</p>
                <input
                  type="text"
                  className="md:w-[100%] border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                            text-lg font-medium uppercase tracking-wide"
                  placeholder="554199999999"
                  value={cellphone}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, "");
                    if (value.length > 12) {
                      value = value.slice(0, 12);
                    }
                    setCellphone(value);
                  }}
                />
                <p className="text-white font-semibold text-sm md:text-base">Base</p>
                <input type="text"
                  className="md:w-[100%] border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium uppercase tracking-wide mb-5"
                  placeholder="SBXY"
                  maxLength={4}
                  onChange={(e) => setBase(e.target.value)}
                />
                <button
                  disabled={!(name.length > 0 && cellphone.length > 0 && base.length > 0)}
                  className={`w-40 h-[40px] border rounded-md z-10 text-white m-auto active:opacity-50 
                    ${name && cellphone && base ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"}`}
                  onClick={async () => {
                    await sendDataUser(name, cellphone, base);
                    setClickNewUser(false);
                    setName("");
                    setCellphone("");
                    setBase("");
                    await getAllUsers();
                  }}>
                  Enviar
                </button>
              </section>
            </div>
          ) : (
            <div className="flex flex-col gap-1 w-full md:max-w-[1024px]  p-1 m-auto overflow-auto z-10">
              {allUsersFiltered.length ? allUsersFiltered.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between border rounded-md p-1 items-center  ">
                    <div className="flex-col text-white min-w-[70%]">
                      <p className="text-left font-bold w-[100%]">
                        Nome Usuário: <span className="font-thin text-white-600">{item.name}</span>
                      </p>
                      <p className="text-left font-bold w-[100%]">
                        Telefone: <span className="font-thin text-white-600">{item.cellphone}</span>
                      </p>
                      <p className="text-left font-bold w-[100%]">
                        Base: <span className="font-thin text-white-600">{item.base}</span>
                      </p>
                    </div>
                    <div className="flex flex-row gap-8 md:gap-10 z-10">
                      <button
                        className="rounded-md active:opacity-50"
                        onClick={() => {
                          setUserToEdit(item);
                          setIdUser(item.id);
                          setName(item.name);
                          setCellphone(item.cellphone);
                          setBase(item.base);
                          setModalEditOpen(true);
                        }}
                      >
                        <Pencil color="#FFFFFF" />
                      </button>
                      <button
                        className="rounded-md active:opacity-50"
                        onClick={() => {
                          setUserToDelete(item);
                          setModalDeleteOpen(true);
                          setIdUser(item.id)
                        }}
                      >
                        <Trash2 color="#e61919" />
                      </button>
                    </div>
                  </div>
                );
              }) : (
                loading ? (
                  <div className="flex m-auto">
                    <RefreshCcw className="active:opacity-50 transition-transform animate-spin"
                      color="white" />
                  </div>
                ) : (
                  <p className="text-white font-semibold">Sem usuários</p>
                )
              )};

              {/* Modal de Edição */}
              {modalEditOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]">
                    <h2 className="text-xl text-white font-bold mb-4">Editar Usuário</h2>
                    <input
                      type='text'
                      className="w-full p-2 border rounded-md mb-3"
                      defaultValue={userToEdit?.name}
                      placeholder="Nome"
                      onChange={(e) => setName(e.target.value)}
                    />

                    <input
                      type='number'
                      className="w-full p-2 border rounded-md mb-3"
                      defaultValue={userToEdit?.cellphone}
                      placeholder="Telefone"
                      onChange={(e) => setCellphone(e.target.value)}
                    />

                    <input
                      type='text'
                      className="w-full p-2 border rounded-md mb-3"
                      defaultValue={userToEdit?.base}
                      placeholder="Base"
                      onChange={(e) => setBase(e.target.value)}
                    />

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setModalEditOpen(false);
                          setName("");
                          setCellphone("");
                          setBase("");
                          setIdUser(0);
                        }}
                        className="text-white bg-gray-500 px-4 py-2 rounded-md active:opacity-50">
                        Cancelar
                      </button>
                      <button
                        onClick={async () => {
                          await sendDataUserEdited(idUser, name, cellphone, base);
                          setModalEditOpen(false);
                          setName("");
                          setCellphone("");
                          setBase("");
                          setIdUser(0);
                          await getAllUsers();
                        }}
                        className="text-white bg-blue-500 px-4 py-2 rounded-md active:opacity-50">
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Modal de Confirmação de Exclusão */}
              {modalDeleteOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]">
                    <h2 className="text-xl text-white font-bold mb-4">Excluir Usuário?</h2>
                    <p className="text-white">Tem certeza que deseja excluir <span className="font-bold">{userToDelete?.name}</span>?</p>
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => {
                          setModalDeleteOpen(false);
                          setIdUser(0);
                        }}
                        className="text-white bg-gray-500 px-4 py-2 rounded-md active:opacity-50">
                        Cancelar
                      </button>
                      <button
                        onClick={async () => {
                          await deleteUser(idUser);
                          setModalDeleteOpen(false);
                          setIdUser(0);
                          await getAllUsers()
                        }}
                        className="text-white bg-red-500 px-4 py-2 rounded-md active:opacity-50">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </section>
      </div>
    </>
  );
}

export default UsersManagement;