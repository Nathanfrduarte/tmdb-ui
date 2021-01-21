import ISerieList from "./ISerieList"

/*
 * Interface com propriedades de uma Serie
 */
export default interface ISerie extends ISerieList {
    number_of_seasons: number
    number_of_episodes: number
}