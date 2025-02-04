import { Language } from "./language";
import { Quiz } from "./quiz";
import { Quote, Version } from "./quote";

export interface Context {
    language: string
    version: string
    currentQuote: Quote
    quotes: Quote[]
    quizType: Quiz
    updateLanguage: (language: Language) => void
    updateVersion: (version: Version) => void
    getText: (key: string) => string
    updateQuotes: (quotes: Quote[]) => void
    updateQuizType: (quizType: Quiz) => void
    launchQuiz: () => void
    computeSimilarity: (userAnswer: string, quote: string) => number
}