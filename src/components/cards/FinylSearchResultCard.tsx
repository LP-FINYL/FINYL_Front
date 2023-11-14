"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {useState} from "react";
import {IconButton} from "@chakra-ui/react";
import {IoClose} from "react-icons/io5";
import ResultItem from "@/components/ResultItem";
import {noAuthFetch} from "@/api/api";

interface props {
    currentLocation: string
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
    storeList: Array<storeInfoType>
}

const initStyle: string = 'absolute z-20 left-0 bottom-0 h-[95vh] w-[296px] bg-white rounded-t-[9px] border border-black/50-200'

const FinylSearchResultCard: NextPage<props> = ({}) => {
    const [keyword, setKeyword] = useState<string>("")
    const [searchResult, setSearchResult] = useState<Array<storeInfoType>>([])

    const searchStore = async () => {
        const results = await noAuthFetch(`search?keyword=${keyword}`, 'GET')

        console.log(results)
        setSearchResult([...results])
    }

    return <div className={'absolute z-10 left-20 top-0 h-screen w-[296px] bg-black/50'}>
        <div className={`${initStyle} p-6`}>
            <div>
                <div className={'w-full h-[140px]'}>
                    <div className={'flex justify-end'}>
                        <IconButton
                            aria-label={''}
                            icon={<IoClose />}
                            variant={'ghost'}
                            size={'sm'}
                            className={'mb-3'}
                        />
                    </div>
                    <SearchBox
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder={'레코드샵 이름 검색'}
                        onSearchEvent={() => searchStore()}
                    />
                    <div className={'flex flex-col gap-[3px] pt-9'}>
                        <p className={'font-inter text-gray-900 text-xl font-bold'}>
                            {`'${keyword}' 에 대한 검색 결과`}
                        </p>
                        <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
                            {`${searchResult.length}개 결과`}
                        </p>
                    </div>
                    <div className={'py-3'}>
                        {
                            searchResult.map(store => {
                                return <ResultItem key={store.id} store={store} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FinylSearchResultCard