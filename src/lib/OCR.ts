import { MessageMedia } from 'whatsapp-web.js';
import { logger } from '@/loaders/logger';
import { MissingCredentials } from '@/errors/missingCredentials';

class OCR {
  private apiURL?: string;
  private apiKey?: string;

  constructor(apiURL?: string, apiKey?: string) {
    this.apiURL = apiURL;
    this.apiKey = apiKey;
  }

  public async execute(image: MessageMedia) {
    if (!this.apiURL || !this.apiKey) throw new MissingCredentials();

    const requestData = new FormData();
    const base64format = `data:${image.mimetype};base64,${image.data}`;

    requestData.append('base64image', base64format);

    const response = await fetch(this.apiURL, {
      method: 'POST',
      body: requestData,
      headers: { apiKey: this.apiKey },
    });

    const responseData = await response.json();
    const text = responseData.ParsedResults[0].ParsedText;

    logger.info(`Parsed text from OCR lib: ${text}`);

    return text;
  }
}

export { OCR };
