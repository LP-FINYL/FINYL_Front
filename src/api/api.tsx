const FINYL_API = 'http://finyl-backend/api/v1'

type noAuthFetchType<T> = (api: string, method: 'GET' | 'POST') => Promise<T>

const noAuthFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const result = await fetch(`${FINYL_API}/${api}`, {
        method: method, body
    }).then(res => res.json()).then(data => data)

    return result
}

export {
    noAuthFetch
}