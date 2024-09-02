export enum Language {
    FR = 'fr',
    EN = 'en',
}

export interface Text {
    'fr': string,
    'en': string
}

export const texts: Record<string, Text> = {
    'app_title' : { 'en': 'Citations game', 'fr' : 'Jeu des citations' },
    'start' : { 'en': 'Start', 'fr' : 'Commencer' },
    'difficulty' : { 'en': 'Difficulty', 'fr' : 'Difficulté' },
    'next_quote' : { 'en': 'Next quote', 'fr' : 'Citation suivante' },
    'movie' : { 'en': 'Movie', 'fr' : 'Film' },
    'character' : { 'en': 'Character', 'fr' : 'Personnage' },
    'actor' : { 'en': 'Actor', 'fr' : 'Acteur / Actrice' },
    'user_guess' : { 'en': 'Your guess', 'fr' : 'Votre réponse' },
    'quote' : { 'en': 'Quote', 'fr' : 'Citation' },
    'result' : { 'en': 'Result', 'fr' : 'Résultat' },
    'error' : { 'en': 'Error', 'fr' : 'Erreur' },
    'error_message' : { 'en': 'The maximum number of possible quotes is ', 'fr' : 'Le nombre maximum de citations possibles est ' },
    'ok' : { 'en': 'Ok', 'fr' : 'Ok' },
}