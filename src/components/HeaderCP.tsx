import React from 'react'
import styled from 'styled-components'

interface IHeaderCPProps {
    content: JSX.Element
}

/*
 * Componente genérico para Cabeçalho da página
 */
function HeaderCP(props: IHeaderCPProps): JSX.Element {

    return (
        <HeaderSCP>
            <HeaderContent>
                {props.content}
            </HeaderContent>
        </HeaderSCP>
    )
}

export default HeaderCP

const HeaderSCP = styled.header`
    width: 100%;
    height: 100%;

    font-weight: 600;
    
    max-height: 250px;
    background: #3D5B83;
    background: linear-gradient(to bottom right, #252525, #3D5B83);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`

const HeaderContent = styled.div`
    width: 60%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

`
