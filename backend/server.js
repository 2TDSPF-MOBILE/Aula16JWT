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
        //Se o login foi efetuado com a credenciais, iremos gerar o token
        const token = jwt.sign(
            //Payload - dados que serão armazenados dentro do token
            //Nesse exemplo iremos armazenar o e-mail do usuário.
            {
                email:email,
                prof:"Fernando"
            },
            //Chave secreta para gerarmos um token JWT
            //O servidor irá utilizar essa chave secretar para validar o token
            SECRET,
            //Configuração adicionais ao token
            {
                expiresIn:"1h"
            }
        )
        //Enviando o token para o cliente.
        //O cliente deve guardar esse token(AsyncStorage)
        //e posteriormente o cliente esse token em outras requisições
        return res.json({token})
      }

      //Se o e-mail e senha estiverem icorretos
      //retornar o error 401(não autorizado)
      return res.status(401).json({error:"Credenciais inválidas."})

})

//Acesasndo a rota protegida
//Essa rota somente será acesada se o cliente enviar um token JWT válido
//Geralmente o token é enviado no Header:
//Authorization: Bearer Token
app.get("/perfil",(req,res)=>{
    //Pegando a autorização que vem na requisação
    const authHeader = req.headers.authorization

    //Se o cliente não enviou token
    if(!authHeader){
        return res.status(401).json({error:"Token nao enviado"})
    }

    //O header vem no formato:
    //"Bearer TOKEN"
    const token = authHeader.split(" ")[1]

    try{
        //Verificar se o token é válido usando a nossa chave secreta
        const decoded = jwt.verify(token,SECRET)

        //Mostra no terminal o conteúdo do token
        console.log("Token Validado:",decoded)

        //Se o token JWT estiver válidado, liberamos o acesso
        //a rota protegida
        return res.json({
            message:"Acesso permitido",
            user:decoded
        })

    }catch{
        return res.status(401).json({error:"Token é válido"})
    }

})

//Iniciando o servidor
app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
})