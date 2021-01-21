import IMovieList from "./IMovieList"

/*
 * Interface com propriedades de um Filme
 */
export default interface IMovie extends IMovieList {
    original_title: string
}