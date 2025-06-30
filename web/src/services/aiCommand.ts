export async function runCommand(command: string) {
    console.log(command)

    const result = await (await fetch('http://localhost:3000/ai', {
        method: "POST",
        body: JSON.stringify({
            command: "Write text hello in english"
        })
    })).json()


    return result
}