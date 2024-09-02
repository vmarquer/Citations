import { Language } from "./language";
import { Quote, Version } from "./quote";

export interface Context {
    language: string
    version: string
    index: number
    quote: Quote
    allQuotes: Quote[]
    quotes: Quote[]
    playedQuotes: Quote[]
    guessedQuotes: string[]
    updateLanguage: (language: Language) => void
    updateVersion: (version: Version) => void
    updateIndex: (index: number) => void
    incrementIndex: () => void
    getText: (key: string) => string
    updateQuote: (quote: Quote) => void
    updateQuotes: (quotes: Quote[]) => void
    updateGuessedQuotes: (quote: string) => void
    updatePlayedQuotes: (quote: Quote) => void
    initializeQuotes: () => void
    startGame: (quotesNumber: number) => void
    computeSimilarity: (userAnswer: string, quote: string) => number
}