export function formatMoney(amount: number,language='pr-BR') {
    return new Intl.NumberFormat(language, {
        currency: 'BRL',
        minimumFractionDigits: 2,
        style: 'currency'
    }).format(amount)
}

export function formatDate(date: string,language='pr-BR') {
    if (!date) return ''

    return new Intl.DateTimeFormat(language, {
        dateStyle: 'short'
    }).format(new Date(date))
}