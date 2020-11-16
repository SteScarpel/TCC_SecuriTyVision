//Puxar funções das páginas
const {
  renderMoradores,
  mainSeguranca,
  camerasSeguranca,
  acessosDia, renderacessosDia,
  historicoCorrespondencia, renderhistoricoCorrespondencia,
  registroCorrespondencia, renderRegistroCorrespondencia,
  retiradaCorrespondencia, renderRetiradaCorrespondencia,
  acessoProgramado, renderAcessoProgramado,
  cadastroVisitante, renderCadastroVisitante,
  cadPrestadorServico, renderCadPrestadorServico,
  telalogin,
  validaLogin,
  gravarRetirada
} = require('./pages_security')

const {
  renderMainSindico,
  renderCadPorteiros, cadPorteiros,
  renderRemoverPorteiros, removerPorteiros, carregarFuncionario,
  cadastroProprietario, renderCadastroProprietario,
  cadastroSubSindico, renderCadastroSubSindico,
  cadSindico, renderCadSindico,
  recebimentoPortaria, renderRecebimentoPortaria,
  acessosAgendados, renderAcessosAgendados,
  entradaSaida, renderEntradaSaida,
  consultaReclamacoes, renderConsultaReclamacoes,
  enviarAvisos, renderEnviarAvisos,
  renderTrocarSenha,trocarSenha,
  perfilDeAcesso,
  rederRequerimentos, gerarHistorico
} = require('./pages_adm')

