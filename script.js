
//LINK DA PÁGINA COM INFORMAÇÕES DO API DO PROJETO: https://bootcampra.notion.site/API-Chat-UOL-1df39c2a8d75450f9b82920163d306b0

//VARIÁVEIS GLOBAIS

const display = document.querySelector(".container");
display.scrollIntoView();

userName = "";
let messages = [];

//CHAMAR FUNÇÕES + PROMPT

enterRoom ();
setInterval(stayConnected, 5000);
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


  function getData () {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(chargeData);
    promise.catch(informError02);
  }

  function chargeData (response) {
    messages = response.data;
    displayMessages();
  }

  function stayConnected () {

    const enteredRoom = {
      name: `${userName}`,
    }; 
  
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', enteredRoom);
    console.log("executando stayConnected");   
    promise.then(getData);
    promise.catch(informError02);
  }
  



// PARTE 02 - CARREGAR MENSAGENS QUE JÁ ESTÃO NO SERVIDOR A CADA 3 SEGUNDOS - assim que usuário entra na página


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



// PARTE 03 - REQUISIÇÃO ENVIAR DADOS AO SERVIDOR - enviar mensagens

function sendMessage () {

    const messageSent = {
      from: `${userName}`,
      to: "Todos",
      text: `${document.querySelector('input').value}`,
      type: "message", 
    }
  
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageSent);
  
    promise.then(getData);
    document.querySelector('input').value = ""
    promise.catch(window.location.reload());
  }


// TRATAMENTO DE ERROS

function informError01 (error) {
  if (error.response.status === 400) {
    alert("Este nome já está sendo usado no chat. Insira outro.");
    enterRoom();
  } else {
    alert("Problemas com o servidor. Tente novamente mais tarde.")
  }
}

function informError02 (error) {
    alert("Problemas com o servidor. Tente novamente mais tarde.")
}
