const db = require('./db.js').con;

//teste do pool
// var sql = "INSERT INTO acesso_portao_ia (placa_veiculo) VALUES ('JFF4974');";
//   db.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("1 record inserted");
//   });

//SISTEMA DE SINDICOS 
function cadPorteiros() {

  //PASSO 1: CAPTURAR DADOS
  //Dados da pessoa
  var pessoaDados = new Object();
  pessoaDados.cpf = document.getElementById('cpf').value;
  pessoaDados.rg = document.getElementById('rg').value;
  pessoaDados.nome = document.getElementById('nome').value;
  pessoaDados.sobrenome = document.getElementById('sobrenome').value;
  pessoaDados.dt_nascimento = document.getElementById('data-nascimento').value;


  //Dados do Funcionario
  var funcDados = new Object();
  funcDados.turno = $('#turno-porteiro :selected').text();
  funcDados.dt_inicio = document.getElementById('data-inicio').value;
  funcDados.statuFunc = $('#statusFunc :selected').text();
  funcDados.login = document.getElementById('loginFunc').value;
  funcDados.senha = document.getElementById('senhaFunc').value;


  //Dados Empresa do Funcionario

  var funcEmpresa = new Object();
  funcEmpresa.cnpj = document.getElementById('empresaCNPJFunc').value;
  funcEmpresa.nome = document.getElementById('empresaNomeFunc').value;

  // console.log('chamou com sucesso');


}

function cadProprietarios() {
  //PASSO 1: CAPTURAR DADOS
  //Dados da pessoa
  var pessoaDados = new Object();
  pessoaDados.cpf = document.getElementById('cpf').value;
  pessoaDados.rg = document.getElementById('rg').value;
  pessoaDados.nome = document.getElementById('nome').value;
  pessoaDados.sobrenome = document.getElementById('sobrenome').value;
  pessoaDados.dt_nascimento = document.getElementById('data-nascimento').value;


  //dados de contato da pessoa 
  var pessoaContato = new Object();
  pessoaContato.cof = pessoaDados.cpf; //puxar o valor do campo CPF
  pessoaContato.tipoCtt = " ";
  pessoaContato.email = document.getElementById('email').value;
  pessoaContato.telefone = document.getElementById('telefone-fixo').value;
  pessoaContato.celular = document.getElementById('celular').value;

  //Dados da Residencia 
  var residencia = new Object();
  residencia.num = document.getElementById('residenciaNum').value;
  residencia.rua = document.getElementById('residenciaRua').value;
  residencia.proprietario = 0; //puxar id do proprietario 
  // console.log('chamou com sucesso');

  //PASSO 2: INSERTS NO BANCO
  //Capturar ID do Proprietario do banco (o id é auto increment)
}

function cadSubsindico() {
  //Aguardar tela ficar pronta

}

function cadSindico() {
  //Aguardar tela ficar pronta

}

//SISTEMA DE PORTARIA 
function cadVisitante() {
  //PASSO 1: CAPTURAR DADOS
  //Dados da pessoa
  var pessoaDados = new Object();
  pessoaDados.cpf = document.getElementById('cpf').value;
  pessoaDados.rg = document.getElementById('rg').value;
  pessoaDados.nome = document.getElementById('nome').value;
  pessoaDados.sobrenome = document.getElementById('sobrenome').value;
  pessoaDados.dt_nascimento = document.getElementById('data-nascimento').value;

  //Local de Visita 
  now = new Date;
  day = now.getDay();
  Month = now.getMonth();
  Year = now.getFullYear()
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();

  var visitaDados = new Object();
  visitaDados.cpf = pessoaDados.cpf; //captura o cpf inserido anteriormente 
  visitaDados.data_hora = Year + Month + day + h + m + s; //captura dada e hora do atual momento 
  visitaDados.local = $('#local-condominio :selected').text();
  visitaDados.rua = document.getElementById('residenciaRua').value;
  visitaDados.num = document.getElementById('residenciaNum').value;
  visitaDados.porteiro = " "; //carrega o id do porteiro conectado 
  visitaDados.tipo_entrada = $('#tipo-entrada :selected').text();


  //Veiculo visita 
  var visitaVeiculo = new Object();
  visitaVeiculo.id_visita = 0; //id capturado
  visitaVeiculo.placaVeiculo = document.getElementById('placa-veiculo').value;
  visitaVeiculo.tipoVeiculo = $('#tipo-veiculo :selected').text();

  //PASSO 2: INSERTS NO BANCO
  //Capturar ID da Visita (o id é auto increment)
}

