"use client"
import {useEffect, useState} from "react";
import FinylMainCard from "@/components/cards/FinylMainCard";
import MapView from "@/components/map/MapView";
import SideTab from "@/components/sideTab/SideTab";
import FinylSearchResultCard from "@/components/cards/FinylSearchResultCard";

const Home = () => {
    const [selectId, setSelectId] = useState<string | undefined>(undefined)
    const [currentLocation, setCurrentLocation] = useState<string>("")

    useEffect(() => {
        console.log(currentLocation)
    }, [currentLocation]);

    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-screen">
            <div className={'w-20'}>
                <SideTab />
                <FinylSearchResultCard currentLocation={currentLocation} selectedId={selectId} setSelectedId={setSelectId} />
                <FinylMainCard selectedId={selectId} setSelectedId={setSelectId} />
            </div>
            <div className={'h-full ml-20'}>
                <MapView setSelectedId={(id) => setSelectId(id)} setCurrentLocation={(currentLocation: string) => setCurrentLocation(currentLocation)} />
            </div>
        </div>
      </div>
    )
}


 export default Home