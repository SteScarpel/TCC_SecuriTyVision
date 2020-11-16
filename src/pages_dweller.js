//Vincular com o Banco de Dados
const {con} = require('./database/db.js');

var moment = require('moment'); moment(). format();

//Puxar Arrays de Valores e funções
const { getLocalPrestacao, getLocalVisita, getTipoEntrada, getTipoVeiculo } = require('./pages_main')

/* Paginas Moradores */

function renderLoginMorador(req, res) {
  return res.render("./dweller/login_dweller.html")
}

function loginMorador(req, res) {
}

function renderMainMorador(req, res) {
  let morador = []
  sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
  return res.render("./dweller/app_dweller.html",{morador})
  });
}

function mainMorador(req, res) {
}

function renderCadVeiculo(req, res) {
  let morador = []
  let moradores = [] 

  sql= `
  select p.nome, p.sobrenome,m.id_morador from CAD_PESSOA as p inner join 
  MORADORES as m on m.cpf_pessoa = p.cpf where num_residencia = (select num_residencia from MORADORES where cpf_pessoa = ${req.session.user.login_cpf});
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    moradores = result
    

    sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
  return res.render("./dweller/veiculos_dweller.html", {moradores,morador})

  });
  });
}

function cadVeiculo(req, res) {
  console.log(req.body)
  
  var tipo, placa, proprietario, modeloVeiculo
  var i = req.body.tipoVeiculo.length

  console.log(i)

  if(i = 1 ){
    tipo = req.body.tipoVeiculo
    placa = req.body.placa
    proprietario = req.body.proprietario
    modeloVeiculo = req.body.modeloVeiculo

    sql =` 
    INSERT INTO VEICULOS_MORADORES (id_morador, tipo_veiculo, modelo_veiculo, placa_veiculo) 
    VALUES (${proprietario}, ${tipo},  '${modeloVeiculo}', '${placa}' ) ;
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 Veiculo Cadastrado");
    });
  }
  else {
    for( var cont = 0; cont < i ; cont++ ){
    tipo = req.body.tipoVeiculo[cont]
    placa = req.body.placa[cont]
    proprietario = req.body.proprietario[cont]
    modeloVeiculo = req.body.modeloVeiculo[cont]

    sql =` 
      INSERT INTO VEICULOS_MORADORES (id_morador, tipo_veiculo, modelo_veiculo, placa_veiculo) 
      VALUES (${proprietario}, ${tipo},  '${modeloVeiculo}', '${placa}' ) ;
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Varios Veiculos Cadastrados");
      });

  }
  }


}

function renderCadMoradores(req, res) {
  let morador = []
  sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
  return res.render("./dweller/dwellers.html",{morador})
});
}

function cadMoradores(req, res) {
  console.log(req.body)
  var morador = new Object()

  morador.nome = req.body.nome
  morador.sobrenome = req.body.sobrenome 
  morador.cpf = req.body.cpf 
  morador.rg = req.body.rg 
  morador.dtnasc = req.body.datanascimento 
  morador.telefone = req.body.telefonefixo 
  morador.email = req.body.email 
  morador.celular = req.body.celular 

  var sql = 
  `INSERT IGNORE INTO CAD_PESSOA  VALUES (${morador.cpf}, '${morador.rg}', '${morador.nome}', '${morador.sobrenome}' , '${morador.dtnasc}');
  
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log( "Pessoa Cadastrada")
  });

    var sql2 = `
    INSERT IGNORE INTO PESSOA_CONTATO (cpf, tipo_contato, dados_contato) VALUES (${morador.cpf}, 'Telefone', '${morador.telefonefixo}'),
    (${morador.cpf}, 'E-mail', '${morador.email}'), (${morador.cpf}, 'Celular', '${morador.celular}');
    `
    con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Contatos Cadastrados")
    });


    
    var sql3 = `
      INSERT IGNORE INTO MORADORES (num_residencia, cpf_pessoa) VALUES ((select num_residencia from residencias where id_proprietario = (select id_proprietario from cad_proprietario where cpf_proprietario = ${req.session.user.login_cpf})) ,${morador.cpf} )
    `
    con.query(sql3, function (err, result) {
      if (err) throw err;
        console.log("Morador Cadastrado")
    });

    var sql4 = `
      INSERT IGNORE INTO ACESSOS_LOGIN (login_cpf, nivel_acesso, senha) values (${morador.cpf}, 5, 'teste1')
    `
    con.query(sql4, function (err, result) {
      if (err) throw err;
        console.log("Login Cadastrado")

        return res.redirect("/moradores")
    });
   

}

