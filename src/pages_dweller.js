//Vincular com o Banco de Dados
const Database = require('./database/db.js').con;

//Puxar Arrays de Valores e funções
const { getLocalPrestacao, getLocalVisita, getTipoEntrada, getTipoVeiculo } = require('./pages_main')

/* Paginas Moradores */

function loginMorador(req, res) {
  return res.render("./dweller/login_dweller.html")
}

function mainMorador(req, res) {
  return res.render("./dweller/app_dweller.html")
}

function cadVeiculo(req, res) {
  return res.render("./dweller/veiculos_dweller.html")
}

function cadMoradores(req, res) {
  return res.render("./dweller/dwellers.html")
}

function encomendas(req, res) {
  return res.render("./dweller/orders-dwellers.html")
}

function cadPrestFixo(req, res) {
  return res.render("./dweller/service-provider.html")
}

function reclamacao(req, res) {
  return res.render("./dweller/claims-dwellers.html")
}

function avisosMoradores(req, res) {
  return res.render("./dweller/warnings-dwellers.html")

}

function perfilMoradores(req, res) {
  return res.render("./dweller/profile-dwellers.html")
}

/* Puxar Funções JS de Inserção do Banco*/
// const { } = require('./database/send-form.js')

module.exports = {
  loginMorador, mainMorador, cadVeiculo, cadMoradores, encomendas, cadPrestFixo, reclamacao, avisosMoradores, perfilMoradores
}