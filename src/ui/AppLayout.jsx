import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import styled from "styled-components"

const StyleMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
  scrollbar-color: var(--color-brand-500) var(--color-brand-50);
  scrollbar-width: thin;
`

const StyledDiv = styled.div`
display: grid;
grid-template-columns: 26rem 1fr;
grid-template-rows: auto 1fr;
height: 100vh;
`

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
`

function AppLayout() {
    return (
        <StyledDiv>
            <Header />
            <Sidebar />
            <StyleMain>
                <Container>
                <Outlet />
                </Container>
            </StyleMain>
        </StyledDiv>
    )
}

export default AppLayout
