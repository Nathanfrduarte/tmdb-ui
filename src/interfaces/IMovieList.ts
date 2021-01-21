/*
 * Interface com propriedades da lista de Filmes
 */
export default interface IMovieList {
    id: number
    title: string
    overview: string
    release_date: string
    vote_average: number
    poster_path: string
    media_type: string
}