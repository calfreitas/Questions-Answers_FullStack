import { Eye, EyeClosed, RefreshCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import createInstanceAxios from "../Components/axios";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import { useNavigate } from "react-router-dom";

const axiosInstance = createInstanceAxios();

function Login() {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(true);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vantaRef.current) return;

    const effect = NET({
      el: vantaRef.current,
      THREE: THREE,
      color: 0x00CED1, // Cor da rede
      backgroundColor: 0x111827,
      points: 10, // Quantidade de pontos
      maxDistance: 20, // Distância máxima entre as conexões
      spacing: 15, // Espaçamento entre pontos
      showDots: false
    });

    return () => {
      effect?.destroy();
    };
  }, []);

  async function authLogin() {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/loginAuth', {
        username,
        password
      });
      setLoading(false);

      if (response && response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
        return navigate('/Questions');
      };

    } catch (error) {
      setLogin(false);
      setLoading(false);
      return null;
    };
  };

  return (
    <>
      {/* background animado */}
      <div ref={vantaRef} className="flex flex-col justify-center items-center min-h-screen w-full overflow-hidden p-0 m-0">

        <div className="flex flex-col w-[80%] h-[60%] md:w-[40%] justify-center">
          <section
            id="LoginBox"
            className="flex flex-col justify-center md:text-2xl items-center border rounded-2xl p-20  bg-opacity-80
                backdrop-blur-lg backdrop-brightness-80 backdrop-contrast-75 shadow-xl"
          >
            <img alt="logo" src="/logo.png" className="w-[50%] md:w-[30%]" />
            <div>
              <div id="textLogin" className="flex justify-start items-start">
                <p className="text-white font-semibold text-sm md:text-base">
                  Username
                </p>
              </div>

              <div id="inputUser">
                {login ? (
                  <input
                    type="text"
                    className="border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium uppercase tracking-wide"
                    placeholder="SID0000"
                    maxLength={8}
                    pattern="[A-Z0-9]+"
                    inputMode="text"
                    value={username.toUpperCase()}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="border border-b-red-600 rounded-md placeholder:text-red-500 placeholder:italic placeholder:text-sm focus:outline-none px-2 text-red-600
                      text-lg font-medium uppercase tracking-wide"
                    placeholder="SID0000"
                    maxLength={8}
                    pattern="[A-Z0-9]+"
                    inputMode="text"
                    value={username.toUpperCase()}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}
              </div>
              <div id="textPwd" className="mt-5 flex justify-start items-start">
                <p className="text-white font-semibold text-sm md:text-base">
                  Password
                </p>
              </div>
              <div id="inputPwd" className="flex">
                {login ? (
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium tracking-wide"
                    placeholder="Senha"
                    name="InputPwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Impede que o formulário seja enviado (caso esteja dentro de um <form>)
                        authLogin()
                      }
                    }}
                  />
                ) : (
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border border-b-red-600 rounded-md placeholder:text-red-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                      text-lg font-medium tracking-wide text-red-600"
                    placeholder="Senha"
                    name="InputPwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Impede que o formulário seja enviado (caso esteja dentro de um <form>)
                        authLogin();
                      }
                    }}
                  />
                )}
                <div onClick={togglePassword} className="active:opacity-50 ml-1">
                  {showPassword ? (
                    <button>
                      <Eye className=""
                        color="white"
                        size={25} />
                    </button>
                  ) : (
                    <button>
                      <EyeClosed className=""
                        color="white"
                        size={25} />
                    </button>
                  )}
                </div>
              </div>
              <div id="buttons" className="flex flex-row justify-center mt-5">
                {/* <div id="buttonRecover" className="flex justify-start text-sm md:text-sm">
                  <button className="text-white active:opacity-50">
                    Esqueci minha senha
                  </button>
                </div> */}
                {loading ? (
                  <div id="butonLogin" className="flex justify-start text-sm md:text-sm px-8">
                    <RefreshCcw className={`transition-transform ${loading ? "animate-spin" : ""}`}
                      color="white" />
                  </div>
                ) : (
                  <div id="butonLogin" className="flex justify-center text-sm md:text-sm">
                    <button className="text-white active:opacity-50"
                      onClick={() => authLogin()}>
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;