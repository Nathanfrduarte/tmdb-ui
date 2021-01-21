import React from 'react'
import styled from 'styled-components'

interface IPButtonCPProps {
    text: string
    onClick: () => void
    width?: string
    height?: string
}

/*
 * Componente genérico para Botão
 */
function ButtonCP(props: IPButtonCPProps): JSX.Element {

    return (
        <ButtonSCP
            onClick={props.onClick}
            width={props.width}
            height={props.height}
        >
            {props.text}
        </ButtonSCP>

    )
}

export default ButtonCP

const ButtonSCP = styled.button<{ width?: string; height?: string }>`
    width: ${props => !!props.width ? props.width : '12vw'};
    height: ${props => !!props.height ? props.height : '36px'};
    margin: 1%;
    
    font-size: medium;
    font-weight: bold;

    color: #FFF;
    background-color: #00b4db;
    
    border: none;
    border-radius: 4px;
    
    cursor: pointer;

    transition: 0.2s;

    :hover {
        color: #FFF;
        background-color: #00d0ff;
    }

    :active {
        color: #FFF;
        background-color: #3D5B83;
    }
`
