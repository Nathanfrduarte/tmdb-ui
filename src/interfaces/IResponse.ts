/*
 * Interface com propriedades de resposta de uma Requisição do tipo lista
 */
export default interface IResponse {
    page: number
    results: any[]
    total_pages: number
    total_results: number
}