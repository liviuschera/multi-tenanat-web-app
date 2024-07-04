export function isFormValid(state, setErrors) {
    const { carLicensePlate, carModel, customerName, customerContact, cost } =
        state;

    let isValid = true;
    console.log("🚀 ~ isFormValid ~ state:", state);
    const carLicensePlateLength = 6;
    if (carLicensePlate.length < carLicensePlateLength) {
        setErrors({
            carLicensePlate: `Car license plate must be at least ${carLicensePlateLength} characters long`,
        });
        isValid = false;
    }

    if (carModel.length < 3) {
        setErrors({
            carModel: "Car model must be at least 3 characters long",
        });
        isValid = false;
    }

    if (customerName.length < 3) {
        setErrors({
            customerName: "Customer name must be at least 3 characters long",
        });
        isValid = false;
    }

    if (customerContact.length < 3) {
        setErrors({
            customerContact:
                "Customer contact must be at least 3 characters long",
        });
        isValid = false;
    }

    if (cost < 0) {
        setErrors({
            cost: "Cost must be a positive number",
        });
        isValid = false;
    }

    return isValid;
}
