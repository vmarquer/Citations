export enum Language {
    FR = 'fr',
    EN = 'en',
}

export interface Text {
    'fr': string,
    'en': string
}

export const texts: Record<string, Text> = {
    'actor' : { 'en': 'Actor', 'fr' : 'Acteur / Actrice' },
    'all' : { 'en': 'Movies & Series', 'fr' : 'Films & Séries' },
    'answer_result' : { 'en': 'The answer was : ', 'fr' : 'La réponse était :' },
    'app_title' : { 'en': 'Citations game', 'fr' : 'Jeu des citations' },
    'bad_answer' : { 'en': 'Bad answer !', 'fr' : 'Mauvaise réponse !' },
    'caracter' : { 'en': 'Character', 'fr' : 'Personnage' },
    'difficulty' : { 'en': 'Difficulty', 'fr' : 'Difficulté' },
    'error' : { 'en': 'Error', 'fr' : 'Erreur' },
    'error_message' : { 'en': 'The maximum number of possible quotes is ', 'fr' : 'Le nombre maximum de citations possibles est ' },
    'good_answer' : { 'en': 'Good answer !', 'fr' : 'Bonne réponse !' },
    'history' : { 'en': 'History', 'fr' : 'Historique' },
    'ok' : { 'en': 'Ok', 'fr' : 'Ok' },
    'movie' : { 'en': 'Movie', 'fr' : 'Film' },
    'movies' : { 'en': 'Movies', 'fr' : 'Films' },
    'next_quote' : { 'en': 'Next quote', 'fr' : 'Citation suivante' },
    'no_history' : { 'en': 'No history yet !', 'fr' : 'Pas encore d\'historique !' },
    'quote' : { 'en': 'Quote', 'fr' : 'Citation' },
    'result' : { 'en': 'Result', 'fr' : 'Résultat' },
    'see_results' : { 'en': 'See results', 'fr' : 'Voir les résultats' },
    'series' : { 'en': 'Series', 'fr' : 'Séries' },
    'start' : { 'en': 'Start', 'fr' : 'Commencer' },
    'user_guess' : { 'en': 'Your guess', 'fr' : 'Votre réponse' },   
}