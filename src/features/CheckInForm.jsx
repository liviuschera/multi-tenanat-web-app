import { useReducer } from "react";
import Input from "../ui/Input";
import FormRow from "../ui/FormRow";
import Form from "../ui/Form";
import { useState } from "react";
import Button from "../ui/Button";
import { isFormValid } from "../pages/isFormValid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_BASE_API_URL;

const initialState = {
    carLicensePlate: "",
    carModel: "",
    customerName: "",
    customerContact: "",
    cost: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "setCompanyId":
            return { ...state, companyId: action.payload };
        case "setCarLicensePlate":
            return { ...state, carLicensePlate: action.payload };
        case "setCarModel":
            return { ...state, carModel: action.payload };
        case "setCustomerName":
            return { ...state, customerName: action.payload };
        case "setCustomerContact":
            return { ...state, customerContact: action.payload };
        case "setCost":
            return { ...state, cost: action.payload };
        case "reset":
            return initialState;
        default:
            throw new Error("Unknown action type");
    }
};

function CheckInForm() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useState({});
    const { carLicensePlate, carModel, customerName, customerContact, cost } =
        state;
    const { companyId } = useParams();
    const navigate = useNavigate();

    // useEffect(() => {}, []);
    console.log("🚀 ~ CheckInForm ~ companyId:", companyId);

    console.log("🚀 ~ CheckInForm ~ state:", state);
    async function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: "setCompanyId", payload: companyId });
        console.log("🚀 ~ CheckInForm ~ errors:", errors);
        if (!isFormValid(state, setErrors)) return;
        setErrors({});
        const result = await axios.post(
            `${baseURL}/check-in`,
            {
                companyId,
                carLicensePlate,
                carModel,
                customerName,
                customerContact,
                cost,
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        console.log("🚀 ~ handleSubmit ~ result:", result);
        if (result.status === 201) {
            window.location.href = "/";
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Car license plate" error={errors?.carLicensePlate}>
                <Input
                    type="text"
                    id="carLicensePlate"
                    required
                    value={carLicensePlate}
                    onChange={(e) =>
                        dispatch({
                            type: "setCarLicensePlate",
                            payload: e.target.value,
                        })
                    }
                />
            </FormRow>

            <FormRow label="Car model" error={errors?.carModel}>
                <Input
                    type="carModel"
                    id="carModel"
                    required
                    value={carModel}
                    onChange={(e) =>
                        dispatch({
                            type: "setCarModel",
                            payload: e.target.value,
                        })
                    }
                />
            </FormRow>

            <FormRow label="Customer name" error={errors?.customerName}>
                <Input
                    type="customerName"
                    id="customerName"
                    required
                    value={customerName}
                    onChange={(e) =>
                        dispatch({
                            type: "setCustomerName",
                            payload: e.target.value,
                        })
                    }
                />
            </FormRow>

            <FormRow label="Customer contact" error={errors?.customerContact}>
                <Input
                    type="text"
                    id="customerContact"
                    required
                    value={customerContact}
                    onChange={(e) =>
                        dispatch({
                            type: "setCustomerContact",
                            payload: e.target.value,
                        })
                    }
                />
            </FormRow>

            <FormRow label="Cost" error={errors?.cost}>
                <Input
                    type="number"
                    id="cost"
                    required
                    value={cost}
                    onChange={(e) =>
                        dispatch({
                            type: "setCost",
                            payload: e.target.value,
                        })
                    }
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}

                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => dispatch({ type: "reset" })}
                >
                    Cancel
                </Button>
                <Button>Check in car</Button>
            </FormRow>
        </Form>
    );
}

export default CheckInForm;
