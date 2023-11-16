"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {useState} from "react";
import SummaryResultCard from "@/components/cards/SummaryResultCard";
import {Button} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {IoArrowBack, IoSearch} from "react-icons/io5";

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

    return <div className={`${initStyle} pt-12 `}>
        <div className={'w-full px-[21px]'}>
            {/*<div className={'mb-[18px] pb-[18px] border-b border-gray-200'}>*/}
            {/*    <div className={'w-full flex justify-between'}>*/}
            {/*        <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>*/}
            {/*            현재 지역의 레코드샵*/}
            {/*        </p>*/}
            {/*        <div className={'w-6 h-6 cursor-pointer'} onClick={() => {*/}
            {/*            setIsSearchCard && setIsSearchCard(true)*/}
            {/*            setSelectedId(undefined)*/}
            {/*        }}>*/}
            {/*            <Icon as={IoSearch} boxSize={6} />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>*/}
            {/*        {currentLocation}*/}
            {/*    </p>*/}
            {/*</div>*/}
            <div className={'flex justify-between items-center mb-[18px] pb-[18px] border-b border-gray-200'}>
                <div>
                    <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>
                        현재 지역의 레코드샵
                    </p>
                    <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                        {currentLocation}
                    </p>
                </div>
                <div className={'w-6 h-6 cursor-pointer'} onClick={() => {
                    setIsSearchCard && setIsSearchCard(true)
                    setSelectedId(undefined)
                }}>
                    <Icon as={IoSearch} boxSize={6} />
                </div>
            </div>
        </div>
        <div className={'flex flex-col h-[88%] gap-[18px] overflow-y-auto items-center'}>
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