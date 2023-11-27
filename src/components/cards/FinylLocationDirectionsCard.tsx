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
    const {setSearchData, searchList, isSearchNow, setIsSearchNow, setIsSearchOpen} = useContext(SearchContext)

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
        if(locations && subLocation){
            setSearchData && setSearchData('address', `${location}${subLocation === '전체' ? "" : ` ${subLocation}`}`)
        }
    }, [location, subLocation]);

    const changeCenter = (city: string, county: string) => {
        setCenter && setCenter(locations[city][county])
        setZoomLevel && setZoomLevel(city === '전체' ? 12 : county === '전체' ? 9 : 6)
    }

    return <div className={`${initStyle} pt-12 `}>
        <div className={'w-full px-[21px]'}>
            <div className={'flex justify-between items-center mb-[18px] pb-[18px] border-b border-gray-200'}>
                <div>
                    <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>
                        현재 지역의 레코드샵
                    </p>
                    <LocationBreadcrumb
                        country={location}
                        city={subLocation}
                    />
                    {/*<Breadcrumb>*/}
                    {/*    <BreadcrumbItem>*/}
                    {/*        <Select*/}
                    {/*            className={'w-7 p-0'}*/}
                    {/*            size={'xs'}*/}
                    {/*            variant='unstyled'*/}
                    {/*            value={location}*/}
                    {/*            onChange={(e) => {*/}
                    {/*                setLocation(e.target.value)*/}
                    {/*                setSubLocation("전체")*/}

                    {/*                changeCenter(e.target.value, "전체")*/}
                    {/*            }}*/}
                    {/*            iconSize={'0'}*/}
                    {/*        >*/}
                    {/*            {*/}
                    {/*                Object.keys(locations).map((location, index) => {*/}
                    {/*                    return <option key={location} value={location}>{location}</option>*/}
                    {/*                })*/}
                    {/*            }*/}
                    {/*        </Select>*/}
                    {/*    </BreadcrumbItem>*/}
                    {/*    {*/}
                    {/*        locations[location] ?*/}
                    {/*            <BreadcrumbItem>*/}
                    {/*                <Select*/}
                    {/*                    size={'xs'}*/}
                    {/*                    variant='unstyled'*/}
                    {/*                    value={subLocation}*/}
                    {/*                    onChange={(e) => {*/}
                    {/*                        setSubLocation(e.target.value)*/}

                    {/*                        changeCenter(location, e.target.value)*/}
                    {/*                    }}*/}
                    {/*                    iconSize={'0'}*/}
                    {/*                >*/}
                    {/*                    {*/}
                    {/*                        Object.keys(locations[location]).map((location) => {*/}
                    {/*                            return <option key={location} value={location}>{location}</option>*/}
                    {/*                        })*/}
                    {/*                    }*/}
                    {/*                </Select>*/}
                    {/*            </BreadcrumbItem>*/}
                    {/*            : undefined*/}
                    {/*    }*/}
                    {/*</Breadcrumb>*/}
                </div>
                <div className={'w-6 h-6 cursor-pointer'} onClick={() => {
                    setIsSearchOpen && setIsSearchOpen(true)
                    setSelectedId(undefined)
                }}>
                    <Icon as={IoSearch} boxSize={6} />
                </div>
            </div>
        </div>
        <div className={'flex flex-col h-[88%] gap-[18px] overflow-y-auto items-center'}>
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