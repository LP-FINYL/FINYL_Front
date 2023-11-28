import {createContext, useEffect, useState} from "react";
import {NextPage} from "next";
import {noAuthFetch} from "@/api/api";

type SearchEnum = 'address' | 'keyword' | 'tags'
type CoordsEnum = 'SWlat' | 'SWlng' | 'NElat' | 'NElng'

interface SearchQueryType {
    address?: string
    keyword?: string
    tags?: string
}

interface CoordsType {
    SWlat?: number
    SWlng?: number
    NElat?: number
    NElng?: number
}

interface IGlobalContext extends SearchQueryType {
    isSearchNow?: boolean
    setIsSearchNow?: (isSearchNow?: boolean) => void
    isSearchOpen?: boolean
    setIsSearchOpen?: (isSearchOpen?: boolean) => void
    setSearchData?: (key: SearchEnum, value?: string) => void
    searchList: Array<storeInfoType>
    setCoords?: (coords?: CoordsType) => void
    coords?: CoordsType
}

interface IProps {
    children: React.ReactNode
}

export const SearchContext = createContext<IGlobalContext>({ searchList: [] })

const SearchProvider: NextPage<IProps> = ({children}) => {
    const [searchList, setSearchList] = useState<Array<storeInfoType>>([])
    const [search, setSearch] = useState<SearchQueryType>({})
    const [isSearchNow, setIsSearchNow] = useState<boolean | undefined>(false)
    const [isSearchOpen, setIsSearchOpen] = useState<boolean | undefined>(false)

    const [coords, setCoords] = useState<CoordsType | undefined>(undefined)

    useEffect(() => {
        console.log('search', search)
        if(isSearchOpen){
            if(search){
                getSearchResultList()
            }else{
                setSearchList([])
            }
        }else{
            if(isSearchNow){
                if(search){
                    getSearchResultList()
                }
            }else{
                if(coords){
                    getCoordsLocation(coords)
                }
            }
        }
    }, [search, coords, isSearchNow, isSearchOpen]);

    const setSearchData = (key: SearchEnum, value?: string) => {
        setSearch({
            ...search,
            [key]: value
        })
    }

    const getQueryString = () => {
        const {address, keyword, tags} = search
        let dataList = []

        if(address){
            dataList.push(`address=${address}`)
        }

        if(keyword){
            dataList.push(`keyword=${keyword}`)
        }

        if(tags){
            dataList.push(`tags=${tags}`)
        }

        return `?${dataList.join('&')}`
    }

    const getSearchResultList = async () => {
        const result = await noAuthFetch(`search${getQueryString()}`, 'GET')

        setSearchList([...result])
    }

    const getCoordsLocation = async ({SWlat, SWlng, NElat, NElng}: CoordsType) => {
        const result = await noAuthFetch(`locationDirections?SWlatitude=${SWlat}&SWlongitude=${SWlng}&NElatitude=${NElat}&NElongitude=${NElng}`, 'GET')

        setSearchList(result)
    }

    return <SearchContext.Provider
        value={{
            ...search,
            setSearchData,
            searchList,
            isSearchNow,
            setIsSearchNow,
            coords,
            setCoords,
            isSearchOpen,
            setIsSearchOpen
        }}
    >
        {children}
    </SearchContext.Provider>
}

export {
    SearchProvider
}