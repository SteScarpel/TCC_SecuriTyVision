//Vincular com o Banco de Dados
const {con} = require('./database/db.js');


var moment = require('moment'); moment(). format();

//Puxar Arrays de Valores e funções
const { getLocalPrestacao, getLocalVisita, getTipoEntrada, getTipoVeiculo } = require('./pages_main')

/* Páginas Sindico*/

function renderMainSindico(req, res) {
  let sindico = []

  sql = `
  SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    sindico = result
  return res.render("./administrator/main-administrator.html", {sindico})
  });
}

function renderCadPorteiros(req, res) {
  let sindico = []
  sql = `
  SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    sindico = result
    return res.render("./administrator/security_submit.html",{sindico})
  });
}

function cadPorteiros(req, res) {
  var porteiro = new Object();

  console.log(req.body)
  porteiro.nome = req.body.nome 
  porteiro.sobrenome = req.body.sobrenome 
  porteiro.cpf = req.body.cpf 
  porteiro.rg = req.body.rg 
  porteiro.turno = req.body.turno 
  porteiro.empresaNome = req.body.empresaNomeFunc 
  porteiro.cnpj = req.body.empresaCNPJFunc 
  porteiro.dt_nascimento = req.body.datanascimento
  porteiro.dt_inicio = req.body.datainicio

  var sql = 
      `INSERT IGNORE INTO CAD_PESSOA  
      VALUES (${porteiro.cpf}, '${porteiro.rg}', '${porteiro.nome}', '${porteiro.sobrenome}' , '${porteiro.dt_nascimento}');
  
      `
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Pessoa inserida.");
        });
  
        var turno 
        if (porteiro.turno == 1){
          turno = 'Diurno'
        }
        else {
          turno = 'Noturno'
        }

  var sql2= `
        INSERT IGNORE INTO CAD_EMPRESAS VALUES (${porteiro.cnpj},'${porteiro.empresaNome}');
  `
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Empresa inserida.");
    });

  var sql3 = `
        INSERT INTO FUNC_PORTARIA (cpf_pessoa, data_inicio, cnpj_empresa, turno) 
        VALUES (${porteiro.cpf}, '${porteiro.dt_inicio}', ${porteiro.cnpj}, '${turno}');
  `
    con.query(sql3, function (err, result) {
        if (err) throw err;
        console.log("Porteiro inserido.");
        });
    
  var sql4 = `
        INSERT INTO ACESSOS_LOGIN (login_cpf, nivel_acesso, senha) 
        VALUES (${porteiro.cpf}, 3, '${porteiro.nome}' );
  `

  con.query(sql4, function (err, result) {
    if (err) throw err;
    console.log("Login inserido.");

    return res.redirect("/sindico")
    });

}

function renderRemoverPorteiros(req, res) {
  let funcionarios = []
  let sindico = []

  sql = `
  SELECT f.id_func, p.nome, p.sobrenome from FUNC_PORTARIA as f
  inner join CAD_PESSOA as p on p.cpf = f.cpf_pessoa where f.status_func = 'S';
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("FUNCIONARIOS LOCALIZADOS ");

    funcionarios = result

    console.log(funcionarios)

  
    sql2 = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql2, function (err, result) {
      if (err) throw err;
      sindico = result

    return res.render("./administrator/security_remove.html", {funcionarios, sindico})
    });
  });

  
}

function carregarFuncionario(req,res){
  let porteiro = []
  
  var porteiroid = req.body.funcionario

  sql = `
  SELECT  p.nome, p.sobrenome, f.turno from FUNC_PORTARIA as f
  inner join CAD_PESSOA as p on p.cpf = f.cpf_pessoa where f.status_func = 'S' and id_func = ${porteiroid};
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DADOS LOCALIZADOS ");

    porteiro = result
    console.log(porteiro)
  return res.render("./administrator/security_remove.html", {porteiro, porteiroid})

  });
}

