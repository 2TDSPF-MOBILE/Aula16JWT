//Importar a bibliote Express
const express = require("express")

//Importa a biblioteca jsonwebtoken(JWT)
const jwt = require("jsonwebtoken")

//Importa a biblioteca CORS
const cors = require("cors")

//Cria uma aplicação Express
//Aq iniciamos o servidor
const app = express()

//Servidor você irá entender requisões JSON
//Exemplo de requisão Json é quando o cliente envia e-mail e senha
app.use(express.json())

//Habilitar o CORS para permitir requisões externas
//Sem isso, o app mobile poderia ser bloqueados ao acessar a API
app.use(cors())


//Chave Secreta usada para gerar e validar os token JWT
const SECRET = "segredo_jwt_aula"

//CONFIGURAÇÕES DAS ROTAS DE LOGIN

app.post("/login",(req,res)=>{
    console.log("Requisição de login recebida.")

    const{email,senha} = req.body

    if(email === "admin@email.com" && senha === "123456"){
        
    }


})

