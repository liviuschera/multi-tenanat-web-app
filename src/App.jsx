import GlobalStyles from "./styles/GlobalStyles";
import LoginForm from "./features/authentication/LoginForm";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import CheckInForm from "./features/CheckInForm";
import Report from "./pages/Report";
import CompanySelection from "./features/CompanySelection";
import styled from "styled-components";
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";
import Dashboard from "./pages/Dashboard";

const AppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 27rem 1fr;
    grid-template-rows: auto 1fr;
`;

const Main = styled.main`
    background-color: var(--color-grey-0);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll; // keep the main layout sticky
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function App() {
    // const token = localStorage.getItem("token");
    return (
        <>
            <GlobalStyles />
            <AppLayout>
                <Header />
                <Sidebar />
                <Main>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route
                                path="/check-in/:companyId"
                                element={<CheckInForm />}
                            />
                            <Route
                                path="/companies"
                                element={<CompanySelection />}
                            />
                            <Route
                                path="/report/customers/:companyId"
                                element={<Report />}
                            />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Container>
                </Main>
            </AppLayout>
        </>
    );
}

export default App;
