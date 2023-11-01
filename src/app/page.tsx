"use client"
import {useEffect, useState} from "react";
import FinylMainCard from "@/components/cards/FinylMainCard";
import MapView from "@/components/map/MapView";

const Home = () => {
    const [selectId, setSelectId] = useState<string | undefined>(undefined)

    useEffect(() => {
        console.log(selectId)
    }, [selectId])

    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-screen">
          <FinylMainCard
              title={'방레코드'}
              description={'서울 마포구 토정로 16길 20 1층 제2호'}
              tags={['중고 바이닐', '중고 CD']}
              info={'클래식 락 재즈 영화음악 중심의 중고 바이닐 및 CD 판매점'}
              operatingTime={[{day: '월 - 금', time: '10:00 - 15:30'}, {day: '토', time: '13:00 - 17:30'}, {day: '일요일 정기휴무'}]}
          />
          <MapView setSelectedId={(id) => setSelectId(id)} />
        </div>
      </div>
    )
}


 export default Home