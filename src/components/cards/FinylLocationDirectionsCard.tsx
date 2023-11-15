"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {useState} from "react";
import SummaryResultCard from "@/components/cards/SummaryResultCard";
import {Button} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {IoSearch} from "react-icons/io5";

interface props {
    currentLocation: string
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
    storeList: Array<storeInfoType>
    setIsSearchCard?: (isSearchCard: boolean) => void
    setCenter?: (center: {lat: number, lng: number}) => void
}

const initStyle: string = 'absolute z-10 left-20 top-0 h-[100vh] w-[296px] bg-white'

const FinylLocationDirectionsCard: NextPage<props> = ({storeList, currentLocation, selectedId, setSelectedId, setIsSearchCard, setCenter}) => {
    const router = useRouter()

    return <div className={`${initStyle} pt-12 px-3`}>
        <div className={'w-full'}>
            <div className={'pb-[18px]'}>
                <div className={'w-full flex justify-between'}>
                    <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>
                        현재 지역의 레코드샵
                    </p>
                    <div className={'w-6 h-6 cursor-pointer'} onClick={() => {
                        setIsSearchCard && setIsSearchCard(true)
                        setSelectedId(undefined)
                    }}>
                        <Icon as={IoSearch} boxSize={6} />
                    </div>
                </div>
                <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                    {currentLocation}
                </p>
            </div>
        </div>
        <div className={'flex flex-col h-[90%] gap-3 overflow-y-auto items-center'}>
            {
                storeList.map(store => {
                    return <SummaryResultCard
                        key={store.id}
                        store={store}
                        onClick={() => {
                            setSelectedId(store.id)
                            if(setCenter && store.latitude && store.longitude) {
                                setCenter({
                                    lat: store.latitude,
                                    lng: store.longitude
                                })
                            }
                        }}
                    />
                })
            }
        </div>

    </div>
}

export default FinylLocationDirectionsCard