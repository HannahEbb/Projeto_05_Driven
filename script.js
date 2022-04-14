
//LINK DA PÁGINA COM INFORMAÇÕES DO API DO PROJETO: https://bootcampra.notion.site/API-Chat-UOL-1df39c2a8d75450f9b82920163d306b0



// PARTE 01 - REQUISIÇÃO ENVIAR DADOS AO SERVIDOR - entrar na sala

let users = [];

getData ()

function getData () {
  const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
  promise.then(chargeData);
  console.log("executando")
}

function enterRoom () {

  const userName = document.querySelector(".name").value;
  const enteredRoom = {
    name: `${userName}`
  }; 

  const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', enteredRoom);

  promise.then(getData);

  //promise01.catch(tratarError);
//O servidor pode responder com status 400 se já houver um usuário online com esse nome. Se for o caso, a aplicação deve pedir um novo nome até que o servidor responda com status 200.
}

function chargeData (response) {
  // Se a promise for bem sucedida, chama "carregarDados", que faz um get para o servidor para pegar o nome dos participantes do chat. Se tiver response positivo, chama a função displayName, para jogar a div na tela (com o scroll)
  users = response.data;
  displayName();

}


function displayName () {
  //<div class="message enteredchat"> <h4>"hora"</h4> <h3>"mensagem aqui"</h3> </div>

}


// END - PARTE 01 - REQUISIÇÃO ENVIAR DADOS AO SERVIDOR - entrar na sala






//PARTE 02 - REQUISIÇÃO ENVIAR DADOS AO SERVIDOR - manter conectado
//const dados = {...}; //name?
//const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', dados);

//requisicao.then(tratarSucesso);
//requisicao.catch(tratarError);
//Enviando um objeto no formato enviando o nome do usuário que foi pedido ao entrar na página. Esta requisição deve ser feita a cada 5s.




//REQUISIÇÃO DE INFORMAÇÃO DO SERVIDOR - buscar mensagens no servidor
//const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
//promise.then(processarResposta);

//const promessa = axios.get('http://...');

//promessa.then(tratarSucesso); 
//promessa.catch(tratarErro);

//function tratarSucesso(resposta) { ... }

//function tratarErro(erro) {
//  console.log("Status code: " + erro.response.status); // Ex: 404
//	console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
//}



//REQUISIÇÃO ENVIAR DADOS AO SERVIDOR - enviar mensagens
//const dados = {...};
//const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', dados);

//requisicao.then(tratarSucesso);
//requisicao.catch(tratarError);
// Assim como o get, o post também retorna uma resposta (nem que seja pra você verificar se deu tudo certo)





// ESTRUTURAS EM HTML A SEREM ADICIONADAS COMO EVENTOS DE ENTRADA OU MENSAGEM:

//<div class="message"> <h4>"hora"</h4> <h3>"mensagem aqui"</h3> </div>
//<div class="message private"> <h4>"hora"</h4> <h3>"mensagem aqui"</h3> </div>
//<div class="message enteredchat"> <h4>"hora"</h4> <h3>"mensagem aqui"</h3> </div>