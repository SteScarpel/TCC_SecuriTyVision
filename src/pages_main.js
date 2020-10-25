const localVisita = [
  "Salão de Festas",
  "Residência de Morador"
]

function getLocalVisita (valorLocal){
  const arrayPosition = +valorLocal -1
  return localVisita[arrayPosition]
}

const tipoEntrada = [
  "Pedestre",
  "Veículo"
]

function getTipoEntrada (valorEntrada){
  const arrayPosition = +valorEntrada -1
  return tipoEntrada[arrayPosition]
}

const tipoVeiculoEntrada = [
  "Moto",
  "Carro",
  "Caminhão"
]

function getTipoVeiculo (valorVeiculo){
  const arrayPosition = +valorVeiculo -1
  return tipoVeiculoEntrada[arrayPosition]
}

const localPrestacaoServico = [
  "Área interna do condomínio",
  "Residência de Morador"
]

function getLocalPrestacao (valorLocalP){
  const arrayPosition = +valorLocalP -1
  return localPrestacaoServico[arrayPosition]
}


//Página inicial > Selecionar o sistema que será acessado
function index(req, res) {
 return res.render("index.html")
}

module.exports = {
  getLocalPrestacao, getLocalVisita, getTipoEntrada, getTipoVeiculo, index
}