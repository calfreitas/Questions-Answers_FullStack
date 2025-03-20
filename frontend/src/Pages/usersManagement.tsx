import { useEffect, useState } from 'react';
import createInstanceAxios from '../Components/axios';
import { RefreshCcw, ChevronDown, ChevronUp, CircleX, CirclePlus, Trash2, Pencil } from 'lucide-react';
import LogoImageBackground from '../Components/sidenLogoDash';
import { Form, useForm } from 'react-hook-form';

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [clickNewUser, setClickNewUser] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const filters = ["Opção 1", "Opção 2", "Opção 3"];

  const [username, setUsername] = useState<string>("")


  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, [token]);

  async function getAllUsers() {
    setLoading(true);

    try {
      const response = await axiosInstance.get('/users/getUsers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('teste', response)
      setAllUsers(response.data);

    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setAllUsers([]);

    } finally {
      setLoading(false);

    }
  };

  function sendDataUser() {
    console.log("username", username)
  }



  return (
    <>
      <div className="flex mt-20 h-[calc(100vh-5rem)]">

        {/*div dos usuários*/}
        <section className="w-full bg-gray-900 flex flex-col gap-10 items-center justify-start overflow-hidden p-0 m-0">
          <LogoImageBackground />
          <div className="w-full max-h-screen text-center text-lg text-white font-semibold z-10 p-2">
            <p className="text-white">Gerenciar usuários whatsapp</p>
          </div>
          <div className="w-full flex flex-row md:flex-row justify-center items-center gap-5 md:gap-20">

            <button
              className={`w-40 h-[40px] flex flex-row items-center justify-center gap-2 border rounded-md z-10 transition ${clickNewUser ? "bg-red-900 text-white" : "bg-green-500 text-white"}`}
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
                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setSelectedFilter(filter);
                          setIsOpen(false);
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

              <section id="newUser" className="mt-20 md:mt-10 max-w-[500px] w-[90%]">

                <p className="text-white font-semibold text-sm md:text-base">Novo Usuário</p>
                <input
                  id="name"
                  type="text"
                  className="md:w-[100%] border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium uppercase tracking-wide"
                  placeholder="Nome"
                  maxLength={200}
                  inputMode="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-white font-semibold text-sm md:text-base">Telefone</p>
                <input type="text"
                  className="md:w-[100%] border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium uppercase tracking-wide"
                  placeholder="554199999999"
                  maxLength={200}
                  pattern="[A-Z0-9]+"
                  inputMode="text"
                // value={username.toUpperCase()}
                // onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-white font-semibold text-sm md:text-base">Base</p>
                <input type="text"
                  className="md:w-[100%] border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium uppercase tracking-wide mb-5"
                  placeholder="SBXY"
                  maxLength={4}
                  pattern="[A-Z0-9]+"
                  inputMode="text"
                // value={username.toUpperCase()}
                // onChange={(e) => setUsername(e.target.value)}
                />

                <button
                  disabled={username.length > 0 ? false : true}
                  className="w-40 h-[40px] border rounded-md z-10 bg-green-500 text-white m-auto"
                  onClick={(e) => sendDataUser()}
                >
                  Enviar
                </button>
              </section>
            </div>
          ) : (
            <div className="flex flex-col gap-1 w-full max-w-[1024px] p-1 m-auto overflow-auto z-10">
              {allUsers.length ? allUsers.map((item: any, index: number) => {
                console.log("item", item)
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
                        className="rounded-md"
                        onClick={() => {
                          setUserToEdit(item);
                          setModalEditOpen(true);
                        }}
                      >
                        <Pencil color="#FFFFFF" />
                      </button>
                      <button
                        className="rounded-md"
                        onClick={() => {
                          setUserToDelete(item);
                          setModalDeleteOpen(true);
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
                    <input className="w-full p-2 border rounded-md mb-3" defaultValue={userToEdit?.name} placeholder="Nome" />
                    <input className="w-full p-2 border rounded-md mb-3" defaultValue={userToEdit?.cellphone} placeholder="Telefone" />
                    <input className="w-full p-2 border rounded-md mb-3" defaultValue={userToEdit?.base} placeholder="Base" />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setModalEditOpen(false)} className="text-white bg-gray-500 px-4 py-2 rounded-md">Cancelar</button>
                      <button className="text-white bg-blue-500 px-4 py-2 rounded-md">Salvar</button>
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
                      <button onClick={() => setModalDeleteOpen(false)} className="text-white bg-gray-500 px-4 py-2 rounded-md">Cancelar</button>
                      <button className="text-white bg-red-500 px-4 py-2 rounded-md">Excluir</button>
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