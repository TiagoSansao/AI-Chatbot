import qrcode from 'qrcode-terminal';
import { Client } from "whatsapp-web.js";
import { openai } from "@/loaders/openai";
import { logger } from '@/loaders/logger';
import ChatBotService from '@/services/chatbot';

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


class ChatBotAPI {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private setupReadyListener() {
    this.client.on('ready', () => {
      logger.info("Chatbot client was successfully instanced.");
    });
  }

  private setupQrListener(): void {
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
  }

  public setupMsgListener() {
    this.client.on('message', async (msg) => {
      logger.info(`Received message: ${msg.body} from ${msg.from}`)

      const chatBotService = new ChatBotService();
      const response = await chatBotService.execute(msg);

      //if (response.error)
      this.client.sendMessage(msg.from, response!);
    })
  }

  public async start(): Promise<void> {
    try {
      this.setupReadyListener();
      this.setupQrListener();
      this.setupMsgListener();
      console.log('fon')
      await this.client.initialize();
      console.log('trab')

      // TEST
      // this.client.emit('message', mockImgMsg);

    } catch (error) {
      // TODO: error handling
      logger.error(error);
    }
  }
}

export { ChatBotAPI };
