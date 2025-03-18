import createInstanceAxios from '../functions/reqAxios';
import { Request, Response} from 'express';
import { selectForServiceS3AWS } from '../models/answerModel';


// ao realizar a lógica de enviar ao N8N incluir logo abaixo uma função para extrair e formatar os arquivos no banco de dados e enviar para a AWS S3.
// a função deve pegar todas as informações do banco de dados de perguntas e respostas que estão ativas, organizar por aeronave e fazer um arquivo .json 
// os arquivos serão vários, dentre eles, 1 arquivo json contendo todas as aeronaves e perguntas e respostas sobre elas, e outros varios arquivos json
// separados por aeronave , serão duas bases de conhecimento e dois agentes sendo alimentados simultaneamente. 
// precisa ser uma função que é ativada assim que chamada, não deve esperar nenhum parâmetro. 


 export default async function sendToS3AWS() {
    const awaitSelect = await selectForServiceS3AWS();
    if (!awaitSelect) return null;

    console.log('cheguei aqui', awaitSelect)
 }
