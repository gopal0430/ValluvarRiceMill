const chatInput = document.querySelector(".chat-input textarea");
const sendchatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";

const createChatLi = (message , className) => {
   // Create a chat <li> element with passed message and className
   const chatLi = document.createElement("li");
   chatLi.classList.add("chat", className);
   let chatContent = className === "outgoing" ? `<p>${message}</p>`:`<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
   chatLi.innerHTML = chatContent;
   return chatLi;
}
const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
   //  const messageElement =incomingChatLi.querySelector("p");

    const requestOptions = {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${API_KEY}`,
       },
       body: JSON.stringify({
           model: "gpt-3.5-turbo",
           messages: [{role: "user", content: "userMessage"}]
       })
    }

   //  Send post request to API,get response 
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
       console.log(data);
    }).catch((error) => {
       console.log(error);
    })
}

const handleChat = () => {
     userMessage = chatInput.value.trim();
     if(!userMessage) return;
      
   // Append the user's message to the chatbox
     chatbox.appendChild(createChatLi(userMessage , "outgoing"));

     setTimeout(() => {
       // Display "Thinking...." message while waiting for the response 
       const incomingChatLi = createChatLi("Thinking...." , "incoming")
       chatbox.appendChild(incomingChatLi);
       generateResponse(incomingChatLi);
     },600);
}
sendchatBtn.addEventListener("click" , handleChat);
chatbotCloseBtn.addEventListener("click",() => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click",() => document.body.classList.toggle("show-chatbot"));