function removerPorteiros(req, res) {
  
  var func = new Object()


  func.nome = req.body.nome.trim()
  func.sobrenome = req.body.sobrenome.trim()
  func.id = req.body.idFunc

  console.log(req.body)
  
  sql= `
  update func_portaria
  set status_func = 'N'
  where id_func = ${func.id};
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
     
    console.log("Status do Porteiro Atualizado")

  });

  sql2 = `
  update acessos_login
  set nivel_acesso = 3
  where login_cpf = ( select  cpf_pessoa from FUNC_PORTARIA where id_func = ${func.id})
  `

  con.query(sql2, function (err, result) {
    if (err) throw err;
     
    console.log("Acesso do Porteiro Atualizado")

    return res.redirect("/sindico")
  });
}

function renderCadastroProprietario(req, res) {
  let sindico = []
  sql = `
  SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    sindico = result

  return res.render("./administrator/owner_submit.html",{sindico})
  });
}

function cadastroProprietario(req, res) {

  console.log(req.body)

  var proprietario = new Object ()
  proprietario.nome = req.body.nome
  proprietario.sobrenome = req.body.sobrenome
  proprietario.cpf = req.body.cpf
  proprietario.rg = req.body.rg
  proprietario.datanascimento = req.body.datanascimento
  proprietario.telefonefixo = req.body.telefonefixo
  proprietario.email = req.body.email
  proprietario.residenciaRua = req.body.residenciaRua
  proprietario.residenciaNum = req.body.residenciaNum
  proprietario.celular = req.body.celular

  var sql = 
      `INSERT IGNORE INTO CAD_PESSOA  VALUES (${proprietario.cpf}, '${proprietario.rg}', '${proprietario.nome}', '${proprietario.sobrenome}' , '${proprietario.dt_nascimento}');
      
      `
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log( "Pessoa Cadastrada")
      });

  var sql2 = `
    INSERT IGNORE INTO PESSOA_CONTATO (cpf, tipo_contato, dados_contato) VALUES (${proprietario.cpf}, 'Telefone', '${proprietario.telefonefixo}'),
     (${proprietario.cpf}, 'E-mail', '${proprietario.email}'), (${proprietario.cpf}, 'Celular', '${proprietario.celular}');
  `
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Contatos Cadastrados")
  });

  var sql3 = `
    INSERT IGNORE INTO CAD_PROPRIETARIO (cpf_proprietario) values (${proprietario.cpf});
  `

  con.query(sql3, function (err, result) {
    if (err) throw err;

  
    console.log("Proprietario Cadastrado")
  });


      var sql4 = `
      INSERT IGNORE INTO RESIDENCIAS VALUES (${proprietario.residenciaNum},'${proprietario.residenciaRua}', (SELECT id_proprietario from CAD_PROPRIETARIO where cpf_proprietario = ${proprietario.cpf}) );
    `
    con.query(sql4, function (err, result) {
      if (err) throw err;
        console.log("Residencia Cadastrada")
    });

    var sql5 = `
      INSERT INTO MORADORES (num_residencia, cpf_pessoa) VALUES (${proprietario.residenciaNum},${proprietario.cpf} )
    `
    con.query(sql5, function (err, result) {
      if (err) throw err;
        console.log("Morador Cadastrada")
    });

    var sql6 = `
      INSERT INTO ACESSOS_LOGIN (login_cpf, nivel_acesso, senha) values (${proprietario.cpf}, 4, 'teste1')
    `
    con.query(sql6, function (err, result) {
      if (err) throw err;
        console.log("Login Cadastrado")

        return res.redirect("/sindico")
    });

}

function renderCadastroSubSindico(req, res) {
  let sindico = []
  let moradores = []

  sql = `
  SELECT m.id_morador, c.nome, c.sobrenome FROM CAD_PESSOA c
  inner join moradores m on m.cpf_pessoa = c.cpf  ;
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("MORADORES LOCALIZADOS ");
    moradores = result
    console.log(moradores)

    sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      sindico = result

    return res.render("./administrator/sub-administrator_submit.html", {moradores, sindico})
    });
  });
}
   
function cadastroSubSindico(req, res) {
  console.log(req.body)
  var morador = req.body.morador 

  sql = `
  INSERT INTO CAD_SINDICO_SUBSINDICO (id_morador) VALUES (${morador})
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Cadastro de Subsindico Realizado")
  });
  sql2 = `
  update ACESSOS_LOGIN
  set nivel_acesso = 2
  where login_cpf = (select cpf_pessoa from moradores where id_morador = ${morador});
  `
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Acesso de Subsindico Concedido")

    
  });
}

