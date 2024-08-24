export interface Quote {
    quote: string;
    movie: string;
    character: string;
    actor: string;
    difficulty: string;
    image: string;
}

export const allQuotes: Quote[] = [
    {quote: 'N\'êtes-vous pas divertis ?', movie: 'Gladiator', character: 'Maximus', actor: 'Russell Crowe', difficulty: '2', image: 'gladiator.jpeg'},
    {quote: 'La mort nous sourit à tous, tout ce qu\'on peut faire c\'est lui sourire à notre tour.', movie: 'Gladiator', character: 'Maximus', actor: 'Russell Crowe', difficulty: '1', image: 'gladiator.jpeg'},
]