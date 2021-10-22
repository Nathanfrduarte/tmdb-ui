import React, { useEffect, useState } from 'react'
import IMovieList from '../interfaces/IMovieList'
import IResponse from '../interfaces/IResponse'
import IPersonList from '../interfaces/IPersonList'
import ISerieList from '../interfaces/ISerieList'
import Requests from '../services/Requests'
import styled from 'styled-components'
import TextCP from '../components/TextCP'
import PosterCP from '../components/PosterCP'
import ButtonCP from '../components/ButtonCP'

import DefaultImage from '../assets/default-image.svg'
import TranslateDepartmentUtils from '../utils/TranslateDepartmentUtils'
import { RouteComponentProps } from 'react-router-dom'
import HeaderCP from '../components/HeaderCP'
import ContentCP from '../components/Content'

/*
 * Tela principal (Realiza busca e listagem de Filmes, Series ou Artistas)
 */
function MainScreen(props: RouteComponentProps) {
    // Estados para as variáveis de busca
    const [searchString, setSearchString] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('movie')
    // Flag que define que há resultados para a busca realizada
    const [hasSearchResult, setHasSearchResult] = useState<boolean>(false)
    // Estados para os resultados das buscas
    const [responseData, setResponseData] = useState<IResponse>()
    const [movies, setMovies] = useState<IMovieList[]>()
    const [series, setSeries] = useState<ISerieList[]>()
    const [persons, setPersons] = useState<IPersonList[]>()

    useEffect(formatData, [responseData, searchType])

    /*
     * Lida com a ação de busca
     */
    async function handleSubmit(): Promise<void> {

        // Validação dos campos
        if (!searchString) return
        if (!searchType) return

        // Chamada da API
        const response: IResponse = await Requests.searchData(searchType, searchString)

        // Define os resultados para da busca realizada
        if (response.total_results > 0) {
            setHasSearchResult(true)
            setResponseData(response)
        }
    }

    /*
     * Formata os dados buscados e atribui aos estados
     */
    function formatData() {
        // Validação dos dados
        if (!responseData) return
        if (!searchType) return

        // Elimina os resultados que não possuem poster
        let formatedResponseData = []
        if (searchType === 'movie' || searchType === 'tv') {
            formatedResponseData = responseData.results.filter((d) => d.poster_path != null)
        } else {
            formatedResponseData = responseData.results.filter((d) => d.profile_path != null)
        }

        // Define o resultado de acordo com o tipo de busca (Filmes, Series ou Artistas)
        switch (searchType) {
            case 'movie':
                setMovies(formatedResponseData)
                setSeries(undefined)
                setPersons(undefined)
                break;
            case 'tv':
                setMovies(undefined)
                setSeries(formatedResponseData)
                setPersons(undefined)
                break;
            case 'person':
                setMovies(undefined)
                setSeries(undefined)
                setPersons(formatedResponseData)
                break;
            default:
                break;
        }
        setResponseData(undefined)
    }

    return (<>

        {/* Cabeçalho */}
        <HeaderCP content={<>
            <TextCP
                text={'Realize sua busca por filmes, series ou artistas'}
                color={'#FFFFFF'}
            />

            {/* Campos de texto e seleção do tipo para a busca */}
            <SearchWrapper>
                <input type='text' id="name" onChange={(event) => setSearchString(event.target.value)} autoFocus />
                <select name="type" id="types" onChange={(event) => setSearchType(event.target.value)} >
                    <option value="movie">Filmes</option>
                    <option value="tv">Séries</option>
                    <option value="person">Artistas</option>
                </select>
            </SearchWrapper>

            <ButtonCP
                text={'Buscar'}
                onClick={handleSubmit}
            />
        </>}
        />

        {/* Conteúdo */}
        <ContentCP content={

            // Se houver uma busca, exibe seus resultados de acordo com o tipo
            !!hasSearchResult ? <>
                <TextCP
                    text={'Resultados da sua busca'}
                    color={'#000000'}
                />

                <ContentListWrapper>

                    {/* Resultado da busca por Filmes */}
                    {
                        !!movies &&
                        movies.map((movie) => {

                            return (
                                <PosterCP key={'poster_' + movie.id}
                                    title={movie.title}
                                    description={movie.overview}
                                    cutDescription
                                    imagePath={movie.poster_path}
                                    onClick={() => {
                                        props.history.push({
                                            pathname: `/busca/info/${movie.id}`,
                                            state: {
                                                searchType: 'movie',
                                                searchId: String(movie.id)
                                            }
                                        })
                                    }}
                                />
                            )
                        })
                    }

                    {/* Resultado da busca por Series */}
                    {
                        !!series &&
                        series.map((serie) => {

                            return (
                                <PosterCP key={'poster_' + serie.id}
                                    title={serie.name}
                                    description={serie.overview}
                                    cutDescription
                                    imagePath={serie.poster_path}
                                    onClick={() => {
                                        props.history.push({
                                            pathname: `/busca/info/${serie.id}`,
                                            state: {
                                                searchType: 'tv',
                                                searchId: String(serie.id)
                                            }
                                        })
                                    }}
                                />
                            )
                        })
                    }

                    {/* Resultado da busca por Artistas */}
                    {
                        !!persons &&
                        persons.map((person) => {
                            return (
                                <PosterCP key={'poster_' + person.id}
                                    title={person.name}
                                    description={TranslateDepartmentUtils(person.known_for_department)}
                                    imagePath={person.profile_path}
                                    onClick={() => {
                                        props.history.push({
                                            pathname: `/busca/info/${person.id}`,
                                            state: {
                                                searchType: 'person',
                                                searchId: String(person.id),
                                                personMovies: person.known_for
                                            }
                                        })
                                    }}
                                />
                            )
                        })
                    }

                </ContentListWrapper>
            </>
                :
                // Caso não haja uma busca, exibe um feedback padrão
                <>
                    <TextCP
                        text={'Nenuma busca... :('}
                        color={'#000000'}
                    />
                    <img id='default-image' src={DefaultImage} width={'14%'} alt='Aguardando Buscas' />
                </>
        } />
    </>)
}

export default MainScreen

const SearchWrapper = styled.div`
    width: 80%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    
    input {
        width: 100%;
        height: 36px;
        padding: 0 16px;
        
        font-size: medium;
        background: #F5F8FA;

        border: none;
        border-radius: 4px;
    }

    select {
        margin: 0 1%;
        padding: 0 2%;
        width: 20%;
        height: 36px;

        font-size: medium;
        background: #F5F8FA;
    }
`

const ContentListWrapper = styled.div`
    width: 45%;

    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
`
