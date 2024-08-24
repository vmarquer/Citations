import { Quote } from "./quote";

export interface Context {
    quote: Quote |undefined
    quotes: Quote[],
    updateQuote: (quote: Quote) => void;
    updateQuotes: (quotes: Quote[]) => void;
}