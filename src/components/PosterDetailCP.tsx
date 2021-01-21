import React from 'react'
import styled from 'styled-components'

interface IPosterDetailCPProps {
    content: JSX.Element
    imagePath: string
}

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

/*
 * Componente de detalhes de um busca
 */
function PosterDetailCP(props: IPosterDetailCPProps): JSX.Element {

    return (
        <PosterDetailSCP>

            <img src={BASE_IMAGE_URL + props.imagePath} alt="Poster" />

            <InfoWrapper>

                {props.content}

            </InfoWrapper>

        </PosterDetailSCP>
    )
}

export default PosterDetailCP

const PosterDetailSCP = styled.div`
    margin-top: 5%;
    padding: 1%;

    width: 40%;
    height: auto;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    img {
        width: 50%;
        height: auto;
    }
`

const InfoWrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 0 0 0 3%;

    display: flex;
    flex-direction: column;

    p {
        margin-bottom: 5%;
    }

`
