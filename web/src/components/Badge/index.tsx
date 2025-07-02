type BadgeProps = {
    text: string
    variant: string
}

export function Badge({ text, variant }: BadgeProps) {
    const variantsMap: Record<string, string> = {
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    }

    const extraAttributes = variantsMap[variant] ?? ''
    const classAttibutes = `text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${extraAttributes}`


    return < span className={classAttibutes} > {text}</span >

}