function renderEncomendas(req, res) {
  let morador = []
  let correspondencias = []

  sql= `
  select e.tipo_entrega, e.status_entrega, e.data_recebimento, p.nome, p.sobrenome from REG_CORRESPONDENCIA AS e 
  join MORADORES as m on e.id_dest_morador = m.id_morador 
  join CAD_PESSOA as p on m.cpf_pessoa = p.cpf
  where e.num_residencia = (select num_residencia from MORADORES where cpf_pessoa = ${req.session.user.login_cpf})  and e.status_entrega = 'Disponível Retirada';
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Correspondências Localizadas");
    correspondencias = result
    console.log(correspondencias)

    sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
    return res.render("./dweller/orders-dwellers.html", {correspondencias,morador})
    });
    });

 
}

function encomendas(req, res) {
  //aqui n precisa de nada 
}

function renderCadPrestFixo(req, res) {
  let morador = []

  sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
  return res.render("./dweller/service-provider.html",{morador})
});
}

function cadPrestFixo(req, res) {


  console.log(req.body)
  var prestador = new Object()

  prestador.nome = req.body.nome 
  prestador.sobrenome = req.body.sobrenome 
  prestador.cpf = req.body.cpf 
  prestador.rg = req.body.rg 
  prestador.datanasc = req.body.datanasc 
  prestador.servico = req.body.tiposervico 

  sql = `
  INSERT IGNORE INTO CAD_PESSOA  VALUES (${prestador.cpf}, '${prestador.rg}', '${prestador.nome}', '${prestador.sobrenome}' , '${prestador.dt_nascimento}');
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Pessoa Cadastrada");
    });

  sql2 = `
    INSERT IGNORE INTO CAD_PRESTADOR_FIXO_RESIDENCIAS (cpf_pessoa_prestador, num_residencia, tipo_servico) 
    VALUES (${prestador.cpf}, (select num_residencia from MORADORES where cpf_pessoa = ${req.session.user.login_cpf}), '${prestador.servico}');
  `

  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Prestador Cadastrado");
    var i = req.body.diaSemana.length;
    var j = req.body.horaEntrada.length;
    var k = req.body.horaSaida.length
    console.log("Quantidade de dias: "+ i)
    console.log("Quantidade de horas entradas: "+ j)
    console.log("Quantidade de horas saidas: "+ k)
  
   var diaSemana, horaEntrada, horaSaida
  
   for( var cont = 0; cont < i ; cont++ ){
     diaSemana = req.body.diaSemana[cont]
     horaEntrada = req.body.horaEntrada[cont]
     horaSaida = req.body.horaSaida[cont]
     console.log("O dia da semana é: "+ diaSemana + " A hora de entrada : "+ horaEntrada + " Hora de saida: "+horaSaida)
  
     sql3 = `
    INSERT INTO PERMANENCIA_PRESTADOR_FIXO (id_prestador_fixo, dia_semana, hora_inicio, hora_saida )
    VALUES ((select id_prestador_fixo from CAD_PRESTADOR_FIXO_RESIDENCIAS where cpf_pessoa_prestador = ${prestador.cpf}), ${diaSemana}, '${horaEntrada}', '${horaSaida}' );
    `
     con.query(sql3, function (err, result) {
      if (err) throw err;
      console.log("Acessos Cadastrados ");

       return res.redirect("/prestador-de-servico")
      });
   }
    });
 
 
}

function renderReclamacao(req, res) {
  let morador = []
  let residencias = []

  sql = `
  SELECT num_residencia FROM RESIDENCIAS WHERE num_residencia > 0 order by num_residencia ;
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RESIDENCIAS LOCALIZADAS ");

    residencias = result

    console.log(residencias)

    sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
    return res.render("./dweller/claims-dwellers.html",{residencias, morador})
  });
  });



}

function reclamacao(req, res) {
  console.log(req.body)
  
  var residencia = req.body.residenciaNum 
  var reclamacaoTexto = req.body.reclamacao
  var data =  moment().format('YYYY/MM/DD')

  sql = `
    INSERT INTO CAD_RECLAMACAO_MORADORES (data_reclamacao, id_morador_reclamante, residencia_reclamada, reclamacao)
    VALUES ('${data}', (SELECT id_morador from MORADORES where cpf_pessoa = ${req.session.user.login_cpf} ), ${residencia}, '${reclamacaoTexto}') ;
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RECLAMAÇÃO CADASTRADA ");

    return res.redirect("/reclamacoes" )
  });


}

function renderAvisosMoradores(req, res) {
  let morador = []
  let avisos = []

  sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result

      sql2 = `
      select id_aviso,data_envio, aviso from AVISOS_SINDICO 
      where residencia_receber = (select num_residencia from MORADORES where cpf_pessoa = ${req.session.user.login_cpf }) and verificacao_leitura = 'Não Lido' ;
      `
      con.query(sql2, function (err, result) {
        if (err) throw err;
        avisos = result 
        console.log(avisos)

        return res.render("./dweller/warnings-dwellers.html",{morador, avisos})
      });
});
}

function avisosMoradores(req, res) {
  console.log(req.body)
  var id = req.body.reclamacaoID
  console.log("Id: "+id)
  sql=`
    UPDATE AVISOS_SINDICO
    set verificacao_leitura = 'Lido'
    where id_aviso = ${id};
  `

  con.query(sql, function (err, result) {
    if (err) throw err;

    console.log("Confirmado como lido")
    return res.redirect("/avisos")
  });

}

