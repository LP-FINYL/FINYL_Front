const FINYL_API = ''

type noAuthFetchType<T> = (api: string, method: 'GET' | 'POST') => Promise<T>

const noAuthFetch: noAuthFetchType<any> = async (api, method, body?: any) => {
    const result = await fetch(`${FINYL_API}/${api}`, {
        method: method, body
    })

    return result
}

export {
    noAuthFetch
}