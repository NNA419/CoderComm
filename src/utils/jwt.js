import jwtDecode from "jwt-decode";

export const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }

    const decode = jwtDecode(accessToken); // {}
    const currentTime = Date.now() / 1000;

    return decode.exp > currentTime;
};