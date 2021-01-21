import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ButtonCP from '../components/ButtonCP'
import ContentCP from '../components/Content'
import HeaderCP from '../components/HeaderCP'
import PosterDetailCP from '../components/PosterDetailCP'
import TextCP from '../components/TextCP'
import IMovie from '../interfaces/IMovie'
import IPerson from '../interfaces/IPerson'
import ISerie from '../interfaces/ISerie'
import Requests from '../services/Requests'
import { DateUtils } from '../utils/DateUtils'
import TranslateDepartmentUtils from '../utils/TranslateDepartmentUtils'

/*
 * Tela de Detalhes de uma busca
 */
function DetailsScreen(props: RouteComponentProps) {
    // Estados passados pela rota
    const { searchType, searchId, personMovies } = props.history.location.state as any
    // Estados para os resultados das buscas
    const [movie, setMovie] = useState<IMovie>()
    const [serie, setSerie] = useState<ISerie>()
    const [person, setPerson] = useState<IPerson>()

    useEffect(renderData, [searchType, searchId, personMovies])

    /*
     * Realiza a busca detalhada
     */
    function renderData() {

        if (!searchId) return
        if (!searchType) return

        async function fetchData() {
            const responseData = await Requests.getData(searchType, searchId) as any

            if (!responseData) return

            switch (searchType) {
                case 'movie':

                    // Formata a data de lançamento
                    let release_date: string = ''
                    if (!!responseData.release_date) {
                        release_date = DateUtils.formatDate(responseData.release_date)
                        setMovie({ ...responseData, release_date })
                    } else {
                        setMovie(responseData)
                    }

                    setSerie(undefined)
                    setPerson(undefined)
                    break

                case 'tv':

                    // Formata a data de lançamento
                    let first_air_date: string = ''
                    if (!!responseData.first_air_date) {
                        first_air_date = DateUtils.formatDate(responseData.first_air_date)
                        setSerie({ ...responseData, first_air_date })
                    } else {
                        setSerie(responseData)
                    }

                    setMovie(undefined)
                    setPerson(undefined)
                    break

                case 'person':

                    // Filtra apenas os filmes do artista e armazena somente seu último
                    if (!!personMovies) {
                        const movies = personMovies.filter((movie: IMovie) => movie.media_type !== 'tv')
                        const lastMovie: IMovie = movies.sort((a: IMovie, b: IMovie) => +(b.release_date.substr(0, 4)) - +(a.release_date.substr(0, 4)))[0]

                        setPerson({ ...responseData, lastMovie })
                    } else {
                        setPerson(responseData)
                    }

                    setMovie(undefined)
                    setSerie(undefined)
                    break

                default:
                    break;
            }
        }

        fetchData()
    }

    /*
    * Calcula a idade da pessoa pela data de anivesário dela
    */
    function getYearsOld(birthdayDate: string): number {
        // Data atual
        const currentYear: number = new Date().getFullYear()
        const currentMonth: number = new Date().getMonth() + 1
        const currentDay: number = new Date().getDate()
        // Data da pessoa
        const birthYear: number = +birthdayDate.substr(0, 4)
        const birthMonth: number = +birthdayDate.substr(5, 2)
        const birthDay: number = +birthdayDate.substr(8, 2)

        let yearsOld: number = currentYear - birthYear

        // Leva a consideração o mês e o dia atual
        if (birthMonth < currentMonth) {
            yearsOld--
        } else {
            if (birthMonth === currentMonth && birthDay < currentDay) {
                yearsOld--
            }
        }

        return yearsOld
    }

    return (<>

        {/* Cabeçalho */}
        <HeaderCP
            content={<>
                {
                    !!movie &&
                    <TextCP
                        text={movie.title}
                        color={'#FFFFFF'}
                        size={'30px'}
                    />
                }

                {
                    !!serie &&
                    <TextCP
                        text={serie.name}
                        color={'#FFFFFF'}
                        size={'30px'}
                    />
                }

                {
                    !!person &&
                    <TextCP
                        text={person.name}
                        color={'#FFFFFF'}
                        size={'30px'}
                    />
                }

                <ButtonCP text={'Voltar'} onClick={props.history.goBack} />
            </>}
        />

        {/* Conteúdo */}
        <ContentCP
            content={<>
                {
                    !!movie &&
                    <PosterDetailCP
                        imagePath={movie.poster_path}
                        content={<>
                            <TextCP
                                text={`Título original: ${!!movie.original_title ? movie.original_title : ' -'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Sinópse: ${!!movie.overview ? movie.overview : ' -'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Data de Lançamento: ${!!movie.release_date ? movie.release_date : ' -'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Avaliação: ${!!movie.vote_average ? movie.vote_average : ' -'}`}
                                size={'16px'}
                            />
                        </>}
                    />
                }

                {
                    !!serie &&
                    <PosterDetailCP
                        imagePath={serie.poster_path}
                        content={<>
                            <TextCP
                                text={`Sinópse: ${!!serie.overview ? serie.overview : ' -'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Data de Lançamento: ${!!serie.first_air_date ? serie.first_air_date : ' -'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Temporadas: ${!!serie.number_of_seasons ? serie.number_of_seasons : ' -'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Avaliação: ${!!serie.vote_average ? serie.vote_average : ' -'}`}
                                size={'16px'}
                            />
                        </>}
                    />
                }

                {
                    !!person &&
                    <PosterDetailCP
                        imagePath={person.profile_path}
                        content={<>
                            <TextCP
                                text={`Biografia: ${!!person.biography ? person.biography.substr(0, 310) : ' Desconhecida'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={'Profissão: ' + TranslateDepartmentUtils(person.known_for_department)}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Idade: ${!!person.birthday ? getYearsOld(person.birthday) + ' anos' : '-'}`}
                                size={'16px'}
                            />

                            <TextCP
                                text={`Último filme: ${!!person.lastMovie ? person.lastMovie.title : ' Desconhecida'}`}
                                size={'16px'}
                            />
                        </>}
                    />
                }
            </>}
        />
    </>)
}

export default DetailsScreen
