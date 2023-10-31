"use client"
import { useEffect } from "react";
import FinylMainCard from "@/components/cards/FinylMainCard";

declare global {
  interface Window {
    kakao: any;
  }
}

const Home = () => {

  useEffect(() => {
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = false
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map')
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        }

        var map = new window.kakao.maps.Map(container, options)
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
  }, [])

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
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
  )
}


 export default Home