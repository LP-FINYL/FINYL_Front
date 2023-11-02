const FINYL_API = ''

type noAuthFetchType<T> = (api: string, method: 'GET' | 'POST') => Promise<T>

const noAuthFetch: noAuthFetchType<any> = async (api, method) => {
    const result = await fetch(`${FINYL_API}/${api}`, {
        method: method
    })

    return result
}