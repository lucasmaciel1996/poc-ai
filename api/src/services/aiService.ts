import OpenAI from 'openai'

export class AIService {
    protected openAi: OpenAI;

    constructor() {
        this.openAi = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
        })
    }

    async generateCommand(command: string, data: unknown) {
        // https://medium.com/data-science-in-your-pocket/mcp-servers-using-chatgpt-cd8455e6cbe1
        const nowdDate = new Date().toISOString()

        const template = `
            Você é um agente de IA especializado em analisar dados de faturas enviados via JSON.

            Seu objetivo é responder perguntas relacionadas às datas da fatura (como data de criação, vencimento, pagamento ou estorno).

            Responda somente com base no conteúdo enviado no JSON. Se alguma informação estiver ausente ou for nula, indique isso de forma clara.

            Analise especialmente os seguintes campos:
            - dueDate: data de vencimento
            - createdAt: data de criação
            - paidAt: data de pagamento (pode ser null)
            - paidAt: data de pagamento (pode ser null)
            - canceledAt: data de cancelamento (pode ser null)
            - customerId: Cliente que pertece a fatura.

            Regras importantes:
            - Se dueDate < data atual e paidAt for null, a fatura está vencida.
            - Se paidAt estiver presente, a fatura foi paga.
            - Se refundedAt estiver presente, a fatura foi estornada.
            - Se canceledAt estiver presente, a fatura foi cancelada.
            - Para perguntas sobre “faturas pagas hoje”, compare a data de 'paidAt' com a data atual (ignorando a hora). Se a data for igual, considere que a fatura foi paga hoje.

            Sempre que possível, apresente as datas no formato "dd/mm/aaaa".

            Evite criar informações que não estão no JSON. Seja claro e direto.
            Evite informar que análise foi feito com JSON não informe JSON na respota.

            **Para efeito de análise, considere que a data atual é "${nowdDate}.**
        `
        const result = await this.openAi.chat.completions.create({
            model: 'gpt-4.1',
            messages: [
                {
                    role: "system",
                    content: template
                },
                {
                    role: "user",
                    content: `Aqui está o JSON com as faturas: \n\n${JSON.stringify(data, null, 2)}.`
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