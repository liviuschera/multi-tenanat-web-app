function isUserLoggedIn() {
    return !!sessionStorage.getItem("token");
}

export default isUserLoggedIn;
