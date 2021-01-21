import IMovie from "./IMovie";
import IPersonList from "./IPersonList"

/*
 * Interface com propriedades de uma pessoa
 */
export default interface IPerson extends IPersonList {
    biography: string
    birthday: string
    lastMovie: IMovie
}