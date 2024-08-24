import { Quote } from "./quote";

export interface Context {
    quote: Quote
    quotes: Quote[]
    playedQuotes: string[]
    guessedQuotes: string[]
    updateQuote: (quote: Quote) => void
    updateQuotes: (quotes: Quote[]) => void
    updateGuessedQuotes: (quote: string) => void
    updatePlayedQuotes: (quote: string) => void
    initializeQuotes: () => void
    drawQuote: () => void
}