import {getCookie} from "cookies-next";

const checkToken = () => {
    const token = getCookie('accessToken')

    return token
}

export {
    checkToken
}