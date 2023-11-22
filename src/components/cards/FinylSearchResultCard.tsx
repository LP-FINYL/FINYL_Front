"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {useContext, useState} from "react";
import {IconButton, Skeleton, SkeletonText} from "@chakra-ui/react";
import {IoArrowBack, IoClose, IoSearch} from "react-icons/io5";
import ResultItem from "@/components/ResultItem";
import {noAuthFetch} from "@/api/api";
import {Icon} from "@chakra-ui/icons";
import {SearchContext} from "@/context/SearchProvider";

interface props {
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
    setStoreList?: (storeList: Array<storeInfoType>) => void
    setCenter?: (center: {lat: number, lng: number}) => void
}

const initStyle: string = 'absolute z-20 left-0 bottom-0 h-screen w-[296px] bg-white border-r border-black/50-200'

const FinylSearchResultCard: NextPage<props> = ({selectedId, setSelectedId, setCenter}) => {
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [inputKeyword, setInputKeyword] = useState<string>("")
    const {
        keyword,
        setSearchData,
        searchList,
        setIsSearchNow,
        isSearchOpen,
        setIsSearchOpen
    } = useContext(SearchContext)

    const searchStore = async () => {
        setSearchData && setSearchData('keyword', inputKeyword)

        setIsSearch(true)
    }

    return <div className={`absolute z-10 left-20 top-0 h-screen w-[296px] bg-black/50${!isSearchOpen ? " hidden" : ""}`}>
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
                    <div className={'mx-[21px] border-t border-gray-200 pb-[18px]'} />
                    <div className={'px-[21px]'}>
                        <SearchBox
                            keyword={inputKeyword}
                            setKeyword={setInputKeyword}
                            placeholder={'레코드샵 이름 검색'}
                            onSearchEvent={() => searchStore()}
                            isSearch={isSearch}
                            searchClearEvent={() => {
                                setIsSearch(false)
                                setInputKeyword('')
                                setSearchData && setSearchData('keyword', undefined)
                            }}
                        />
                    </div>
                    {
                        isSearch && <>
                            <div className={'flex flex-col gap-[3px] pt-9 px-[21px] pb-3'}>
                                <p className={'font-inter text-gray-900 text-xl font-bold'}>
                                    {`'${keyword}' 에 대한 검색 결과`}
                                </p>
                                <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
                                    {searchList.length ? `${searchList.length}개 결과` : '검색 결과가 없습니다.'}
                                </p>
                            </div>
                            <div className={'flex flex-col h-[70vh] gap-[18px] overflow-y-auto items-center'}>
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