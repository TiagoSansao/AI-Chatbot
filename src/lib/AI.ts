import { OpenAIApi } from 'openai';

class AI {
  private client: OpenAIApi;

  constructor(openai: OpenAIApi) {
    this.client = openai;
  }

  public async query(message: string): Promise<string> {
    const completion = await this.client.createCompletion({
      model: 'gpt-4',
      prompt: message,
      max_tokens: 2000,
    });

    const answer = completion.data.choices[0].text!;

    return answer;
  }
}

export { AI };
