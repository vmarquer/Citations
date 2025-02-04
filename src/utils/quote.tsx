export interface Quote {
    id: string;
    quote: Versions;
    movie: Versions;
    userAnswer: string;
    caracter: string;
    actor: string;
    difficulty: string;
    image: string;
}

export interface QuoteDTO {
    id: number;
    quoteVO: string;
    quoteVF: string;
    movieVO: string;
    movieVF: string;
    caracter: string;
    actor: string;
    difficulty: number;
}

export enum Version {
    VF = 'vf',
    VO = 'vo',
}

export interface Versions {
    'vf': string,
    'vo': string,
}