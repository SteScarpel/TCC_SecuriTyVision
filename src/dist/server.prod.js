"use strict";var express=require("express"),server=express();server.use(express.static("public")).get("/",function(e,s){return s.sendFile(__dirname+"/views/index.html")}).get("/main-seguranca",function(e,s){return s.sendFile(__dirname+"/views/security/main-security.html")}),server.use(express.static("public")).get("/cameras-seguranca",function(e,s){return s.sendFile(__dirname+"/views/security/cameras.html")}),server.use(express.static("public")).get("/acessos",function(e,s){return s.sendFile(__dirname+"/views/security/day-access.html")}),server.use(express.static("public")).get("/historico-correspondencia",function(e,s){return s.sendFile(__dirname+"/views/security/history-mail.html")}),server.use(express.static("public")).get("/registro-correspondencia",function(e,s){return s.sendFile(__dirname+"/views/security/mail-register.html")}),server.use(express.static("public")).get("/retirada-correspondencia",function(e,s){return s.sendFile(__dirname+"/views/security/receive-mail.html")}),server.use(express.static("public")).get("/acessos-programados",function(e,s){return s.sendFile(__dirname+"/views/security/scheduled-access.html")}),server.use(express.static("public")).get("/sindico",function(e,s){return s.sendFile(__dirname+"/views/administrator/main-administrator.html")}),server.use(express.static("public")).get("/cadastro-porteiros",function(e,s){return s.sendFile(__dirname+"/views/administrator/security_submit.html")}),server.use(express.static("public")).get("/remover-porteiros",function(e,s){return s.sendFile(__dirname+"/views/administrator/security_remove.html")}),server.use(express.static("public")).get("/cadastro-proprietarios",function(e,s){return s.sendFile(__dirname+"/views/administrator/owner_submit.html")}),server.use(express.static("public")).get("/subsindico",function(e,s){return s.sendFile(__dirname+"/views/administrator/sub-administrator_submit.html")}),server.use(express.static("public")).get("/cadastro-sindico",function(e,s){return s.sendFile(__dirname+"/views/administrator/administrator_submit.html")}),server.use(express.static("public")).get("/login-moradores",function(e,s){return s.sendFile(__dirname+"/views/dweller/login_dweller.html")}),server.use(express.static("public")).get("/app-moradores",function(e,s){return s.sendFile(__dirname+"/views/dweller/app_dweller.html")}),server.use(express.static("public")).get("/veiculos",function(e,s){return s.sendFile(__dirname+"/views/dweller/veiculos_dweller.html")}),server.use(express.static("public")).get("/moradores",function(e,s){return s.sendFile(__dirname+"/views/dweller/dwellers.html")}),server.use(express.static("public")).get("/encomendas",function(e,s){return s.sendFile(__dirname+"/views/dweller/orders-dwellers.html")}),server.use(express.static("public")).get("/prestador-de-servico",function(e,s){return s.sendFile(__dirname+"/views/dweller/service-provider.html")}),server.use(express.static("public")).get("/reclamacoes",function(e,s){return s.sendFile(__dirname+"/views/dweller/claims-dwellers.html")}),server.use(express.static("public")).get("/avisos",function(e,s){return s.sendFile(__dirname+"/views/dweller/warnings-dwellers.html")}),server.use(express.static("public")).get("/perfil",function(e,s){return s.sendFile(__dirname+"/views/dweller/profile-dwellers.html")}).listen(5e3);