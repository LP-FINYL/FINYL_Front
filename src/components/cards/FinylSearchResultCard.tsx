"use client"
import {NextPage} from "next";
import SearchBox from "@/components/searchBox/SearchBox";
import {useContext, useEffect, useState} from "react";
import {Skeleton, SkeletonText, Tag, TagCloseButton} from "@chakra-ui/react";
import {IoArrowBack, IoChevronUp} from "react-icons/io5";
import ResultItem from "@/components/ResultItem";
import {Icon} from "@chakra-ui/icons";
import {SearchContext} from "@/context/SearchProvider";
import {LocationBreadcrumb} from "@/components/Breadcrumb/LocationBreadcrumb";
import {locations} from "@/static/locations/locations";

interface props {
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
    setStoreList?: (storeList: Array<storeInfoType>) => void
    setCenter?: (center: {lat: number, lng: number}) => void
    setZoomLevel?: (level: number) => void
}

const initStyle: string = 'absolute z-20 left-0 bottom-0 h-screen w-[306px] bg-white border-r border-black/50-200'

const FinylSearchResultCard: NextPage<props> = ({selectedId, setSelectedId, setCenter, setZoomLevel}) => {
    const [isSearch, setIsSearch] = useState<boolean>(true)
    const [country, setCountry] = useState('서울')
    const [city, setCity] = useState('마포구')
    const [searchLocationIndex, setSearchLocationIndex] = useState<number | undefined>(undefined)
    const [inputKeyword, setInputKeyword] = useState<string>("")
    const {
        keyword,
        setSearchData,
        searchList,
        isSearchOpen,
        setIsSearchOpen
    } = useContext(SearchContext)

    const searchStore = async () => {
        setSearchData && setSearchData('keyword', inputKeyword)
    }

    const changeCenter = (county: string, city: string) => {
        setCenter && setCenter(locations[county][city])
        setZoomLevel && setZoomLevel(county === '전체' ? 12 : city === '전체' ? 9 : 6)
    }

    return <div className={`absolute z-10 left-20 top-0 h-screen w-[306px] overflow-y-auto bg-white${!isSearchOpen ? " hidden" : ""}`}>
        <div className={`${initStyle} pt-12`}>
            <div>
                <div className={'w-full h-[140px]'}>
                    <div className={'flex justify-between items-center mb-[18px] px-[21px]'}>
                        <div>
                            <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>
                                레코드샵 검색
                            </p>
                            <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                                FINd your vinYL
                            </p>
                        </div>
                        <div className={'w-6 h-6 cursor-pointer'} onClick={() => {
                            setIsSearch(false)
                            setInputKeyword('')
                            setSearchData && setSearchData('keyword', undefined)
                            setIsSearchOpen && setIsSearchOpen(false)
                            setSelectedId(undefined)
                        }}>
                            <Icon as={IoArrowBack} boxSize={6} />
                        </div>
                    </div>
                    <div className={'flex mt-9 mb-[18px] px-[21px] justify-between items-center'}>
                        <div>
                            <p className={'font-inter text-gray-900 text-base font-bold leading-normal'}>지역 선택</p>
                            <LocationBreadcrumb
                                isSearch
                                country={country}
                                city={city}
                                setFocusIndex={index => setSearchLocationIndex(index)}
                            />
                        </div>
                        {
                            searchLocationIndex || searchLocationIndex === 0 ? <Icon
                                as={IoChevronUp}
                                className={'cursor-pointer'}
                                onClick={() => {
                                    setSearchLocationIndex(undefined)
                                }}
                            /> : <div></div>
                        }
                    </div>
                    <div className={'px-[21px]'}>
                        {
                            searchLocationIndex || searchLocationIndex === 0 ? <div className={'my-[18px]'}>
                                <Tag size={'sm'}>
                                    <p className={'font-inter text-gray-900 text-xs font-bold leading-none'}>
                                        {
                                            searchLocationIndex === 0 ? country : undefined
                                        }
                                        {
                                            searchLocationIndex === 1 ? city : undefined
                                        }
                                    </p>
                                    <TagCloseButton onClick={() => {
                                        let addressKeyword = ''
                                        if(searchLocationIndex === 0) {
                                            setCountry("전체")
                                            changeCenter('전체', '전체')
                                        }
                                        if(searchLocationIndex === 1) {
                                            setCity("전체")
                                            changeCenter(country, '전체')
                                            addressKeyword = country
                                        }

                                        setSearchData && setSearchData('address', addressKeyword)
                                    }} />
                                </Tag>
                                <div className={'mt-[18px] flex gap-2 flex-wrap'}>
                                    {
                                        Object.keys(searchLocationIndex === 0 ? locations : locations[country]).map(location => {
                                            return <Tag
                                                key={location}
                                                size={'sm'}
                                                className={'cursor-pointer'}
                                                onClick={() => {
                                                    let tmpCountry = country
                                                    let tmpCity = city
                                                    if(searchLocationIndex === 0){
                                                        tmpCountry = location
                                                        tmpCity = "전체"
                                                    }

                                                    if(searchLocationIndex === 1){
                                                        tmpCity = location
                                                    }

                                                    setCountry(tmpCountry)
                                                    setCity(tmpCity)
                                                    setSearchData && setSearchData('address', `${tmpCountry !== "전체" ? `${tmpCountry}` : ""}${tmpCity !== "전체" ? ` ${tmpCity}` : ""}`)
                                                    changeCenter(tmpCountry, tmpCity)
                                                }}
                                            >
                                                <p className={'font-inter text-gray-900 text-xs font-medium leading-none'}>{location}</p>
                                            </Tag>
                                        })
                                    }
                                </div>
                            </div> : <></>
                        }
                    </div>
                    <div className={'mx-[21px] border-t border-gray-200 pb-[18px]'} />
                    <div className={'px-[21px]'}>
                        <SearchBox
                            keyword={inputKeyword}
                            setKeyword={setInputKeyword}
                            placeholder={'레코드샵 이름 검색'}
                            onSearchEvent={() => searchStore()}
                            isSearch={isSearch}
                            searchClearEvent={() => {
                                setInputKeyword('')
                                setSearchData && setSearchData('keyword', undefined)
                            }}
                        />
                    </div>
                    {
                        isSearch && <>
                            <div className={'flex flex-col gap-[3px] pt-9 px-[21px] pb-3'}>
                                <p className={'font-inter text-gray-900 text-xl font-bold'}>
                                    {`'${keyword ?? ''}' 에 대한 검색 결과`}
                                </p>
                                <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
                                    {searchList.length ? `${searchList.length}개 결과` : '검색 결과가 없습니다.'}
                                </p>
                            </div>
                            <div className={'flex flex-col gap-[18px] items-center'}>
                            {
                                searchList.length ? <div className={'pb-3'}>
                                    <div className={'border-gray-200 border-t'} />
                                    {
                                        searchList.map(store => {
                                            return <ResultItem
                                                key={store.id}
                                                store={store}
                                                onClick={() => {
                                                    setSelectedId(store.id)
                                                    if(store.latitude && store.longitude) {
                                                        setCenter && setCenter({
                                                            lat: store.latitude,
                                                            lng: store.longitude
                                                        })
                                                    }

                                                }}
                                            />
                                        })
                                    }
                                </div> : <></>
                            }
                            </div>
                        </>
                    }
                    {
                        !isSearch && <>
                            <div className={'flex flex-col gap-[3px] pt-9 px-[21px]'}>
                                <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
                                    검색을 원하시는 레코드샵 이름을 입력해 주세요.
                                </p>
                                <div className={'border-y border-gray-200 w-full py-3 mt-3'}>
                                    <div className={'flex justify-between items-center h-[78px]'}>
                                        <Skeleton boxSize={78}/>
                                        <SkeletonText className={'w-[140px] h-fit items-center'} boxSize={'sm'}/>
                                    </div>
                                </div>
                            </div>

                        </>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default FinylSearchResultCard