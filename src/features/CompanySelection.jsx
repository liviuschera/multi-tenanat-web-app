import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`;

const Text = styled.span`
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--color-grey-600);
`;

const CompanySelection = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const baseURL = import.meta.env.VITE_BASE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${baseURL}/companies`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                console.log("🚀 ~ CompanySelection ~ response:", response);
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();
    }, []);

    console.log("🚀 ~ CompanySelection ~ companies:", companies);
    console.log("🚀 ~ CompanySelection ~ selectedCompany:", selectedCompany);
    console.log("🚀 ~ CompanySelection ~ baseURL:", baseURL);

    return (
        <Container>
            <select
                onChange={(e) => {
                    setSelectedCompany(e.target.value);
                    navigate(`/report/customers/${e.target.value}`);
                }}
            >
                <option value="">Select a company</option>
                {companies?.map((company) => (
                    <option key={company?.id} value={company?.id}>
                        {company?.name}
                    </option>
                ))}
            </select>

            {selectedCompany && (
                <Text>Selected Company ID: {selectedCompany}</Text>
            )}

            {selectedCompany && (
                <Button
                    onClick={() => navigate(`/check-in/${selectedCompany}`)}
                >
                    Check in new car visit
                </Button>
            )}
        </Container>
    );
};

export default CompanySelection;