function renderPerfilMoradores(req, res) {
  let morador = []
  let email = []
  let telfixo = []
  let celular = []
  
  sql2 = `
  select dados_contato from PESSOA_CONTATO where tipo_contato = 'E-mail' and cpf = ${req.session.user.login_cpf };
  `

  con.query(sql2, function (err, result) {
    if (err) throw err;
     email = result
    console.log(email)

    sql3 = `
    select dados_contato from PESSOA_CONTATO where tipo_contato = 'Telefone' and cpf = ${req.session.user.login_cpf };
    `
     con.query(sql3, function (err, result) {
      if (err) throw err;
      telfixo = result 

      sql4 = `
      select dados_contato from PESSOA_CONTATO where tipo_contato = 'Celular' and cpf = ${req.session.user.login_cpf };
      `
      con.query(sql4, function (err, result) {
        if (err) throw err;
        celular = result

      //carregar nome do morador no navbar
        sql = `
        SELECT nome , sobrenome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
        `
        con.query(sql, function (err, result) {
          if (err) throw err;
          morador = result
          return res.render("./dweller/profile-dwellers.html",{telfixo,morador, email, celular })
        });
      });
    });
  });
}

function perfilMoradores(req, res) {
  
  var dadosPerfil = new Object()
  dadosPerfil.nome = req.body.name 
  dadosPerfil.email = req.body.email 
  dadosPerfil.fixo = req.body.telFixo 
  dadosPerfil.celular = req.body.telCel 

  

}

function renderRegisteredProviders(req, res) {
  let morador = []
  let prestadores = []

  sql = `
  select f.id_prestador_fixo,p.nome, p.sobrenome from CAD_PESSOA as p
  inner join CAD_PRESTADOR_FIXO_RESIDENCIAS as f on 
  f.cpf_pessoa_prestador = cpf where f.num_residencia = (select num_residencia from MORADORES where cpf_pessoa = ${req.session.user.login_cpf})  and status_liberacao = 'liberado' ;
   `

   con.query(sql, function (err, result) {
    if (err) throw err;
    prestadores = result
    sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
    return res.render("./dweller/registered_providers.html", {prestadores,morador})
   });
   });

  
}

function registeredProviders(req, res) {
  console.log(req.body)
}

function renderVeiculosCadastrados(req, res) {
  let morador = []
  let veiculos = []
  sql =`
  select id_veiculo, placa_veiculo, modelo_veiculo from VEICULOS_MORADORES as v 
  inner join MORADORES as m on m.id_morador = v.id_morador where m.num_residencia = (select num_residencia from MORADORES where cpf_pessoa = ${req.session.user.login_cpf});
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    veiculos = result

    sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
   return res.render("./dweller/registered_cars.html", {veiculos,morador})

  });
  });

}

function veiculosCadastrados(req, res) {

  var veiculo = req.body.veiculosMorador

  sql = `
  delete from VEICULOS_MORADORES
  where id_veiculo = ${veiculo};
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Veiculo Excluído.")
  }); 

}

function renderTermosDeUso(req, res) {
  let morador = []

  sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      morador = result
  return res.render("./dweller/terms-of-use.html",{morador})
});
}

function termosDeUso(req, res) {
  console.log(req.body)
  var cessao = req.body.concordoComTermos 
  var data = moment().format('YYYY-MM-DD')
  var hora = moment().format('h:mm:ss')

  sql = `
  INSERT INTO CESSAO_DIREITOS_USO (usuario, autorizacao, data_cessao, hora_cessao)
  VALUES (${req.session.user.login_cpf}, '${cessao}','${data}','${hora}' );
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("cessao de direitos cadastrada")

    return res.redirect("/perfil")
  });

}

function renderEsqueciSenha(req, res) {
  return res.render("./dweller/data-forgot-password.html")
}

function esqueciSenha(req, res) {
}

function renderEsqueciSenhaconfrimacao(req, res) {
  return res.render("./dweller/confirm-forgot-password.html")
}

function esqueciSenhaconfrimacao(req, res) {
}



/* Puxar Funções JS de Inserção do Banco*/
// const { } = require('./database/send-form.js')

module.exports = {
  loginMorador, renderLoginMorador,
  mainMorador, renderMainMorador,
  cadVeiculo,renderCadVeiculo,
  cadMoradores,renderCadMoradores,
  encomendas,renderEncomendas,
  cadPrestFixo,renderCadPrestFixo,
  reclamacao,renderReclamacao,
  avisosMoradores,renderAvisosMoradores,
  perfilMoradores,renderPerfilMoradores,
  registeredProviders,renderRegisteredProviders,
  veiculosCadastrados,renderVeiculosCadastrados,
  renderTermosDeUso, termosDeUso,
  renderEsqueciSenha,esqueciSenha,
  esqueciSenhaconfrimacao,renderEsqueciSenhaconfrimacao
}