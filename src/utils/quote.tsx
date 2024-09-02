export interface Quote {
    id: string;
    quote: Versions;
    movie: Versions;
    character: string;
    actor: string;
    difficulty: string;
    image: string;
}

export enum Version {
    VF = 'vf',
    VO = 'vo',
}

export interface Versions {
    'vf': string,
    'vo': string,
}