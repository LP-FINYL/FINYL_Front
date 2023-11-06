"use client"
import {useEffect, useState} from "react";
import FinylMainCard from "@/components/cards/FinylMainCard";
import MapView from "@/components/map/MapView";

const Home = () => {
    const [selectId, setSelectId] = useState<string | undefined>(undefined)

    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-screen">
          <FinylMainCard selectedId={selectId} setSelectedId={setSelectId} />
          <MapView setSelectedId={(id) => setSelectId(id)} />
        </div>
      </div>
    )
}


 export default Home