function cadPrestadorServico() {
  //PASSO 1: CAPTURAR DADOS
  //Dados da pessoa
  var pessoaDados = new Object();
  pessoaDados.cpf = document.getElementById('cpf').value;
  pessoaDados.rg = document.getElementById('rg').value;
  pessoaDados.nome = document.getElementById('nome').value;
  pessoaDados.sobrenome = document.getElementById('sobrenome').value;
  pessoaDados.dt_nascimento = document.getElementById('data-nascimento').value;

  //Dados da empresa
  var prestadorEmpresa = new Object();
  prestadorEmpresa.cnpj = document.getElementById('empresaCNPJFunc').value;
  prestadorEmpresa.nome = document.getElementById('empresaNomeFunc').value;

  //Prestacao de Servico 
  now = new Date;
  day = now.getDay();
  Month = now.getMonth();
  Year = now.getFullYear()
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();

  var prestacaoDados = new Object();
  prestacaoDados.cpf = pessoaDados.cpf; //captura o cpf inserido anteriormente 
  prestacaoDados.data_hora = Year + Month + day + h + m + s; //captura dada e hora do atual momento 
  prestacaoDados.local = $('#local-condominio :selected').text();
  prestacaoDados.rua = document.getElementById('residenciaRua').value;
  prestacaoDados.num = document.getElementById('residenciaNum').value;
  prestacaoDados.porteiro = " "; //carrega o id do porteiro conectado
  prestacaoDados.tipo_entrada = $('#tipo-entrada :selected').text();  

  //Veiculo visita 
  var prestadorVeiculo = new Object();
  prestadorVeiculo.id_visita = 0; //id capturado
  prestadorVeiculo.placaVeiculo = document.getElementById('placa-veiculo').value;
  prestadorVeiculo.tipoVeiculo = $('#tipo-veiculo :selected').text(); 


  //PASSO 2: INSERTS 
  //Capturar ID da prestacao (o id é auto increment)


}

function cadCorrespondencia() {
  //PASSO 1: CAPTURAR DADOS
  //Dados da correspondencia 

  var correspondencia = new Object();
  correspondencia.tipo = $('#tipo-entrega :selected').text();
  correspondencia.dt_recebimento = document.getElementById('data-recebimento').value;
  correspondencia.morador = $('#sel-residencia-morador :selected').text(); //capturar o nome do morador de acorco com o nome selecionado;  --Inserir nomes dos moradores cadastrados no BD no select
  correspondencia.residencia = document.getElementById('residenciaNum').value;
  correspondencia.porteiro = 0; //capturar o id do porteiro
  correspondencia.status = "Recebido";
}

//SISTEMA DE MORADORES 
function cadVeiculos() {
  var veiculoMorador = new Object();
  veiculoMorador.morador = $('#sel-veiculo-morador :selected').text();
  veiculoMorador.id_morador = 0; //eu vou puxar do banco , ignorar 
  veiculoMorador.tipoVeiculo = $('#tipo-veiculo :selected').text();
  veiculoMorador.modeloVeiculo = document.getElementById('modelo-veiculo').value;
  veiculoMorador.placa = document.getElementById('placa-veiculo').value;
}

function cadPrestadorFixo() {
  var prestadorFixo = new Object();
  pessoaDados.cpf = document.getElementById('cpf').value;
  pessoaDados.rg = document.getElementById('rg').value;
  pessoaDados.nome = document.getElementById('nome').value;
  pessoaDados.sobrenome = document.getElementById('sobrenome').value;
  pessoaDados.dt_nascimento = document.getElementById('data-nascimento').value;
  prestadorFixo.tipoServico = document.getElementById('tipo-servico-prestador').value;
  prestadorFixo.permanencia_dia_semana = document.getElementById('dia-semana').value;
  prestadorFixo.permanencia_hora_entrada = document.getElementById('hora-entrada').value;
  prestadorFixo.permanencia_hora_saida = document.getElementById('hora-saida').value;

  //PASSO 2: INSERTS 
}

