import { Client, LocalAuth } from "whatsapp-web.js";
import { ChatBot } from "./api/chatbot";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// remove dotenv from here

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "bot-1", dataPath: "./vol/sessions/" }),
});

const chatBot = new ChatBot(client);
chatBot.setupMsgListener();
chatBot.start();
console.log('fonzadinha');
