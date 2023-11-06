const FINYL_API = 'http://34.110.146.181/api/v1'

type noAuthFetchType<T> = (api: string, method: 'GET' | 'POST', body?: any) => Promise<T>

const noAuthFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const result = await fetch(`${FINYL_API}/${api}`, {
        method: method, body: JSON.stringify(body)
    }).then(res => res.json()).then(data => data)

    return result
}

const adminNoAuthFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const result = await fetch(`${FINYL_API}/admin/${api}`, {
        method: method,
        headers : {               //데이터 타입 지정
            "Content-Type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => data)

    return result
}

export {
    noAuthFetch,
    adminNoAuthFetch
}