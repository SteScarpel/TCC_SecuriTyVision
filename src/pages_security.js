//Vincular com o Banco de Dados
const {con} = require('./database/db.js');

var moment = require('moment'); moment(). format();

//Puxar Arrays de Valores e funções
const { getLocalPrestacao, getLocalVisita, getTipoEntrada, getTipoVeiculo } = require('./pages_main');
const bodyParser = require('body-parser');

// const { loginPorteiro, senhaPorteiro} = require('./test')

 //Chamadas as Páginas
 

 function telalogin(req, res) {
  
  
  console.log(req.body)

  return res.render("./login.html")

 
}

function validaLogin(req, res){
   var acesso = new Object ()

    acesso.login = req.body.login
    acesso.password = req.body.password

    

    let testeAcesso  = []
    const sql = `
    SELECT 
     login_cpf,nivel_acesso, status_login FROM acessos_login 
     where login_cpf = '${acesso.login}' and senha = '${acesso.password}'
  `
  con.query(sql, function (err, result) {
    if (err) throw err;

      req.session.user = result[0]
  
      if ( req.session.user.nivel_acesso == 3){
        return res.redirect("/main-seguranca")
      }
      else if (req.session.user.nivel_acesso == 1 || req.session.user.nivel_acesso == 2){
        return res.redirect("/sindico")
      }
      else if (req.session.user.nivel_acesso == 4  || req.session.user.nivel_acesso == 5 ){
        return res.redirect("/app-moradores")
      }
      
      
  })

  
  
}

   
   function mainSeguranca(req, res) {
  
  var todaydate = moment().format('YYYY/MM/DD')
  let historico = []
  let date = []
  const sql = `
    SELECT placa_veiculo , data_acesso, hora_acesso FROM HIST_ACESSO_PORTAO_VEICULOS  where data_acesso = '${todaydate}'
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
      // console.log(result)

      historico = result
      
       date = moment(historico.data_acesso).format('DD/MM/YYYY')
      
      return res.render("./security/main-security.html", {historico:historico,  user:req.session.user, date})
      
    }
    );
    
}

function camerasSeguranca(req, res) {
  return res.render("./security/cameras.html")
}

function acessosDia(req, res) {
  return res.render("./security/day-access.html")
}

function historicoCorrespondencia(req, res) {
  return res.render("./security/history-mail.html")
}

function renderMoradores(req, res){
  let moradores = []

  
  var numResidencia = req.query.residenciaNum
    sql = `
    SELECT id_morador, nome, sobrenome FROM CAD_PESSOA c
    inner join moradores m on c.cpf = m.cpf_pessoa where m.num_residencia = ${numResidencia};
    `
    

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("MORADORES LOCALIZADOS ");
      moradores = result
      return res.render("./security/mail_submit.html",{ moradores} )

    });
}

function renderRegistroCorrespondencia(req, res) {

  let residencias = []

  sql = `
  SELECT num_residencia FROM RESIDENCIAS WHERE num_residencia > 0 ;
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("RESIDENCIAS LOCALIZADAS ");

    residencias = result

    console.log(residencias)

  
    return res.render("./security/mail_submit.html",{residencias} )

  });

  
}



function registroCorrespondencia (req, res){
  dados = req.body
  console.log(req.body)

  const registro = new Object();
  registro.tipoEntrega = req.body.tipoentrega
  registro.dataRecebimento = req.body.datarecebimento
  registro.morador = req.body.morador
  registro.porteiro = req.session.user.login_cpf
  registro.statusEntrega = "Disponível Retirada"
  registro.dataCadastro = moment().format('YYYY/MM/DD')



  sql = `
  INSERT INTO REG_CORRESPONDENCIA (tipo_entrega, data_recebimento, id_dest_morador, id_porteiro, status_entrega, data_cadastro)
    VALUES (${registro.tipoEntrega}, '${registro.dataRecebimento}', ${registro.morador}, ${registro.porteiro}, '${registro.statusEntrega}', '${registro.dataCadastro}');
  `

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("CORRESPONDENCIA CADASTRADA ");
    
    return res.redirect("/registro-correspondencia" )

  });
  
}

function retiradaCorrespondencia(req, res) {
  const filters = req.query //manter os valores selecionados aparecendo 
  return res.render("./security/receive-mail.html", { filters })
}

function acessoProgramado(req, res) {
  return res.render("./security/scheduled-access.html")
}

