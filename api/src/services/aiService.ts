import OpenAI from 'openai'

export class AIService {
    protected client: OpenAI;

    constructor() {
        // this.client = new OpenAI({
        //     baseURL: 'https://openrouter.ai/api/v1',
        //     apiKey: '',
        //     defaultHeaders: {
        //         'HTTP-Referer': 'http://maciel.com', // Optional. Site URL for rankings on openrouter.ai.
        //         'X-Title': '<Maciel AI', // Optional. Site title for rankings on openrouter.ai.
        //     },
        // })
    }
    async generateCommand(command: string) {
        // const result = await this.client.responses.create({
        //     model: 'gpt-4.1',
        //     input: command
        // })

        const htmlTemplate = `
           <table border="1">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Ana</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Lucas</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>João</td>
                    </tr>
                </tbody>
            </table>
        `

        return htmlTemplate
    }
}