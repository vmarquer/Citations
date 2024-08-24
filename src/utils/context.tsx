import { Quote } from "./quote";

export interface Context {
    quote: Quote,
    quotes: Quote[],
    updateQuote: (quote: Quote) => void;
    updateQuotes: (quotes: Quote[]) => void;
    initializeQuotes: () => void;
    drawQuote: () => void;
}