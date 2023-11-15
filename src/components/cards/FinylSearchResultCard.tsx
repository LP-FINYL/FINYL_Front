"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {useState} from "react";
import {IconButton, Skeleton, SkeletonText} from "@chakra-ui/react";
import {IoClose} from "react-icons/io5";
import ResultItem from "@/components/ResultItem";
import {noAuthFetch} from "@/api/api";
import {Icon} from "@chakra-ui/icons";

interface props {
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
    storeList: Array<storeInfoType>
    isSearchCard?: boolean
    setIsSearchCard?: (isSearchCard: boolean) => void
    setStoreList?: (storeList: Array<storeInfoType>) => void
    setCenter?: (center: {lat: number, lng: number}) => void
}

const initStyle: string = 'absolute z-20 left-0 bottom-0 h-[95vh] w-[296px] bg-white rounded-t-[9px] border border-black/50-200'

const FinylSearchResultCard: NextPage<props> = ({selectedId, setSelectedId, isSearchCard, storeList, setStoreList, setIsSearchCard, setCenter}) => {
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>("")
    const [searchKeyword, setSearchKeyword] = useState<string>("")

    const searchStore = async () => {
        const results = await noAuthFetch(`search?keyword=${keyword}`, 'GET')

        setIsSearch(true)
        setSearchKeyword(keyword)
        setStoreList && setStoreList([...results])
    }

    return <div className={`absolute z-10 left-20 top-0 h-screen w-[296px] bg-black/50${!isSearchCard ? " hidden" : ""}`}>
        <div className={`${initStyle} px-6 pt-4`}>
            <div>
                <div className={'w-full h-[140px]'}>
                    <div className={'flex justify-end'}>
                        <IconButton
                            aria-label={''}
                            icon={<Icon aria-label={'x'} as={IoClose} boxSize={21} />}
                            variant={'ghost'}
                            size={'sm'}
                            className={'mb-3'}
                            onClick={() => {
                                setIsSearchCard && setIsSearchCard(false)
                                setSelectedId(undefined)
                            }}
                        />
                    </div>
                    <SearchBox
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder={'레코드샵 이름 검색'}
                        onSearchEvent={() => searchStore()}
                        isSearch={isSearch}
                        searchClearEvent={() => {
                            setIsSearch(false)
                            setSearchKeyword('')
                            setKeyword('')
                            setStoreList && setStoreList([])
                        }}
                    />
                    {
                        isSearch && <>
                            <div className={'flex flex-col gap-[3px] pt-9'}>
                                <p className={'font-inter text-gray-900 text-xl font-bold'}>
                                    {`'${searchKeyword}' 에 대한 검색 결과`}
                                </p>
                                <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
                                    {storeList.length ? `${storeList.length}개 결과` : '검색 결과가 없습니다.'}
                                </p>
                            </div>
                            {
                                storeList.length ? <div className={'py-3'}>
                                    {
                                        storeList.map(store => {
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
                        </>
                    }
                    {
                        !isSearch && <>
                            <div className={'flex flex-col gap-[3px] pt-9'}>
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