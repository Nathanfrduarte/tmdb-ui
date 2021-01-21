import React from 'react'
import styled from 'styled-components'

interface IContentCPProps {
    content: JSX.Element
}

/*
 * Componente genérico para Conteúdo da página
 */
function ContentCP(props: IContentCPProps): JSX.Element {

    return (
        <ContentSCP>
            {props.content}
        </ContentSCP>
    )
}

export default ContentCP

const ContentSCP = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #default-image {
        margin-top: 2%;
    }
`