import { Client, LocalAuth } from "whatsapp-web.js";
import { ChatBot } from "./api/chatbot";

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "bot-1", dataPath: "./vol/sessions/" }),
});

const mockImgMsg = {
  _data: {
    id: {
      fromMe: false,
      remote: '554799234578@c.us',
      id: 'A1FB031584D12430BB303F2F45765DD8',
      _serialized: 'false_554799234578@c.us_A1FB031584D12430BB303F2F45765DD8'
    },
    body: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAKAMBIgACEQEDEQH/xAAuAAADAQEBAAAAAAAAAAAAAAAAAwQCAQUBAQEBAQAAAAAAAAAAAAAAAAEAAgP/2gAMAwEAAhADEAAAAL0WTmjFRUY0qpe81NpLjVADnE60y5ktBugjHnPEmVKrPJ9AVixEcCNcCcgN/8QAIRAAAgICAgIDAQAAAAAAAAAAAQIAEQMSITEEQRATYTL/2gAIAQEAAT8AI4iglj+RfYhQjmeqhEwC9j+zQRlBjLz1G/kzCtJM+d1bRFuYcjFqZajCZDSGKdcd/kRtiTFyAwsNbmZhrPvsUIuRro1ExqCTcU2tTI+xMNeopPc3peYmdVei0Zxd3xMvlHpJj8l0MGcv3PJa3sTNn24Xr4ExlCnfM8irEPwlXzCeeITc/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEgEf/aAAgBAgEBPwCNpij/xAAYEQADAQEAAAAAAAAAAAAAAAAAASAREv/aAAgBAwEBPwCOZ0THH//Z',
    type: 'image',
    t: 1686532463,
    notifyName: 'mariaaa',
    from: '554799234578@c.us',
    to: '554788303706@c.us',
    self: 'in',
    ack: 1,
    isNewMsg: true,
    star: false,
    kicNotified: false,
    recvFresh: true,
    interactiveAnnotations: [],
    deprecatedMms3Url: 'https://mmg.whatsapp.net/v/t62.7118-24/32051840_209742218650201_5903898220884542273_n.enc?ccb=11-4&oh=01_AdQ3MF9QuhXsdECLVa6uI3sK359BMgSy8ofhIp1FYp-jcQ&oe=64ADF1FC&mms3=true',
    directPath: '/v/t62.7118-24/32051840_209742218650201_5903898220884542273_n.enc?ccb=11-4&oh=01_AdQ3MF9QuhXsdECLVa6uI3sK359BMgSy8ofhIp1FYp-jcQ&oe=64ADF1FC',
    mimetype: 'image/jpeg',
    filehash: '+K9hq0HlFUfrMZET2eH9OsegcJA7amJVIddYgiYGowM=',
    encFilehash: 'Kz3/77TYJGD/fQP6d0kGqoPv/Ag6DEza3Dycl1DV6JM=',
    size: 56090,
    mediaKey: 'r8982iITsFGSHrSAUDVNbD6vWr8URJiDSgQQ+olvHuE=',
    mediaKeyTimestamp: 1686532462,
    isViewOnce: false,
    width: 720,
    height: 1280,
    staticUrl: '',
    scanLengths: [ 8408, 15192, 8984, 23506 ],
    scansSidecar: {},
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
  mediaKey: 'r8982iITsFGSHrSAUDVNbD6vWr8URJiDSgQQ+olvHuE=',
  id: {
    fromMe: false,
    remote: '554799234578@c.us',
    id: 'A1FB031584D12430BB303F2F45765DD8',
    _serialized: 'false_554799234578@c.us_A1FB031584D12430BB303F2F45765DD8'
  },
  ack: 1,
  hasMedia: true,
  body: '',
  type: 'image',
  timestamp: 1686532463,
  from: '554799234578@c.us',
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
}; 

async function main() {
  const chatBot = new ChatBot(client);
  chatBot.setupMsgListener();
  await chatBot.start();
}

main();
