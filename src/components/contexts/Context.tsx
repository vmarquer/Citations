import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Context } from '../../utils/context';
import { Quote } from "../../utils/quote";

export const AppContext = createContext<Context>(null!)

export const AppContextProvider = (props: PropsWithChildren<{}>) => {
  const [quote, setQuote] = useState<Quote | undefined>(undefined)
  const [quotes, setQuotes] = useState<Quote[]>([])

  const contextValue: Context = {
    quote: quote,
    quotes: quotes,
    updateQuote: updateQuote,
    updateQuotes: updateQuotes,
  }

  function updateQuote(quote: Quote): void {
    setQuote(quote)
  }

  function updateQuotes(quotes: Quote[]): void {
    setQuotes(quotes)
  }

  useEffect(() => {
  }, []);

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}
