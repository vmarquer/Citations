export interface Quote {
    id: string;
    quote: Version;
    movie: Version;
    character: string;
    actor: string;
    difficulty: string;
    image: string;
}

export interface Version {
    vo: string;
    vf: string;
}