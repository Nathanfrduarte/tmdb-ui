import React from 'react'
import styled from 'styled-components'

interface ITextCPProps {
    text: string
    size?: string
    color?: string
}

/*
 * Componente genérico para Texto
 */
function TextCP(props: ITextCPProps): JSX.Element {

    return (
        <TextSCP
            size={props.size}
            color={props.color}
        >
            {props.text}
        </TextSCP>
    )
}

export default TextCP

const TextSCP = styled.p<{ size?: string; color?: string }>`
    font-size: ${props => !!props.size ? props.size : '24px'};
    color: ${props => !!props.color ? props.color : '#000000'};
`