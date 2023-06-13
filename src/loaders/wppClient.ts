import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "bot-1", dataPath: "./vol/sessions/" }),
});

export { client }