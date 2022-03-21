export const decreaseText = (text: string) => {
    if (text.length > 27) {
        return text.slice(0, 27) + "..."
    }

    return text
}