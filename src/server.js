
//Puxar funções das páginas 
const {
  mainSeguranca, camerasSeguranca, acessosDia , historicoCorrespondencia, registroCorrespondencia, retiradaCorrespondencia,
  acessoProgramado, cadastroVisitante, cadPrestadorServico, telalogin , validaLogin, renderCadastroVisitante, renderCadPrestadorServico,
  renderRegistroCorrespondencia, renderMoradores
} = require('./pages_security')



const { 
  mainSindico, cadPorteiros, removerPorteiros, cadastroProprietario, cadastroSubSindico, cadSindico, recebimentoPortaria, retiradaMoradores, 
  acessosAgendados, entradaSaida, consultaReclamacoes, enviarAvisos
} = require('./pages_adm')

const {
   mainMorador, cadVeiculo, cadMoradores, encomendas, cadPrestFixo, reclamacao, avisosMoradores, perfilMoradores
} = require('./pages_dweller')

const { index } = require('./pages_main')

/* Servidor do Projeto*/
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const bodyparser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser');

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  console.log(req.session.user)
  if (!req.session.user || !req.session.user.login_cpf  ||!req.cookies.user_sid) {
      res.redirect('/login');
  } else {
      next();
  }
};

/* Configurar NunJucks - Template Engine*/
nunjucks.configure('src/views', {
  express: server,
  noCache: true,

})

server

//configurar seção do usuario 
.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 43200000 } //tempo maximo da seção ativa 
}))

.use(cookieParser()) //utilizar o cookie

  //configurar middleware 
  .use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
})


  //Configurar arquivos estáticos
  .use(express.static("public"))
  .use(bodyparser.urlencoded({extended:true}))
  
  

  //Rotas da Aplicação
  .get("/", index)

  //Paginas Portaria
  .get("/login", telalogin)
  .post("/login", validaLogin)



  .get("/main-seguranca", sessionChecker,mainSeguranca)
  .get("/cameras-seguranca", sessionChecker,camerasSeguranca)
  .get("/acessos",sessionChecker, acessosDia)

  .get("/historico-correspondencia",sessionChecker, historicoCorrespondencia)
  .get("/carrega-moradores", renderMoradores)
  .get("/registro-correspondencia",sessionChecker, renderRegistroCorrespondencia )
  .post("/registrocorrespondencia",sessionChecker,  registroCorrespondencia)

  .get("/retirada-correspondencia",sessionChecker, retiradaCorrespondencia)
  .get("/acessos-programados",sessionChecker, acessoProgramado)

  .get("/cadastro-visitantes", sessionChecker, renderCadastroVisitante)
  .post("/cadastro-visitantes",sessionChecker, cadastroVisitante )

  .get("/cadastro-prestadores-servico",sessionChecker, renderCadPrestadorServico)
  .post("/cadastro-prestadores-servico",sessionChecker, cadPrestadorServico)



  //Páginas Sindico
  // .get("/login-sindico",sessionChecker, loginSindico)
  .get("/sindico", sessionChecker,mainSindico)
  .get("/cadastro-porteiros",sessionChecker, cadPorteiros)
  .get("/remover-porteiros", sessionChecker,removerPorteiros)
  .get("/cadastro-proprietarios",sessionChecker, cadastroProprietario)
  .get("/subsindico", sessionChecker,cadastroSubSindico)
  .get("/cadastro-sindico", cadSindico)
  
  .get("/recebimento-Portaria",sessionChecker, recebimentoPortaria)
  .get("/retirada-moradores",sessionChecker, retiradaMoradores)
  .get("/acessos-agendados", sessionChecker,acessosAgendados)
  .get("/entrada-saida",sessionChecker, entradaSaida)

  .get("/consultar-reclamacao", sessionChecker, consultaReclamacoes)
  .get("/enviar-avisos",sessionChecker, enviarAvisos)

  //Sistema Moradores

  // .get("/login-moradores",sessionChecker, loginMorador)
  .get("/app-moradores",sessionChecker, mainMorador)
  .get("/veiculos",sessionChecker, cadVeiculo)
  .get("/moradores",sessionChecker, cadMoradores)
  .get("/encomendas",sessionChecker, encomendas)
  .get("/prestador-de-servico",sessionChecker, cadPrestFixo)
  .get("/reclamacoes",sessionChecker, reclamacao)
  .get("/avisos",sessionChecker, avisosMoradores)
  .get("/perfil",sessionChecker, perfilMoradores)




  .listen(5000)

// console.log(__dirname);