function renderCadSindico(req, res) {
  let sindico = []
  let moradores = []

  sql = `
  SELECT m.id_morador, c.nome, c.sobrenome FROM CAD_PESSOA c
  inner join moradores m on m.cpf_pessoa = c.cpf  ;
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("MORADORES LOCALIZADOS ");
    moradores = result
    console.log(moradores)

    sql2 = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql2, function (err, result) {
      if (err) throw err;
      sindico = result

  return res.render("./administrator/administrator_submit.html", {moradores,sindico})
  });
  });
}

function cadSindico(req, res) {
  console.log(req.query)

  var morador = req.body.morador 

  sql = `
  INSERT INTO CAD_SINDICO_SUBSINDICO (id_morador) VALUES (${morador})
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Cadastro de Subsindico Realizado")
  });
  sql2 = `
  update ACESSOS_LOGIN
  set nivel_acesso = 1
  where login_cpf = (select cpf_pessoa from moradores where id_morador = ${morador});
  `
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Acesso de Subsindico Concedido")
    
  });

}

function renderLoginSindico(req, res) {
  return res.render("./administrator/login_administrator.html")
}

function loginSindico(req, res) {
}

function renderRecebimentoPortaria(req, res) {
  let sindico = []
  let residencias = []

  sql = `
  SELECT num_residencia FROM RESIDENCIAS WHERE num_residencia > 0 order by num_residencia ;
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RESIDENCIAS LOCALIZADAS ");

    residencias = result

    console.log(residencias)

    sql2 = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql2, function (err, result) {
      if (err) throw err;
      sindico = result

  return res.render("./administrator/reception_ordinance.html", {residencias,sindico})
    });
  });
}

function recebimentoPortaria(req, res) {
  let correspondencias = []
  let residencias = []

  var numResidencia = req.body.residenciaNum
  
  var recebimentoData = req.body.dataRecebimento

  sql = `
    select e.tipo_entrega, e.status_entrega, p.nome, p.sobrenome from REG_CORRESPONDENCIA AS e 
    join MORADORES as m on e.id_dest_morador = m.id_morador 
    join cad_pessoa as p on m.cpf_pessoa = p.cpf
    where e.num_residencia = ${numResidencia} and e.data_recebimento = '${recebimentoData}';
  `
  

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("CORRESPONDENCIAS LOCALIZADAS ");
    console.log(result)
    correspondencias = result

    

    return res.render("./administrator/reception_ordinance.html", {correspondencias})
    
  });

}


function renderAcessosAgendados(req, res) {
  let sindico = []
  let residencias = [] 
  
  sql = `
  SELECT num_residencia FROM RESIDENCIAS WHERE num_residencia > 0 order by num_residencia;
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RESIDENCIAS LOCALIZADAS ");

    residencias = result

    console.log(residencias)
    sql2 = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql2, function (err, result) {
      if (err) throw err;
      sindico = result
  return res.render("./administrator/scheduled_ accesses.html", {residencias, sindico})
    });
  });

}

function acessosAgendados(req, res) {

  var residencia = req.body.residencia 

  sql= `
  select p.nome, p.sobrenome, p.cpf, h.hora_inicio, h.hora_saida, f.num_residencia, h.dia_semana from CAD_PESSOA as p inner join  CAD_PRESTADOR_FIXO_RESIDENCIAS as f on f.cpf_pessoa_prestador = cpf
  inner join PERMANENCIA_PRESTADOR_FIXO as h on h.id_prestador_fixo = f.id_prestador_fixo where num_residencia = ${residencia}
  `
  let historicos = [] 

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("ACESSOS LOCALIZADAS ");

    historicos = result 

    return res.render("./administrator/scheduled_ accesses.html", {historicos})
  });
}

function renderEntradaSaida(req, res) {
  let sindico = []

  sql2 = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql2, function (err, result) {
      if (err) throw err;
      sindico = result
  return res.render("./administrator/entrance_exit.html",{sindico})
  });
}