const {
  mainMorador, renderMainMorador,
  cadVeiculo, renderCadVeiculo,
  cadMoradores, renderCadMoradores,
  encomendas, renderEncomendas,
  cadPrestFixo, renderCadPrestFixo,
  reclamacao, renderReclamacao,
  avisosMoradores, renderAvisosMoradores,
  perfilMoradores, renderPerfilMoradores,
  registeredProviders, renderRegisteredProviders,
  veiculosCadastrados, renderVeiculosCadastrados,
  renderTermosDeUso, termosDeUso,  renderEsqueciSenha,esqueciSenha,
  esqueciSenhaconfrimacao,renderEsqueciSenhaconfrimacao

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
  if (!req.session.user || !req.session.user.login_cpf || !req.cookies.user_sid) {
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
  .use(bodyparser.urlencoded({ extended: true }))

  //Rotas da Aplicação
  .get("/", index)

  //Paginas Portaria
  .get("/login", telalogin)
  .post("/login", validaLogin)

  .get("/main-seguranca", sessionChecker, mainSeguranca)
  .get("/cameras-seguranca", sessionChecker, camerasSeguranca)
  .get("/acessos", sessionChecker, acessosDia)

  .get("/historico-correspondencia", sessionChecker, renderhistoricoCorrespondencia)
  .post("/historico-correspondencia", sessionChecker, historicoCorrespondencia)

  .get("/carrega-moradores", renderMoradores)

  .get("/registro-correspondencia", sessionChecker, renderRegistroCorrespondencia)
  .post("/registrocorrespondencia", sessionChecker, registroCorrespondencia)

  .get("/retirada-correspondencia", sessionChecker, renderRetiradaCorrespondencia)
  .post("/retirada-correspondencia", sessionChecker, retiradaCorrespondencia)
  .post("/realizar-retirada", sessionChecker, gravarRetirada)

  .get("/acessos-programados", sessionChecker, renderAcessoProgramado)
  .post("/acessos-programados", sessionChecker, acessoProgramado)

  .get("/cadastro-visitantes", sessionChecker, renderCadastroVisitante)
  .post("/cadastro-visitantes", sessionChecker, cadastroVisitante)

  .get("/cadastro-prestadores-servico", sessionChecker, renderCadPrestadorServico)
  .post("/cadastro-prestadores-servico", sessionChecker, cadPrestadorServico)

  //Páginas Sindico
  // .get("/login-sindico",sessionChecker, loginSindico)
  .get("/selecionar-acesso", sessionChecker, perfilDeAcesso)
  
  .get("/sindico", sessionChecker, renderMainSindico)

  .get("/cadastro-porteiros", sessionChecker, renderCadPorteiros)
  .post("/cadastro-porteiros", sessionChecker, cadPorteiros)

  .get("/remover-porteiros", sessionChecker, renderRemoverPorteiros)
  .post("/remover-porteiros", sessionChecker, removerPorteiros)
  .post("/carregar-porteiro", sessionChecker, carregarFuncionario )

  .get("/cadastro-proprietarios", sessionChecker, renderCadastroProprietario)
  .post("/cadastro-proprietarios", sessionChecker, cadastroProprietario)

  .get("/subsindico", sessionChecker, renderCadastroSubSindico)
  .post("/subsindico", sessionChecker, cadastroSubSindico)

  .get("/cadastro-sindico", renderCadSindico)
  .post("/cadastro-sindico", cadSindico)

  .get("/recebimento-portaria", sessionChecker, renderRecebimentoPortaria)
  .post("/recebimento-portaria", sessionChecker, recebimentoPortaria)


  .get("/acessos-agendados", sessionChecker, renderAcessosAgendados)
  .post("/acessos-agendados", sessionChecker, acessosAgendados)

  .get("/entrada-saida", sessionChecker, renderEntradaSaida)
  .post("/entrada-saida", sessionChecker, entradaSaida)

  .get("/consultar-reclamacao", sessionChecker, renderConsultaReclamacoes)
  .post("/consultar-reclamacao", sessionChecker, consultaReclamacoes)

  .get("/enviar-avisos", sessionChecker, renderEnviarAvisos)
  .post("/enviar-avisos", sessionChecker, enviarAvisos)

  .get("/trocar-Senha", sessionChecker, renderTrocarSenha)
  .post("/trocar-Senha", sessionChecker, trocarSenha)
  
  .get("/requerimentos", sessionChecker, rederRequerimentos)
  .post("/gerar-relatorio", gerarHistorico)

  //Sistema Moradores
  // .get("/login-moradores",sessionChecker, loginMorador)
  .get("/app-moradores", sessionChecker, renderMainMorador)
  .post("/app-moradores", sessionChecker, mainMorador)

  .get("/veiculos", sessionChecker, renderCadVeiculo)
  .post("/veiculos", sessionChecker, cadVeiculo)

  .get("/moradores", sessionChecker, renderCadMoradores)
  .post("/moradores", sessionChecker, cadMoradores)

  .get("/encomendas", sessionChecker, renderEncomendas)
  .post("/encomendas", sessionChecker, encomendas)

  .get("/prestador-de-servico", sessionChecker, renderCadPrestFixo)
  .post("/prestador-de-servico", sessionChecker, cadPrestFixo)

  .get("/reclamacoes", sessionChecker, renderReclamacao)
  .post("/reclamacoes", sessionChecker, reclamacao)

  .get("/avisos", sessionChecker, renderAvisosMoradores)
  .post("/avisos", sessionChecker, avisosMoradores)

  .get("/perfil", sessionChecker, renderPerfilMoradores)
  .post("/perfil", sessionChecker, perfilMoradores)

  .get("/prestadores-cadastrados", sessionChecker, renderRegisteredProviders)
  .post("/prestadores-cadastrados", sessionChecker, registeredProviders)

  .get("/veiculos-cadastrados", sessionChecker, renderVeiculosCadastrados)
  .post("/veiculos-cadastrados", sessionChecker, veiculosCadastrados)

  .get("/termos-uso", sessionChecker, renderTermosDeUso)
  .post("/termos-uso", sessionChecker, termosDeUso)

  .get("/esqueci-minha-senha-confirm", sessionChecker, renderEsqueciSenha)
  .post("/esqueci-minha-senha-confirm", sessionChecker, esqueciSenha)

  .get("/esqueci-minha-senha-confirm-troca", sessionChecker, renderEsqueciSenhaconfrimacao)
  .post("/esqueci-minha-senha-confirm-troca", sessionChecker, esqueciSenhaconfrimacao)

  .listen(5000)

// console.log(__dirname);