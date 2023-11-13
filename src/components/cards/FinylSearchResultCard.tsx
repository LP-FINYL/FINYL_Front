"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {useState} from "react";
import SummaryResultCard from "@/components/cards/SummaryResultCard";

interface props {
    currentLocation: string
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
}

const initStyle: string = 'absolute z-10 left-20 top-0 h-screen w-[296px] bg-white border'

const FinylSearchResultCard: NextPage<props> = ({currentLocation, selectedId, setSelectedId}) => {
    const router = useRouter()
    const [keyword, setKeyword] = useState<string>("")

    return <div className={`${initStyle} p-3`}>
        <div className={'w-full'}>
            <SearchBox keyword={keyword} setKeyword={setKeyword} />
            <div className={'pt-9 pb-[18px]'}>
                <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>
                    현재 지역의 레코드샵
                </p>
                <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                    {currentLocation}
                </p>
            </div>
            <SummaryResultCard/>
        </div>
    </div>
}

export default FinylSearchResultCard