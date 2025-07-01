export function formatMoney(amount: number, language = 'pr-BR') {
    return new Intl.NumberFormat(language, {
        currency: 'BRL',
        minimumFractionDigits: 2,
        style: 'currency'
    }).format(amount)
}

export function formatDate(date: string, language = 'pr-BR', timeStyle = false) {
    if (!date) return ''

    const conf: Intl.DateTimeFormatOptions = {
        dateStyle: 'short',
    }
    if (timeStyle) {
        Object.assign(conf, { timeStyle: 'medium' })
    }

    return new Intl.DateTimeFormat(language, conf).format(new Date(date))
}