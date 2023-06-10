import { Client } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';
import { Configuration, OpenAIApi } from "openai";

class ChatBot {
  private client: Client;

  constructor(client: Client) {
    this.client = client;

    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log("Chatbot client was successfully instanced.");
    });
  }

  public async start(): Promise<boolean> {
    try {
      await this.client.initialize();
      return true;
    } catch (error) {
      // TODO: error handling
      console.log(error);
      return false;
    }
  }

  public setupMsgListener() {
    const chatAlways = ["554792774509@c.us", "554796627390@c.us" /*"554799234578@c.us"*/]

    this.client.on('message', async (msg) => {
      console.log(msg);
      if (msg.body.startsWith("amor") || chatAlways.indexOf(msg.from) !== -1) {

        const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: msg.body,
          max_tokens: 256,
        });

        const answer = completion.data.choices[0].text!;
        console.log(answer);
        msg.reply(answer);
      }
    })
  }
}

export { ChatBot };
