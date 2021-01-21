import { DepartmentEnum } from '../enums/DepartmentEnum'

/*
 * Traduz o retorno do departamento de uma pessoa
 */
export default function TranslateDepartmentUtils(departmentType: DepartmentEnum) {
    switch (departmentType) {
        case DepartmentEnum.ACTING:
            return 'Ator / Atriz'
        case DepartmentEnum.DIRECTING:
            return 'Diretor'
        case DepartmentEnum.WRITING:
            return 'Escritor'
        case DepartmentEnum.PRODUCTION:
            return 'Produtor'
        case DepartmentEnum.SOUND:
            return 'Sonoplasta'
        case DepartmentEnum.VISUAL_EFFECTS:
            return 'Efeitos Especiais'
        case DepartmentEnum.CAMERA:
            return 'Cinegrafista'
        case DepartmentEnum.CREW:
            return 'Elenco / Figurante'
        default:
            return '-'
    }
}