import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "../ui/Heading";
import { Table, TableBody, TableHeader, TableRow } from "../ui/Table";
import { formatCurrency } from "../utils/helpers";
import Button from "../ui/Button";
import { saveAs } from "file-saver";
import isUserLoggedIn from "../utils/isUserLoggedIn";
import { Navigate } from "react-router-dom";

const Report = () => {
    const baseURL = import.meta.env.VITE_BASE_API_URL;
    const [reportData, setReportData] = useState([]);
    const [csvContent, setCsvContent] = useState("");
    const { companyId } = useParams();

    useEffect(() => {
        const fetchReport = async (companyId) => {
            let response;
            try {
                response = await axios.get(`${baseURL}/report/customers`, {
                    params: { company_id: companyId },
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                });
            } catch (error) {
                console.error("Error fetching report:", error);
            }
            setCsvContent(response.data.csvContent);
            setReportData(response.data.customerData);
        };
        console.log("🚀 ~ Report ~ reportData:", reportData);

        fetchReport(companyId);
    }, [companyId]);

    function downloadCsv() {
        try {
            const blob = new Blob([csvContent], { type: "text/csv" });
            saveAs(blob, "customer_value_report.csv");
        } catch (error) {
            console.error("Error downloading CSV:", error);
        }
    }

    return { isUserLoggedIn } ? (
        <>
            <Heading as="h2">Report for company with ID: {companyId}</Heading>
            <Table role="table">
                <TableHeader
                    role="row"
                    as="header"
                    $columns="1fr 1fr 1fr 1fr 1fr"
                >
                    <div>Name</div>
                    <div>Contact</div>
                    <div>Number of Cars</div>
                    <div>Total Paid Cost</div>
                    <div>Last Visit Date</div>
                </TableHeader>

                <TableBody>
                    {reportData.map((customer, index) => (
                        <TableRow
                            role="row"
                            $columns="1fr 1fr 1fr 1fr 1fr"
                            key={index}
                        >
                            <span>{customer.name}</span>
                            <span>{customer.contact}</span>
                            <span>{customer.numberOfCars}</span>
                            <span>
                                {formatCurrency(customer.totalPaidCost)}
                            </span>
                            <span>
                                {new Date(
                                    customer.lastVisitDate
                                ).toDateString()}
                            </span>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button onClick={downloadCsv}>Download CSV</Button>
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default Report;
