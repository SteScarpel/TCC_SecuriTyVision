//Vincular com o Banco de Dados
const Database = require('./database/db.js').con;

//Puxar Arrays de Valores e funções
const { getLocalPrestacao, getLocalVisita, getTipoEntrada, getTipoVeiculo } = require('./pages_main')

/* Páginas Sindico*/

function mainSindico(req, res) {
  return res.render("./administrator/main-administrator.html")
}

function cadPorteiros(req, res) {
  return res.render("./administrator/security_submit.html")
}

function removerPorteiros(req, res) {
  return res.render("./administrator/security_remove.html")
}

function cadastroProprietario(req, res) {
  return res.render("./administrator/owner_submit.html")
}

function cadastroSubSindico(req, res) {
  return res.render("./administrator/sub-administrator_submit.html")
}

function cadSindico(req, res) {
  return res.render("./administrator/administrator_submit.html")
}


function loginSindico(req, res) {
  return res.render("./administrator/login_administrator.html")
}


function recebimentoPortaria(req, res) {
  return res.render("./administrator/reception_ordinance.html")
}


function retiradaMoradores(req, res) {
  return res.render("./administrator/withdrawal_dweller.html")
}


function acessosAgendados(req, res) {
  return res.render("./administrator/scheduled_ accesses.html")
}


function entradaSaida(req, res) {
  return res.render("./administrator/entrance_exit.html")
}

function consultaReclamacoes (req, res){
  return res.render("./administrator/consult_complaints.html")
}

function enviarAvisos (req, res){
  return res.render("./administrator/send_warning.html")
}

module.exports = {
  mainSindico, cadPorteiros, removerPorteiros, cadastroProprietario, cadastroSubSindico, cadSindico, loginSindico, recebimentoPortaria, retiradaMoradores, acessosAgendados, entradaSaida,
  consultaReclamacoes,enviarAvisos
}