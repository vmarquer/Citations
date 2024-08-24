import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Context } from '../../utils/context';
import { allQuotes, Quote } from "../../utils/quote";

export const AppContext = createContext<Context>(null!)

export const AppContextProvider = (props: PropsWithChildren<{}>) => {
  const [quote, setQuote] = useState<Quote | undefined>(undefined)
  const [quotes, setQuotes] = useState<Quote[]>([])

  const contextValue: Context = {
    quote: quote,
    quotes: quotes,
    updateQuote: updateQuote,
    updateQuotes: updateQuotes,
    initializeQuotes: initializeQuotes,
    drawQuote: drawQuote,
  }

  function updateQuote(quote: Quote): void {
    setQuote(quote)
  }

  function updateQuotes(quotes: Quote[]): void {
    setQuotes(quotes)
  }

  function initializeQuotes(): void {
    setQuotes(allQuotes)
  }

  function drawQuote(): void {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      const updatedQuotes = quotes.filter((_, index) => index !== randomIndex);
      setQuotes(updatedQuotes);
      setQuote(randomQuote);
    }
  }

  useEffect(() => {
    initializeQuotes();
  }, []);

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}
