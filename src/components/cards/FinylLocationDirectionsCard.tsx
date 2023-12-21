"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import SummaryResultCard from "@/components/cards/SummaryResultCard";
import {Breadcrumb, BreadcrumbItem, Select} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {IoArrowBack, IoSearch} from "react-icons/io5";
import {changeCityName, locations, locationType} from "@/static/locations/locations";
import {SearchContext} from "@/context/SearchProvider";
import {LocationBreadcrumb} from "@/components/Breadcrumb/LocationBreadcrumb";
import {TagView} from "@/components/tag/TagView";
import {STORE_TAG_LIST} from "@/static/lib";

interface props {
    currentLocation: string
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
    storeList: Array<storeInfoType>
    setCenter?: (center: { lat: number, lng: number }) => void
    setZoomLevel?: (level: number) => void
}

const initStyle: string = 'absolute z-10 left-20 top-0 h-[100vh] w-[296px] bg-white'

const FinylLocationDirectionsCard: NextPage<props> = ({currentLocation, selectedId, setSelectedId, setCenter, setZoomLevel}) => {
    const router = useRouter()
    const [location, setLocation] = useState<string>("서울")
    const [subLocation, setSubLocation] = useState<string>("마포구")
    const [tagList, setTagList] = useState<Array<string | undefined>>(new Array(STORE_TAG_LIST.length).fill(undefined))
    const {
        setSearchData,
        searchList,
        tags,
        isSearchOpen,
        coords,
        setCoords,
        setIsSearchOpen
    } = useContext(SearchContext)


    useEffect(() => {
        if(currentLocation){
            const tmp = currentLocation.split(" ")
            setLocation(changeCityName(tmp[0]))
            if(subLocation !== '전체'){
                setSubLocation(tmp[1])
            }
        }
    }, [currentLocation]);

    useEffect(() => {
        setCoords && setCoords({
            ...coords,
            tags: tagList.filter(v => v).join(',')
        })
    }, [tagList]);

    return <div className={`${initStyle} pt-12 overflow-y-auto`}>
        <div className={'w-full px-[21px] '}>
            <div className={'flex justify-between items-center mb-3'}>
                <div>
                    <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>
                        현재 지역의 레코드샵
                    </p>
                    <LocationBreadcrumb
                        country={location}
                        city={subLocation}
                    />
                </div>
                <div className={'w-6 h-6 cursor-pointer'} onClick={() => {
                    setIsSearchOpen && setIsSearchOpen(true)
                    setSelectedId(undefined)
                }}>
                    <Icon as={IoSearch} boxSize={6} />
                </div>
            </div>
            <div className={'mb-[18px] pb-[18px] border-b border-gray-200'}>
                <TagView gap={3} item={tagList} setItem={setTagList} initItems={STORE_TAG_LIST} />
            </div>
        </div>
        <div className={'flex flex-col gap-[18px] items-center mb-12'}>
            {
                searchList.map(store => {
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