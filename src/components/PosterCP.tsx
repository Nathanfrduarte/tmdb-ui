import React from 'react'
import styled from 'styled-components'
import ButtonCP from './ButtonCP'
import TextCP from './TextCP'

interface IPosterCPProps {
    title: string
    description: string
    imagePath: string
    onClick: () => void
    cutDescription?: boolean
}

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

/*
 * Componente para Poster
 */
function PosterCP(props: IPosterCPProps): JSX.Element {

    function formatDecription(description: string): string {
        const formatedDesctiption = description.substr(0, 100)

        if (!!props.cutDescription) {
            return formatedDesctiption + '...'
        } else {
            return formatedDesctiption
        }
    }

    return (
        <PosterSCP>

            <TextCP
                text={props.title}
                size={'18px'}
            />

            <img src={BASE_IMAGE_URL + props.imagePath} alt="Poster" />

            <TextCP
                text={formatDecription(props.description)}
                color={'#797979'}
                size={'16px'}
            />

            <ButtonCP
                text={'Ver mais'}
                onClick={props.onClick}
            />

        </PosterSCP>
    )
}

export default PosterCP

const PosterSCP = styled.div`
    margin-top: 5%;
    padding: 1%;

    width: 40%;
    height: auto;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    transition: .2s;

    :hover {
        transform: translateY(-5px);
        box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.25);
    }

    img {
        width: 100%;
        height: auto;
    }

    p {
        margin: 2% 0;
    }

    /* button {
        width: 50%;
        height: 32px;
        margin: 3% 0 0 0;
        
        font-size: medium;
        cursor: pointer;

        color: #FFF;
        background: #3D5B83;
        border: none;
        border-radius: 4px;
        transition: .3s;

        :hover {
            background: #252525;
        }
    } */
`
