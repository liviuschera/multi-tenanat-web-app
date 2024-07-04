import { Navigate } from "react-router-dom";
import isUserLoggedIn from "../utils/isUserLoggedIn";

function Dashboard() {
    return (
        <div>
            {isUserLoggedIn() ? <h1>Dashboard</h1> : <Navigate to="/login" />}
        </div>
    );
}

export default Dashboard;
