import OpenAI from 'openai'

export class AIService {
    protected openAi: OpenAI;

    constructor() {
        this.openAi = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
        })
    }

    async generateCommand(command: string,invoicesJson:unknown) {
        // https://medium.com/data-science-in-your-pocket/mcp-servers-using-chatgpt-cd8455e6cbe1

   
        const result = await this.openAi.chat.completions.create({
            model: 'gpt-4.1',
            messages:[
                {
                    role: "system",
                    content: "Você é um assistente que responde perguntas com base nos dados JSON fornecidos."
                  },
                  {
                    role: "user",
                    content: `Aqui está o JSON com faturas: \n\n${JSON.stringify(invoicesJson, null, 2)}. 
                    Analise e apresente somente informações com base exclusiva no conteúdo fornecido. Não invente, não gere dados adicionais e não extrapole as informações do JSON.`
                  },
                  {
                    role: "user",
                    content: command
                  }
            ]
        })

        return result
    }
}