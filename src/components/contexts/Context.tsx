import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Context } from '../../utils/context';
import { Quote, QuoteDTO, Version, Versions } from "../../utils/quote";
import stringSimilarity from 'string-similarity';
import { Language, texts } from "../../utils/language";
import axios from "axios";
import { Quiz } from "../../utils/quiz";

export const AppContext = createContext<Context>(null!)

const defaultQuote: Quote = {
  id: '',
  quote: { vo: '', vf: '' },
  movie: { vo: '', vf: '' },
  userAnswer: '',
  caracter: '',
  actor: '',
  difficulty: '',
  image: '',
};

export const AppContextProvider = (props: PropsWithChildren<{}>) => {
  const [language, setLanguage] = useState<Language>(Language.FR)
  const [version, setVersion] = useState<Version>(Version.VF)
  const [currentQuote, setCurrentquote] = useState<Quote>(defaultQuote)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [quizType, setQuizType] = useState<Quiz>(Quiz.ALL)
  const [index, setIndex] = useState<number>(0)


  const contextValue: Context = {
    language: language,
    version: version,
    currentQuote: currentQuote,
    quotes: quotes,
    quizType: quizType,
    index: index,
    updateLanguage: updateLanguage,
    updateVersion: updateVersion,
    getText: getText,
    updateQuotes: updateQuotes,
    updateQuizType: updateQuizType,
    launchQuiz: launchQuiz,
    incrementIndex: incrementIndex,
    updateUserAnswer: updateUserAnswer,
    computeSimilarity: computeSimilarity,
  }

  function updateLanguage(language: Language): void {
    setLanguage(language);
  }

  function updateVersion(version: Version): void {
    setVersion(version);
  }

  function getText(key: keyof typeof texts): string {
    return texts[key][language];
  };

  function updateQuotes(quotes: Quote[]): void {
    setQuotes(quotes);
  }

  function updateQuizType(quizType: Quiz): void {
    setQuizType(quizType);
  }

  function launchQuiz(): void {
    let path: string;
    switch (quizType) {
      case Quiz.ALL:
        path = 'quiz';
        break;
      case Quiz.MOVIE:
        path = 'quiz?kind=movie';
        break;
      case Quiz.SERIE:
        path = 'quiz?kind=serie';
        break;
    }
    axios.get(`http://localhost:8080/api/citation/${path}`)
      .then(response => {
        setQuotes(response.data.map((quote: QuoteDTO): Quote => ({
          id: quote.id.toString(),
          quote: { vo: quote.quoteVO, vf: quote.quoteVF },
          movie: { vo: quote.movieVO, vf: quote.movieVO },
          userAnswer: '',
          caracter: quote.caracter,
          actor: quote.actor,
          difficulty: quote.difficulty.toString(),
          image: 'gladiator.jpeg'
        })));
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des citations :", error);
      });
  }

  function incrementIndex(): void {
    setIndex(index + 1);
  }

  function updateUserAnswer(newAnswer: string, id: string): void {
    setQuotes(
      quotes.map(
        quote => quote.id === id ? { ...quote, userAnswer: newAnswer } : quote
      )
    );
    setCurrentquote(quotes.find(quote => quote.id === id) || defaultQuote);
  }

  function computeSimilarity(userAnswer: string, quote: string): number {
    return stringSimilarity.compareTwoStrings(userAnswer.toLowerCase(), quote.toLowerCase());
  }

  useEffect(() => {
    if (index < quotes.length) {
      setCurrentquote(quotes[index])
    }
  }, [index]);

  useEffect(() => {
    if (index === 0) {
      setCurrentquote(quotes[0])
    }
  }, [quotes]);

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}
