import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import styled from "styled-components"

const StyleMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`

const StyledDiv = styled.div`
height: 100vh;
display: grid;
grid-template-columns: 26rem 1fr;
grid-template-rows: auto 1fr;
`

function AppLayout() {
    return (
        <StyledDiv>
            <Header />
            <Sidebar />
            <StyleMain>
                <Outlet />
            </StyleMain>
        </StyledDiv>
    )
}

export default AppLayout
