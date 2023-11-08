declare global {
    interface Window {
        kakao: any;
    }
}

interface storeInfoType {
    id?: string
    title: string
    image?: string
    address?: string
    site?: string
    instaUrl?: string
    phone?: string
    tags?: string
    info?: string
    latitude?: number
    longitude?: number
    operatorTime?: Array<OTType>
}

interface OTType {
    day: string
    time?: string
}

