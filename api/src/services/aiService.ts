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

   console.log({
    command, invoicesJson
   })
        const result = await this.openAi.chat.completions.create({
            model: 'gpt-4.1',
            messages:[
                {
                    role: "system",
                    content: `You are an assistent who answers questions based on provider's 'JSON' data format.
                    invoice:
                    dueDate: Data de venciamento formato DD-MM-YYYYTHH:MM
                    payedAt: Data da cobrança
                    status: open (aberto) cancel(Cancelado) refund(Estornado) paid(pago)
                    createdAt: Data que foi criado fatura
                    amout: Valor da fatura
                    `
                  },
                  {
                    role: "user",
                    content: `Here is the JSON wiith invoices: \n\n${JSON.stringify(invoicesJson, null, 2)}. 
                    Only analyze and present information based solely on the content provided, Don't invent, don't generate additional data and don't extrapolate JSON information.
                    When asked about other content, respond that you cannot provide information about other content.
                    It does not inform that your analysis was done in JSON send.
                    `
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