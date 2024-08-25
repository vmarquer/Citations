import { Quote } from "./quote";

export interface Context {
    quote: Quote
    quotes: Quote[]
    playedQuotes: Quote[]
    guessedQuotes: string[]
    updateQuote: (quote: Quote) => void
    updateQuotes: (quotes: Quote[]) => void
    updateGuessedQuotes: (quote: string) => void
    updatePlayedQuotes: (quote: Quote) => void
    initializeQuotes: () => void
    drawQuote: () => void
    computeSimilarity: (userAnswer: string, quote: string) => number
}