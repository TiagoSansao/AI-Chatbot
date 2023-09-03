import { logger } from '@/loaders/logger';
import { OpenAIApi } from 'openai';

class AI {
  private client: OpenAIApi;

  constructor(openai: OpenAIApi) {
    this.client = openai;
  }

  public async query(message: string): Promise<string> {
    const completion = await this.client.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
      max_tokens: 2000,
    });

    const answer = completion.data.choices[0].message!.content;

    logger.info(`Complete received from LLM: ${answer}`);

    return answer;
  }
}

export { AI };
