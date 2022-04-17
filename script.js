
// VARIÁVEIS GLOBAIS

const display = document.querySelector(".container");
display.scrollIntoView(); 

userName = "";
let messages = [];

// CHAMAR FUNÇÕES 

enterRoom ();
setInterval(stayConnected, 5000); // faz com que o scroll fique infinito
userName = "";


// PARTE 01 - ENTRAR NA SALA - POST

function enterRoom () {
  userName = prompt("Qual o seu nome?");

    const enteredRoom = {
      name: userName
    }; 
  
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', enteredRoom);
  
    promise.then(getData);
    promise.catch(informError01);
  }


// PARTE 02 - CARREGAR MENSAGENS QUE JÁ ESTÃO NO SERVIDOR - GET

  function getData () {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(chargeData);
    promise.catch(informError02);
  }

  function chargeData (response) {
    messages = response.data;
    displayMessages();
  }


 // PARTE 03 - MANTER CONEXÃO - POST

  function stayConnected () {

    const enteredRoom = {
      name: `${userName}`,
    }; 
  
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', enteredRoom);
    console.log("executando stayConnected");   
    promise.then(getData);
    promise.catch(informError02);
  }
  


// PARTE 04 - EXIBIR MENSAGENS QUE JÁ ESTÃO NO SERVIDOR 

function displayMessages () {
  for(i = 0; i < messages.length; i++) {
if (messages[i].to === "Todos" && messages[i].type === "message") {

  display.innerHTML += `
  <div class="message"> <h4>${messages[i].time}</h4> <h3> <strong>${messages[i].from}</strong> para <strong>${messages[i].to}:</strong> ${messages[i].text}</h3> </div>
 `;


} if (messages[i].to === userName && messages[i].type === "message") {

  display.innerHTML += `
  <div class="message private"> <h4>${messages[i].time}</h4> <h3> <strong>${messages[i].from}</strong> para <strong>${messages[i].to}:</strong> ${messages[i].text}</h3> </div>
 `;

} else if (messages[i].type === "status") {
  display.innerHTML += `
  <div class="message enteredchat"> <h4>${messages[i].time}</h4> <h3> <strong>${messages[i].from}</strong> ${messages[i].text} </h3> </div>
 `;
} 

  }

}


// PARTE 05 - REQUISIÇÃO PARA ENVIAR MENSAGENS - POST

function sendMessage () {

    const messageSent = {
      from: `${userName}`,
      to: "Todos",
      text: `${document.querySelector('input').value}`,
      type: "message", 
    }
  
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageSent);
  
    promise.then(getData); // volta pegar as mensagens do servidor - PARTE 02
    document.querySelector('input').value = "" // apaga msg no input
    promise.catch(window.location.reload());
  }



// TRATAMENTO DE ERROS - sempre dá 400, independetemente de nome igual ou não. Então separei em duas formas de tratar

function informError01 (error) {
  if (error.response.status === 400) {
    alert("Este nome já está sendo usado no chat. Insira outro.");
    enterRoom();
  } else {
    alert("Problemas com o servidor. Tente novamente mais tarde.")
  }
}

function informError02 (error) {
  if (error.response.status === 400) {
    alert("Problemas com o servidor. Tente novamente mais tarde.");
  } else {
    alert("Problemas com o servidor. Tente novamente mais tarde.");
  }
}
