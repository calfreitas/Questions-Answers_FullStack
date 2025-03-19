import { useEffect, useState } from 'react';
import createInstanceAxios from '../Components/axios';
import Loading from '../Components/loading';
import { RefreshCcw, ChevronDown, ChevronUp, CircleX, CirclePlus } from 'lucide-react';
import LogoImageBackground from '../Components/sidenLogoDash';
import { resolveTypeReferenceDirective } from 'typescript';

const axiosInstance = createInstanceAxios();


interface Users {
  name: string;
  cellphone: string;
  base: string;
};

function UsersManagement() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const [selectUser, setSelectUser] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [clickNewUser, setClickNewUser] = useState(false);

  const filters = ["Opção 1", "Opção 2", "Opção 3"];

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
              onClick={() => setClickNewUser(!clickNewUser)}>
              {clickNewUser ? <CircleX /> : <CirclePlus />}
              {clickNewUser ? "Cancelar" : "Criar Novo"}
            </button>

            {/* Botão Filtrar */}
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
          </div>

          {/* Formulário Criar Novo */}
          {clickNewUser ? (
            <div className="w-[90%] md:w-[30%] h-[50%] m-auto  z-10">
              <section id="newUser" className="">
                <form className="flex flex-col gap-2">
                  <p className="text-white font-semibold text-sm md:text-base">Novo Usuário</p>
                  <input type="text"
                    className="md:w-[100%] border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium uppercase tracking-wide"
                    placeholder="Nome"
                    maxLength={200}
                    pattern="[A-Z0-9]+"
                    inputMode="text"
                  // value={username.toUpperCase()}
                  // onChange={(e) => setUsername(e.target.value)}
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

                  <button className="w-40 h-[40px] border rounded-md z-10 bg-green-500 text-white m-auto">
                    Enviar
                  </button>
                </form>
              </section>
            </div>
          ) : (
            <div>
              {allUsers.length ? allUsers.map((item, index: number) => {
                return (
                  <button
                    key={index}
                    className={`${item?.name === selectUser?.id ? "opacity-100" : "opacity-50"} w-full h-auto bg-gray-300 p-1 px-2 justify-start 
                    border border-gray-800 rounded-md shadow-custom-white`}>
                    <p className="text-[#1e1e2d] text-left font-semibold w-[100px]">{item.name}{item.cellphone}{item.base}</p>
                  </button>
                );
              }) : (
                <p className="text-white font-semibold">Sem usuários</p>
              )}
            </div>
          )}

        </section>
      </div>
    </>
  );
}

export default UsersManagement;