function renderCadastroVisitante(req,res){
  return res.render("./security/visitor_submit.html")
}


function cadastroVisitante(req, res) {
  
  
  dados = req.body
  const isNotEmpty = Object.keys(dados).length != 0
  if ( isNotEmpty ){
   //adicionar dados ao objeto
   //dados de pessoa
      var pessoaDados = new Object();
      pessoaDados.cpf = req.body.cpf
      pessoaDados.rg = req.body.rg 
      pessoaDados.nome = req.body.nome
      pessoaDados.sobrenome = req.body.sobrenome 
     pessoaDados.dt_nascimento = moment(req.body.dt_nascimento).format('YYYY/MM/DD')
   //dados da visita 
   var visitaDados = new Object();
      visitaDados.cpf = pessoaDados.cpf
      visitaDados.local = req.body.localcondominio
      visitaDados.num = req.body.residenciaNum 
      visitaDados.tipoentrada = req.body.tipoentrada
      visitaDados.porteiro = req.session.user.login_cpf   //--carrega o logindo porteiro conectado
      visitaDados.acompanhantes = req.body.numAcompanhantes //0 enquanto o campo não é adicionado
      visitaDados.data = moment().format('YYYY/MM/DD')
      visitaDados.hora = moment().format('HHmmss')
      //dados do veiculo, caso entre de veiculo
      var visitaVeiculo = new Object();
        
      visitaVeiculo.placaVeiculo = req.body.placaveiculo
      visitaVeiculo.tipoVeiculo = req.body.tipoveiculo

      
      
      // realizar registro no banco de dados 
      var sql = 
      `INSERT IGNORE INTO CAD_PESSOA  VALUES (${pessoaDados.cpf}, '${pessoaDados.rg}', '${pessoaDados.nome}', '${pessoaDados.sobrenome}' , '${pessoaDados.dt_nascimento}');
      
      `

     
      con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      });

      if (visitaDados.local == 1){
        visitaDados.num = 0;
        
      }


        var sql = ` 
        INSERT INTO REG_VISITAS (cpf_visitante, data_visita, hora_entrada, tipo_local_visita, numero_res, registro_porteiro, quantidade_acompanhantes) 
        VALUES (${visitaDados.cpf}, '${visitaDados.data}', '${visitaDados.hora}' , ${visitaDados.local}, ${visitaDados.num}, ${visitaDados.porteiro}, ${visitaDados.acompanhantes} );
        `

        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted na table 2 ");
          });


        
          //somente registrar veiculo caso o tipo de entrada seja veiculo 

          if (visitaDados.tipo_entrada == 2){

            var sql = `
            SELECT id_visita from REG_VISITAS where  cpf_visitante = ${visitaDados.cpf} and data_visita = '${visitaDados.data}' and hora_entrada = '${visitaDados.hora}'
            `
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("Realizada captura do id da visita ");
              
      
            visitaVeiculo.id_visita = result
      

            var sql = `
            INSERT INTO REG_VISITAS_VEICULOS (id_visita , placa_veiculo, tipo_veiculo) VALUES (${visitaVeiculo.id_visita}, '${visitaVeiculo.placaVeiculo}', '${visitaVeiculo.tipoVeiculo}');
            `
  
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted na table 3 ");
              });

            });

            var sql = `
              INSERT INTO HIST_ACESSO_PORTAO_VEICULOS ( placa_veiculo, data_acesso, hora_acesso ) VALUES ('${prestadorVeiculo.placaVeiculo}', '${prestacaoDados.data}', '${prestacaoDados.hora}' );
              `
  
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted ON  HIST_ACESSO_PORTAO_VEICULOS ");
                });
            
          }
         
      }

      return res.redirect("/main-seguranca")

}

function renderCadPrestadorServico (req, res){
  return res.render("./security/service_submit.html")
}

