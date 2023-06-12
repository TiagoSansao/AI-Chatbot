import dotenv from "dotenv";
import qrcode from 'qrcode-terminal';
import { Client } from "whatsapp-web.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config({ path: ".env" });

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const mockTextMsg = {
  _data: {
    id: {
      fromMe: false,
      remote: '551321911083@c.us',
      id: '93E83B2F44C5C44D13A8811B13E5A7A3',
      _serialized: 'false_551321911083@c.us_93E83B2F44C5C44D13A8811B13E5A7A3'
    },
    body: 'amor escreva uma mensagem para alegrar o dia',
    type: 'chat',
    t: 1686532444,
    notifyName: 'mariaaa',
    from: '551321911083@c.us',
    to: '554788303706@c.us',
    self: 'in',
    ack: 1,
    isNewMsg: true,
    star: false,
    kicNotified: false,
    recvFresh: true,
    isFromTemplate: false,
    pollInvalidated: false,
    isSentCagPollCreation: false,
    latestEditMsgKey: null,
    latestEditSenderTimestampMs: null,
    broadcast: false,
    mentionedJidList: [],
    groupMentions: [],
    isVcardOverMmsDocument: false,
    isForwarded: false,
    hasReaction: false,
    productHeaderImageRejected: false,
    lastPlaybackProgress: 0,
    isDynamicReplyButtonsMsg: false,
    isMdHistoryMsg: false,
    stickerSentTs: 0,
    isAvatar: false,
    requiresDirectConnection: false,
    links: []
  },
  mediaKey: undefined,
  id: {
    fromMe: false,
    remote: '551321911083@c.us',
    id: '93E83B2F44C5C44D13A8811B13E5A7A3',
    _serialized: 'false_551321911083@c.us_93E83B2F44C5C44D13A8811B13E5A7A3'
  },
  ack: 1,
  hasMedia: false,
  body: 'amor escreva uma mensagem para alegrar o dia',
  type: 'chat',
  timestamp: 1686532444,
  from: '551321911083@c.us',
  to: '554788303706@c.us',
  author: undefined,
  deviceType: 'android',
  isForwarded: false,
  forwardingScore: 0,
  isStatus: false,
  isStarred: false,
  broadcast: false,
  fromMe: false,
  hasQuotedMsg: false,
  hasReaction: false,
  duration: undefined,
  location: undefined,
  vCards: [],
  inviteV4: undefined,
  mentionedIds: [],
  orderId: undefined,
  token: undefined,
  isGif: false,
  isEphemeral: undefined,
  links: []
}

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

      // TEST
      this.client.emit('message', mockTextMsg);

      return true;
    } catch (error) {
      // TODO: error handling
      console.log(error);
      return false;
    }
  }

  public setupMsgListener() {
    const chatAlways = ["554792774509@c.us", "554796627390@c.us" /*"551321911083@c.us"*/]

    this.client.on('message', async (msg) => {
      console.log(msg);

      switch (msg.type) {
        case ('chat'):
          //
          break;
        case ('image'):
          // OCR
          break;
        default:
          return;
      }
      const COMMAND_PREFIX = "/";

      if (msg.body.startsWith("amor") || chatAlways.indexOf(msg.from) !== -1) {

        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: msg.body,
          max_tokens: 256,
        });

        const answer = completion.data.choices[0].text!;
        console.log(answer);
        this.client.sendMessage(msg.from, answer);
      }
    })
  }
}

export { ChatBot };
