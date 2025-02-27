import { useEffect, useState } from 'react';
import createInstanceAxios from '../Components/axios';
import Loading from '../Components/loading';
import { RefreshCcw } from 'lucide-react';
import LogoImageBackground from '../Components/sidenLogoDash';


const axiosInstance = createInstanceAxios();

interface Question {
  question: string;
  id: number;
  answer: string;
};

function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selectQuestion, setSelectQuestion] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllAQuestions();
  }, []);

  async function getAllAQuestions() {
    setSelectQuestion({ id: null, question: "", answer: "" });
    setLoading(true);
    setAllQuestions([]);
    try {
      const response = await axiosInstance.get('/questions/getUnanswered');
      setAllQuestions(response.data);
      console.log('resposta')
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
      setAllQuestions([]);
      setLoading(false);
    }
  };

  async function sendAnswer(id: number, answer: string) {
    try {
      const response = await axiosInstance.post('/answers/postAnswer', {
        id,
        answer
      });
      setAllQuestions((prevCache) =>
        prevCache.map((question) =>
          question.id === id ? { ...question, answer: "" } : question
        ));
      window.alert('Resposta encaminhada ao Siden');
      return response.data;
    } catch (error) {
      console.error("Erro ao responder a pergunta:", error);
      return null;
    }
  };

  return (
    <>
      <div className="flex mt-20 h-[calc(100vh-5rem)]">
        {/*div das perguntas*/}
        <div className="w-1/3 max-h-screen bg-gray-900 flex flex-col border border-black rounded-sm p-3">

          <div className="flex justify-between items-center px-3">
            <p className=" text-white font-semibold">Perguntas Não Respondidas</p>
            <button onClick={() => getAllAQuestions()}>
              <RefreshCcw className={`active:opacity-50 transition-transform ${loading ? "animate-spin" : ""}`} 
                          color="white" />
            </button>
          </div>

          {!loading && (
            <div className="flex flex-col mt-4 p-1 overflow-auto thumb-rounded-full track-rounded-full scrollbar-container scrollbar-thumb-slate-700 scrollbar-track-slate-300 gap-3">

              {allQuestions.length > 0 ? allQuestions.map((item, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSelectQuestion(item)}
                    className={`${item?.id === selectQuestion?.id ? "opacity-100" : "opacity-50"} w-full h-auto bg-gray-300 p-1 px-2 justify-start border border-gray-800 rounded-md shadow-custom-white`}>
                    <p className="text-[#1e1e2d] text-left font-semibold">{item.question}</p>
                  </button>
                );
              }) : (

                <p className="text-white font-semibold">Sem perguntas</p>
              )}
            </div>
          )}
          <Loading disabled={loading} label="Loading..." />
        </div>

        {/*div da resposta*/}
        <div className="w-2/3 max-h-screen  bg-gray-900 flex flex-col items-center justify-center p-10 gap-10 border-s-2 ">
        {/* Criar arquivo para logo e referenciar caso queira. */}
          <LogoImageBackground /> --
          <div className="w-full text-center text-lg  text-white font-semibold z-10">
            <p className="text-white">Cadastro de Respostas</p>
          </div>
          <div className=" bg-white w-full border border-black rounded-md z-10">
            <p className="text-center text-lg border border-gray-100 rounded-md bg-gray-500 text-white font-semibold">Pergunta</p>
            <textarea
              className="w-full min-h-[100px] focus:outline-none resize-none"
              value={selectQuestion?.question}
              placeholder="Selecione uma pergunta."
              onChange={(e) => { setSelectQuestion(e.target.value) }}>
            </textarea>
          </div>

          <div className={`${selectQuestion?.id ? "opacity-100 z-10" : "opacity-50"} bg-white w-full border border-black rounded-md`}>
            <p className="text-center text-lg border border-gray-100 rounded-md bg-gray-500 text-white font-semibold">Resposta:</p>
            <textarea
              value={selectQuestion?.answer || ""}
              className="w-full min-h-[100px] focus:outline-none resize-none"
              placeholder="Exemplo: SDH - Exemplo de resposta (mín 10 Caracteres)"
              onChange={(e) => {
                setSelectQuestion((prev: any) => ({
                  ...prev,
                  answer: e.target.value
                }));
              }}
            >
            </textarea>
          </div>

          <div className="w-full flex justify-end">
            <button
              className={`w-[100px] px-2 py-1 ${selectQuestion?.answer?.length > 10 && selectQuestion.id ? "bg-green-600 opacity-100 text-white border border-white hover:bg-green-700 hover:text-white" : "bg-gray-400 border hover:bg-gray-400 border-white text-white opacity-50"} border border-black rounded-md flex justify-center hover:bg-gray-400 hover:text-white active:opacity-50`}  
              disabled={selectQuestion?.answer?.length > 10 && selectQuestion.id ? false : true}
              onClick={async () => {
                await sendAnswer(selectQuestion.id as number, selectQuestion?.answer);
                await getAllAQuestions();
              }}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;