//função completa - só falta as query do BD
function cadPrestadorServico(req, res) {

   

   const dados = req.body

   const isNotEmpty = Object.keys(dados).length != 0
   if ( isNotEmpty ){
   //adicionar dados ao objeto
   //dados de pessoa
   var pessoaDados = new Object();
   pessoaDados.cpf = req.body.cpf 
   pessoaDados.rg = req.body.rg 
   pessoaDados.nome = req.body.nome
   pessoaDados.sobrenome = req.body.sobrenome 
  pessoaDados.dt_nascimento =  moment(req.body.datanascimento).format('YYYY/MM/DD')

   //Dados da empresa 
   var prestadorEmpresa = new Object();
   prestadorEmpresa.cnpj = req.body.empresaCNPJFunc
   prestadorEmpresa.nome = req.body.empresaNomeFunc

   //Local de Prestacao de Servico


  var prestacaoDados = new Object();
  prestacaoDados.cpf = req.body.cpf 
  prestacaoDados.data = moment().format('YYYY/MM/DD')
  prestacaoDados.hora = moment().format('HH:mm:ss')
  prestacaoDados.local = req.body.localcondominio
  prestacaoDados.num =  req.body.residenciaNum
  prestacaoDados.porteiro = req.session.user.login_cpf
  prestacaoDados.tipo_entrada = req.body.tipoentrada

  //Veiculo Prestador
  var prestadorVeiculo = new Object();
  
  prestadorVeiculo.placaVeiculo = req.body.placaveiculo
  prestadorVeiculo.tipoVeiculo = req.body.tipoveiculo

  if (prestadorEmpresa.cnpj.length == 0 ){
    prestadorEmpresa.cnpj = 0
  }
  
    var sql = `
        INSERT IGNORE INTO CAD_EMPRESAS VALUES ( ${prestadorEmpresa.cnpj}, '${prestadorEmpresa.nome}');
      `
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted on CAD_EMPRESAS");
        });

  

      
  
  // realizar registro no banco de dados 
      var sql = 
      `INSERT IGNORE INTO CAD_PESSOA  VALUES (${pessoaDados.cpf}, '${pessoaDados.rg}', '${pessoaDados.nome}', '${pessoaDados.sobrenome}' , '${pessoaDados.dt_nascimento}');
      
      `
     
      con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted on CAD_PESSOA");
      });

      if (prestacaoDados.local == 1){
        prestacaoDados.num = 0;
        
      }

        var sql = ` 
        INSERT INTO REG_PRESTADOR_SERVICO (cnpj_empresa, cpf_pessoa, id_porteiro, tipo_entrada, tipo_local_servico,  numero_res, data_entrada, hora_entrada ) 
        VALUES ( ${prestadorEmpresa.cnpj}, ${prestacaoDados.cpf}, ${prestacaoDados.porteiro}, ${prestacaoDados.tipo_entrada}, ${prestacaoDados.local}, ${prestacaoDados.num}, '${prestacaoDados.data}', '${prestacaoDados.hora}' );
        `

        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted ON REG_PRESTADOR_SERVICO ");
          });


          //somente registrar veiculo caso o tipo de entrada seja veiculo 

          if (prestacaoDados.tipo_entrada == 2  ){

            var sql = `
            SELECT id_servico from REG_PRESTADOR_SERVICO where  cpf_pessoa = ${prestacaoDados.cpf} and data_entrada = '${prestacaoDados.data}' and hora_entrada = '${prestacaoDados.hora}'
            `
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("Realizada captura do id da prestacao ");
              
      
              prestadorVeiculo.id_servico = result
      

            var sql = `
            INSERT INTO REG_PREST_SERVICO_VEICULO (id_servico , tipo_veiculo, placa_veiculo) VALUES (${prestadorVeiculo.id_servico}, '${prestadorVeiculo.tipoVeiculo}' , '${prestadorVeiculo.placaVeiculo}');
            `
  
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted ON REG_PREST_SERVICO_VEICULO ");
              });
            

              var sql = `
              INSERT INTO HIST_ACESSO_PORTAO_VEICULOS ( placa_veiculo, data_acesso, hora_acesso ) VALUES ('${prestadorVeiculo.placaVeiculo}', '${prestacaoDados.data}', '${prestacaoDados.hora}' );
              `
  
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted ON  HIST_ACESSO_PORTAO_VEICULOS ");
                });
              });
          
   }
  return res.redirect("/main-seguranca")
}
}


module.exports = { 
   camerasSeguranca, acessosDia , historicoCorrespondencia, registroCorrespondencia, retiradaCorrespondencia,
  acessoProgramado, cadastroVisitante, cadPrestadorServico, telalogin, validaLogin, mainSeguranca, renderCadastroVisitante, 
  renderCadPrestadorServico, renderRegistroCorrespondencia, renderMoradores
}