function entradaSaida(req, res) {

  var datas = new Object()

  datas.inicio = req.body.dataInicio 
  datas.fim = req.body.dateFinal 

  let historico = []
  let date = []
  sql = `
  select placa_veiculo , data_acesso, hora_acesso from HIST_ACESSO_PORTAO_VEICULOS where data_acesso between cast('${datas.inicio}' as date) and cast('${datas.fim}' as date);
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("ACESSOS LOCALIZADAS ");
    historico = result
    date = moment(historico.data_acesso).format('DD/MM/YYYY')
    console.log(result)
    return res.render("./administrator/entrance_exit.html", {historico, date})
  });

}

function renderConsultaReclamacoes(req, res) {
  let sindico = []
  let reclamacoes = []
  let datas = []

  //carregar o nome do usuário logado 
  sql = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql, function (err, result) {
      if (err) throw err;
      sindico = result

      sql2 = `
      select r.num_reclamacao, r.data_reclamacao, r.id_morador_reclamante, r.residencia_reclamada, r.reclamacao , p.nome, p.sobrenome 
      from CAD_RECLAMACAO_MORADORES as r
      inner join MORADORES as m on r.id_morador_reclamante = m.id_morador 
      inner join CAD_PESSOA as p  on m.cpf_pessoa = p.cpf where r.verificacao_leitura = 'Não Lido';
      `

      con.query(sql2, function (err, result) {
        if (err) throw err;

        reclamacoes = result
        
       return res.render("./administrator/consult_complaints.html",{sindico, reclamacoes})

      });
    });
}

function consultaReclamacoes(req, res) {

  console.log(req.body)

  var id = req.body.reclamacaoID

  sql=`
    UPDATE CAD_RECLAMACAO_MORADORES
    set verificacao_leitura = 'Lido'
    where num_reclamacao = ${id}
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
      
      return res.redirect("/consultar-reclamacao")
  });

}

function renderEnviarAvisos(req, res) {
  let sindico = []
  let residencias = []

  sql = `
  SELECT num_residencia FROM RESIDENCIAS WHERE num_residencia > 0 order by num_residencia;
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RESIDENCIAS LOCALIZADAS ");

    residencias = result

    console.log(residencias)
    sql2 = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql2, function (err, result) {
      if (err) throw err;
      sindico = result
  return res.render("./administrator/send_warning.html", {residencias,sindico})
    });
  });
}

function enviarAvisos(req, res) {

  var aviso = new Object()

  aviso.residencia = req.body.residencia 
  aviso.aviso = req.body.aviso 
  aviso.data = moment().format("YYYY/MM/DD")

  console.log(aviso.data)

  sql = `
    INSERT INTO AVISOS_SINDICO (data_envio, residencia_receber, aviso) VALUES ("${aviso.data}", ${aviso.residencia}, "${aviso.aviso}")
  `
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(" Aviso Cadastrado")
  });
}

function renderTrocarSenha(req, res) {
  return res.render("./administrator/change_password.html")
}

function trocarSenha(req, res) {
}

function perfilDeAcesso(req, res) {

    if (req.session.user.nivel_acesso == 1 || req.session.user.nivel_acesso == 2){
    return res.render("./administrator/access_identity.html")
  }
  else if (req.session.user.nivel_acesso == 4  || req.session.user.nivel_acesso == 5 ){
    return res.redirect("/app-moradores")
  }
 
}

function rederRequerimentos(req, res) {
  let residencias = []
  let sindico = [] 

  sql = `
  SELECT num_residencia FROM RESIDENCIAS WHERE num_residencia > 0 order by num_residencia;
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RESIDENCIAS LOCALIZADAS ");

    residencias = result

  sql2 = `
    SELECT nome from CAD_PESSOA where cpf = ${req.session.user.login_cpf };
    `
    con.query(sql2, function (err, result) {
      if (err) throw err;
      sindico = result
      return res.render("./administrator/requirements.html",{sindico,residencias})
    });
  });
}

function gerarHistorico(req,res){

}

module.exports = {
  renderMainSindico,
  renderCadPorteiros, cadPorteiros,
  renderRemoverPorteiros, removerPorteiros, carregarFuncionario,
  renderCadastroProprietario, cadastroProprietario,
  cadastroSubSindico, renderCadastroSubSindico,
  cadSindico, renderCadSindico,
  loginSindico, renderLoginSindico,
  recebimentoPortaria, renderRecebimentoPortaria,
  acessosAgendados, renderAcessosAgendados,
  entradaSaida, renderEntradaSaida,
  consultaReclamacoes, renderConsultaReclamacoes,
  enviarAvisos, renderEnviarAvisos,
  trocarSenha,renderTrocarSenha,
  perfilDeAcesso,
  rederRequerimentos, gerarHistorico
}