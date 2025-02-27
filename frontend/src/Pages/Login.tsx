// import createInstanceAxios from "../../reqAxios/axios";

import { Eye, EyeClosed, RefreshCcw } from "lucide-react";
import { useState } from "react";
import createInstanceAxios from "../Components/axios";


const axiosInstance = createInstanceAxios();

interface Props {
    username: string,
    password: string
}

function Login() {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    async function authLogin() {
        setLoading(true);
    
        const responseUsername = { data: { success: true } }; // Substitua com a requisição real
        const responsePwd = { data: { success: true } }; // Substitua com a requisição real -- passar o post de username e password para o backend. 
    
        try {
            if (responseUsername && responsePwd) {
                console.log('Faça o login, coloque o usuário em Dashboard.');
    
                // Aguardar 2 segundos antes de executar o próximo código
                await sleep(2000);
    
                console.log('Isso será executado após 2 segundos');
                setLoading(false);  // Defina o loading como false após o delay
            } else {
                setLoading(false);
                return null;
            }
        } catch (error) {
            setLoading(false);
            console.error('Erro de requisição:', error);  // Mostra detalhes do erro
            return null;
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-900">
                <div className="flex flex-col w-[80%] h-[60%] md:w-[40%] justify-center">

                    <section
                        id="LoginBox"
                        className="flex flex-col justify-center md:text-2xl items-center border rounded-2xl p-20">

                        <img alt="logo" src="/logo.png" className="w-[40%] md:w-[30%]" />
                        <div>
                            <div id="textLogin"
                                className="flex justify-start items-start">
                                <p className="text-white font-semibold text-sm md:text-base">Username</p>
                            </div>

                            <div id="inputUser"
                                className="">
                                <input type="text"
                                    className="border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                                    text-lg font-medium uppercase tracking-wide"
                                    placeholder="SID0000"
                                    maxLength={8}
                                    pattern="[A-Z0-9]+"
                                    inputMode="text"
                                />
                            </div>

                            <div id="textPwd"
                                className="mt-5 flex justify-start items-start">
                                <p className="text-white font-semibold text-sm md:text-base">Password</p>
                            </div>

                            <div id="inputPwd"
                                className="flex">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="border rounded-md placeholder:text-gray-500 placeholder:italic placeholder:text-sm focus:outline-none px-2
                                    text-lg font-medium tracking-wide"
                                    placeholder="Senha"
                                    name="InputPwd" />
                                <div
                                    onClick={togglePassword}
                                    className="active:opacity-50 ml-1">
                                    {showPassword ? <Eye className="" color="white" size={25} /> : <EyeClosed className="" color="white" size={25} />}
                                </div>

                            </div>

                            <div id="buttons"
                                className="flex flex-row justify-between mt-5">
                                <div id="buttonRecover"
                                    className="flex justify-start text-sm md:text-sm">
                                    <button className="text-white active:opacity-50">
                                        Esqueci minha senha
                                    </button>
                                </div>
                                {loading ? (
                                    <div id="butonLogin"
                                        className="flex justify-start text-sm md:text-sm px-8">
                                        <RefreshCcw className={`{transition-transform ${loading ? "animate-spin" : ""}`} color="white" />
                                    </div>
                                ) : (
                                    <div id="butonLogin"
                                        className="flex justify-start text-sm md:text-sm px-8">
                                        <button
                                            className="text-white active:opacity-50"
                                            onClick={authLogin}
                                        >
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