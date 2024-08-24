import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Context } from '../../utils/context';
import { Quote } from "../../utils/quote";
import Papa, { ParseResult } from "papaparse";
import { light } from "@mui/material/styles/createPalette";

export const AppContext = createContext<Context>(null!)

const defaultQuote: Quote = {
  quote: '',
  movie: '',
  character: '',
  actor: '',
  difficulty: '',
  image: '',
};

export const AppContextProvider = (props: PropsWithChildren<{}>) => {
  const [quote, setQuote] = useState<Quote>(defaultQuote)
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
      delimiter: ";",
      complete: (results: ParseResult<string[]>) => {
        console.log(results.data);
        setQuotes(results.data.map((line: string[]): Quote => ({
          quote: line[0] || '',
          movie: line[1] || '',
          character: line[2] || '',
          actor: line[3] || '',
          difficulty: line[4] || '',
          image: line[5] || ''
        })));
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }

  function drawQuote(): void {
    if (quotes.length > 0 && quote) {
      const remainingQuotes = quotes.filter((q) => q.quote !== quote.quote);
      setQuotes(remainingQuotes);
    }
  }

  useEffect(() => {
    initializeQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0 && quote) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [quotes]);


  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}
