import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Context } from '../../utils/context';
import { Quote, Version, Versions } from "../../utils/quote";
import Papa, { ParseResult } from "papaparse";
import stringSimilarity from 'string-similarity';
import { Language, texts } from "../../utils/language"

export const AppContext = createContext<Context>(null!)

const defaultQuote: Quote = {
  id: '',
  quote: { vo: '', vf: '' },
  movie: { vo: '', vf: '' },
  character: '',
  actor: '',
  difficulty: '',
  image: '',
};

export const AppContextProvider = (props: PropsWithChildren<{}>) => {
  const [language, setLanguage] = useState<Language>(Language.FR)
  const [version, setVersion] = useState<Version>(Version.VF)
  const [index, setIndex] = useState<number>(0)
  const [quote, setQuote] = useState<Quote>(defaultQuote)
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [playedQuotes, setPlayedQuotes] = useState<Quote[]>([])
  const [guessedQuotes, setGuessedQuotes] = useState<string[]>([])


  const contextValue: Context = {
    language: language,
    version: version,
    index: index,
    quote: quote,
    allQuotes: allQuotes,
    quotes: quotes,
    playedQuotes: playedQuotes,
    guessedQuotes: guessedQuotes,
    updateLanguage: updateLanguage,
    updateVersion: updateVersion,
    updateIndex: updateIndex,
    incrementIndex: incrementIndex,
    getText: getText,
    updateQuote: updateQuote,
    updateQuotes: updateQuotes,
    updatePlayedQuotes: updatePlayedQuotes,
    updateGuessedQuotes: updateGuessedQuotes,
    initializeQuotes: initializeQuotes,
    startGame: startGame,
    computeSimilarity: computeSimilarity,
  }

  function updateLanguage(language: Language): void {
    setLanguage(language);
  }

  function updateVersion(version: Version): void {
    setVersion(version);
  }

  function updateIndex(index: number): void {
    setIndex(index);
  }

  function incrementIndex(): void {
    setIndex(prevIndex => {
      return prevIndex + 1;
    });
  }

  function getText(key: keyof typeof texts): string {
    return texts[key][language];
  };

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
        setAllQuotes(results.data.map((line: string[]): Quote => ({
          id: line[0] || '',
          quote: { vo: line[1] || '', vf: line[2] || '' },
          movie: { vo: line[3] || '', vf: line[4] || '' },
          character: line[5] || '',
          actor: line[6] || '',
          difficulty: line[7] || '',
          image: line[8] || ''
        })));
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
    setGuessedQuotes([]);
    setPlayedQuotes([]);
    setQuotes([]);
    setIndex(0);
  }

  function startGame(quotesNumber: number): void {
    const randomIndices = generateRandomIndices(allQuotes.length, quotesNumber);
    const selectedQuotes = randomIndices.map(index => allQuotes[index]);
    updateQuotes(selectedQuotes);
    updateQuote(selectedQuotes[0])
  }

  function generateRandomIndices(length: number, count: number): number[] {
    const indices = Array.from({ length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count);
  }

  function computeSimilarity(userAnswer: string, quote: string): number {
    return stringSimilarity.compareTwoStrings(userAnswer.toLowerCase(), quote.toLowerCase());
  }

  useEffect(() => {
    initializeQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0 && quote) {
      setQuote(quotes[index]);
    }
  }, [index]);


  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}
