import { Quote } from "./quote";

export interface Context {
    language: string;
    quote: Quote
    quotes: Quote[]
    playedQuotes: Quote[]
    guessedQuotes: string[]
    updateLanguage: (language: string) => void
    updateQuote: (quote: Quote) => void
    updateQuotes: (quotes: Quote[]) => void
    updateGuessedQuotes: (quote: string) => void
    updatePlayedQuotes: (quote: Quote) => void
    initializeQuotes: () => void
    drawQuote: () => void
    computeSimilarity: (userAnswer: string, quote: string) => number
}