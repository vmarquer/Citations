import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Context } from '../../utils/context';
import { Quote } from "../../utils/quote";
import Papa, { ParseResult } from "papaparse";
import stringSimilarity from 'string-similarity';

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
  const [playedQuotes, setPlayedQuotes] = useState<Quote[]>([])
  const [guessedQuotes, setGuessedQuotes] = useState<string[]>([])


  const contextValue: Context = {
    quote: quote,
    quotes: quotes,
    playedQuotes: playedQuotes,
    guessedQuotes: guessedQuotes,
    updateQuote: updateQuote,
    updateQuotes: updateQuotes,
    updatePlayedQuotes: updatePlayedQuotes,
    updateGuessedQuotes: updateGuessedQuotes,
    initializeQuotes: initializeQuotes,
    drawQuote: drawQuote,
    computeSimilarity: computeSimilarity,
  }

  function updateQuote(quote: Quote): void {
    setQuote(quote)
  }

  function updateQuotes(quotes: Quote[]): void {
    setQuotes(quotes)
  }

  function updatePlayedQuotes(quote: Quote): void {
    setPlayedQuotes(prevState => [...prevState, quote]);
  }

  function updateGuessedQuotes(quote: string): void {
    setGuessedQuotes(prevState => [...prevState, quote]);
  }

  function initializeQuotes(): void {
    Papa.parse(`${process.env.PUBLIC_URL}/quotes.csv`, {
      header: false,
      download: true,
      skipEmptyLines: true,
      delimiter: ";",
      complete: (results: ParseResult<string[]>) => {
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
    setGuessedQuotes([]);
    setPlayedQuotes([]);
  }

  function drawQuote(): void {
    if (quotes.length > 0 && quote) {
      const remainingQuotes = quotes.filter((q) => q.quote !== quote.quote);
      setQuotes(remainingQuotes);
    }
  }

  function computeSimilarity(userAnswer: string, quote: string): number {
    return stringSimilarity.compareTwoStrings(userAnswer, quote);
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
