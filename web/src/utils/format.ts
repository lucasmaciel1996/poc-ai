export function formatMoney(amount: number) {
    return new Intl.NumberFormat('pr-BR', {
        currency: 'BRL',
        minimumFractionDigits: 2,
        style: 'currency'
    }).format(amount)
}

export function formatDate(date: string) {
    if (!date) return ''

    return new Intl.DateTimeFormat('pr-BR', {
        dateStyle: 'short'
    }).format(new Date(date))
}