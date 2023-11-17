import {getCookie, setCookie} from 'cookies-next';

export const FINYL_API = 'http://34.110.146.181/api/v1'

type noAuthFetchType<T> = (api: string, method: 'GET' | 'POST', body?: any) => Promise<T>

const noAuthFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const result = await fetch(`${FINYL_API}/${api}`, {
        method: method, body: JSON.stringify(body)
    }).then(res => res.json()).then(data => data)

    return result
}

const adminFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const token = getCookie('accessToken')

    const result = await fetch(`${FINYL_API}/admin/${api}`, {
        method: method,
        headers : {               //데이터 타입 지정
            "Content-Type":"application/json; charset=utf-8",
            Authorization: token ?? ""
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => data)

    return result
}

const authFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const result = await fetch(`${FINYL_API}/auth/${api}`, {
        method: method,
        headers : {               //데이터 타입 지정
            "Content-Type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => data)

    return result
}

const formDataFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const result = await fetch(`${FINYL_API}/${api}`, {
        method: method, body: body
    }).then(res => res.json()).then(data => data)

    return result
}

export {
    noAuthFetch,
    adminFetch,
    authFetch,
    formDataFetch
}