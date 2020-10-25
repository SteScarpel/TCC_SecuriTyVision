"use strict";

/* Servidor do Projeto*/
var express = require('express');

var server = express();
server.use(express["static"]("public")).get("/", function (req, res) {
  return res.sendFile(__dirname + "/views/index.html");
}) //Páginas do sistema de portaria 
.get("/main-seguranca", function (req, res) {
  return res.sendFile(__dirname + "/views/security/main-security.html");
});
server.use(express["static"]("public")).get("/cameras-seguranca", function (req, res) {
  return res.sendFile(__dirname + "/views/security/cameras.html");
});
server.use(express["static"]("public")).get("/acessos", function (req, res) {
  return res.sendFile(__dirname + "/views/security/day-access.html");
});
server.use(express["static"]("public")).get("/historico-correspondencia", function (req, res) {
  return res.sendFile(__dirname + "/views/security/history-mail.html");
});
server.use(express["static"]("public")).get("/registro-correspondencia", function (req, res) {
  return res.sendFile(__dirname + "/views/security/mail-register.html");
});
server.use(express["static"]("public")).get("/retirada-correspondencia", function (req, res) {
  return res.sendFile(__dirname + "/views/security/receive-mail.html");
});
server.use(express["static"]("public")).get("/acessos-programados", function (req, res) {
  return res.sendFile(__dirname + "/views/security/scheduled-access.html");
}); //Páginas Sindico

server.use(express["static"]("public")).get("/sindico", function (req, res) {
  return res.sendFile(__dirname + "/views/administrator/main-administrator.html");
});
server.use(express["static"]("public")).get("/cadastro-porteiros", function (req, res) {
  return res.sendFile(__dirname + "/views/administrator/security_submit.html");
});
server.use(express["static"]("public")).get("/remover-porteiros", function (req, res) {
  return res.sendFile(__dirname + "/views/administrator/security_remove.html");
});
server.use(express["static"]("public")).get("/cadastro-proprietarios", function (req, res) {
  return res.sendFile(__dirname + "/views/administrator/owner_submit.html");
});
server.use(express["static"]("public")).get("/subsindico", function (req, res) {
  return res.sendFile(__dirname + "/views/administrator/sub-administrator_submit.html");
});
server.use(express["static"]("public")).get("/cadastro-sindico", function (req, res) {
  return res.sendFile(__dirname + "/views/administrator/administrator_submit.html");
}); //Páginas Moradores

server.use(express["static"]("public")).get("/login-moradores", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/login_dweller.html");
});
server.use(express["static"]("public")).get("/app-moradores", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/app_dweller.html");
});
server.use(express["static"]("public")).get("/veiculos", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/veiculos_dweller.html");
});
server.use(express["static"]("public")).get("/moradores", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/dwellers.html");
});
server.use(express["static"]("public")).get("/encomendas", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/orders-dwellers.html");
});
server.use(express["static"]("public")).get("/prestador-de-servico", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/service-provider.html");
});
server.use(express["static"]("public")).get("/reclamacoes", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/claims-dwellers.html");
});
server.use(express["static"]("public")).get("/avisos", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/warnings-dwellers.html");
});
server.use(express["static"]("public")).get("/perfil", function (req, res) {
  return res.sendFile(__dirname + "/views/dweller/profile-dwellers.html");
}).listen(5000); // console.log(__dirname);