
/*
 * Realiza a requisições da aplicação
 */
export class DateUtils {

    // Formata uma data no Padrão DD/MM/AAAA
    static formatDate(date: string): string {
        const newDate = new Date(date)

        const day = String(newDate.getDate()).padStart(2, '0')
        const month = String(newDate.getMonth()).padStart(2, '0')
        const year = newDate.getFullYear()

        const formatedDate = `${day}/${month}/${year}`
        return formatedDate
    }
}
