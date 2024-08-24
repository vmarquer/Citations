import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Context } from '../../utils/context';
import { Quote } from "../../utils/quote";
import Papa, { ParseResult } from "papaparse";

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
    Papa.parse(`${process.env.PUBLIC_URL}/quotes.csv`, {
      header: false,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<Quote>) => {
        setQuotes(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }

  function drawQuote(): void {
    if (quotes.length > 0 && quote) {
      const remainingQuotes = quotes.filter((q) => q !== quote);
      setQuotes(remainingQuotes);
    }
  }

  useEffect(() => {
    initializeQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0 && !quote) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [quotes]);


  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}
