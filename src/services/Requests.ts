import IResponse from "../interfaces/IResponse"

const BASE_URL = 'https://api.themoviedb.org/3'
const key = '2f1749d83d172dc49c189e2d37890151'
const filters = '&language=pt-BR&include_adult=false'

/*
 * Realiza a requisições da aplicação
 */
export default class Requests {

    // Busca lista de dados
    static async searchData(searchType: string, searchString: string): Promise<IResponse> {

        const result: IResponse = await fetch(`${BASE_URL}/search/${searchType}?api_key=${key}&query=${searchString.trim().toLowerCase()}${filters}`)
            .then((result) => {
                return result.json()
            }).catch((error) => {
                console.warn(error)
            })

        return result
    }

    // Busca um único dado
    static async getData(searchType: string, searchId: string): Promise<any> {

        const result = await fetch(`${BASE_URL}/${searchType}/${searchId}?api_key=${key}${filters}`)
            .then((result) => {
                return result.json()
            }).catch((error) => {
                console.warn(error)
            })

        return result
    }
}
