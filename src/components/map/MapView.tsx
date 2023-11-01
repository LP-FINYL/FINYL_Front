"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";

declare global {
    interface Window {
        kakao: any;
    }
}

interface MarkerGroup {
    id: string
    marker: any
}

interface props {
    setSelectedId: (id: string) => void
}

const MapView:NextPage<props> = ({setSelectedId}) => {
    const [markers, setMarkers] = useState<Array<MarkerGroup>>([])

    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`
        document.head.appendChild(kakaoMapScript)

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
                var container = document.getElementById('map')
                var options = {
                    center: new window.kakao.maps.LatLng(37.556142, 126.972371),
                    level: 3,
                }

                var map = new window.kakao.maps.Map(container, options)

                if(!markers.length){
                    addMarker(new window.kakao.maps.LatLng(37.556142, 126.972371))
                }

                function addMarker(position: any) {

                    // 마커를 생성합니다
                    var marker = new window.kakao.maps.Marker({
                        position: position
                    });

                    // 생성된 마커를 배열에 추가합니다
                    setMarkers([...markers, {id: '1', marker}])
                }

                if(markers.length){
                    markers.map((marker) => {
                        marker.marker.setMap(map)

                        window.kakao.maps.event.addListener(marker.marker, 'click', () => {
                            setSelectedId(marker.id)
                        });
                    })
                }
            })
        }

        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
    }, [markers.length])

    return (
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
    )
}


export default MapView