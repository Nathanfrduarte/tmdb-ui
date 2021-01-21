import { DepartmentEnum } from "../enums/DepartmentEnum"
import IMovieList from "./IMovieList"

/*
 * Interface com propriedades de uma lista de Pessoas
 */
export default interface IPersonList {
    id: number
    name: string
    known_for_department: DepartmentEnum
    known_for: IMovieList[]
    profile_path: string
}