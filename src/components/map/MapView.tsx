"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";
import {noAuthFetch} from "@/api/api";

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
    const [result, setResult] = useState<Array<any>>([])
    const [markers, setMarkers] = useState<Array<MarkerGroup>>([])

    const getLocation = async () => {
        const location = await noAuthFetch('location', 'GET')
        setResult(location)
    }

    useEffect(() => {
        getLocation()
    }, []);

    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=040ca9bab6805a5dc1355dd4141d7490&autoload=false`
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
                    const marker:Array<MarkerGroup> = result.map(v => {
                        return {
                            marker: addMarker(new window.kakao.maps.LatLng(v.latitude, v.longitude)),
                            id: v.id
                        }
                    })

                    setMarkers([...markers, ...marker])
                }

                function addMarker(position: any) {

                    // 마커를 생성합니다
                    var marker = new window.kakao.maps.Marker({
                        position: position
                    });

                    // 생성된 마커를 배열에 추가합니다
                    return marker
                }

                if(markers?.length){
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
    }, [result.length, markers.length])

    return (
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
    )
}


export default MapView