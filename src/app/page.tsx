"use client"
import {useEffect, useState} from "react";
import FinylMainCard from "@/components/cards/FinylMainCard";
import MapView from "@/components/map/MapView";
import SideTab from "@/components/sideTab/SideTab";
import FinylSearchResultCard from "@/components/cards/FinylSearchResultCard";
import FinylLocationDirectionsCard from "@/components/cards/FinylLocationDirectionsCard";
import FinylStoreInfoInputCard from "@/components/cards/FinylStoreInfoInputCard";
import {ReviewPopover} from "@/components/Popover/ReviewPopover";

const Home = () => {
    const [searchList, setSearchList] = useState<Array<storeInfoType>>([])
    const [directionList, setDirectionList] = useState<Array<storeInfoType>>([])
    const [isSearchCard, setIsSearchCard] = useState<boolean>(false)

    const [selectId, setSelectId] = useState<string | undefined>(undefined)
    const [currentLocation, setCurrentLocation] = useState<string>("")
    const [mapZoomLevel, setMapZoomLevel] = useState<number>(6)
    const [center, setCenter] = useState<{lat: number, lng: number}>({
        lat: 37.557938025275, lng: 126.922059899484
    })

    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-screen overflow-hidden">
            <div className={'w-20'}>
                <SideTab />
                <FinylLocationDirectionsCard
                    currentLocation={currentLocation}
                    storeList={directionList}
                    selectedId={selectId}
                    setSelectedId={setSelectId}
                    setCenter={(center) => setCenter(center)}
                    setZoomLevel={(level) => setMapZoomLevel(level)}
                />
                <FinylSearchResultCard
                    setSelectedId={(selectedId?: string | undefined): void  => {
                        setSelectId(selectedId)
                    }}
                    setStoreList={(list) => setSearchList([...list])}
                    setCenter={(center) => setCenter(center)}
                    setZoomLevel={(level) => setMapZoomLevel(level)}
                />
                <div className={'absolute z-10 top-0 left-[376px] h-screen bg-white'}>
                    <div className={'flex'}>
                        <FinylMainCard selectedId={selectId} setSelectedId={setSelectId} />
                        <FinylStoreInfoInputCard />
                    </div>
                </div>
            </div>
            <div className={'relative h-full ml-[376px] '}>
                <MapView
                    storeList={isSearchCard ? searchList : directionList}
                    selectedId={selectId}
                    zoomLevel={mapZoomLevel}
                    setSelectedId={(id) => setSelectId(id)}
                    setCurrentLocation={(currentLocation: string) => setCurrentLocation(currentLocation)}
                    setStoreList={(list) => setDirectionList([...list])}
                    centerCoords={center}
                />
            </div>
        </div>
        {/*<ReviewPopover />*/}
          <div className={'absolute right-6 bottom-6 z-10'}>
              <ReviewPopover />
          </div>
      </div>
    )
}


 export default Home