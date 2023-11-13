"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";
import {noAuthFetch} from "@/api/api";

interface MarkerGroup {
    id: string
    marker: any
}

interface props {
    setSelectedId: (id: string) => void
    setCurrentLocation: (currentLocation: string) => void
}

const MapView:NextPage<props> = ({setSelectedId, setCurrentLocation}) => {
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
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=040ca9bab6805a5dc1355dd4141d7490&autoload=false&libraries=services`
        document.head.appendChild(kakaoMapScript)

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
                var container = document.getElementById('map')
                var options = {
                    center: new window.kakao.maps.LatLng(37.557938025275, 126.922059899484),
                    level: 3,
                }

                var map = new window.kakao.maps.Map(container, options)

                new window.kakao.maps.event.addListener(map, 'dragend', () => {
                    // 지도 영역정보를 얻어옵니다
                    var bounds = map.getBounds();
                    var swLatlng = bounds.getSouthWest(); //남서
                    var neLatlng = bounds.getNorthEast(); //북동

                    let center = map.getCenter()
                    var geocoder = new window.kakao.maps.services.Geocoder();

                    searchAddrFromCoords(center, (result: any, status: any) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            if(result.length){
                                result.map((v: any) => {
                                    if(v.region_type === 'H') {
                                        setCurrentLocation(v.address_name)
                                    }
                                })
                            }
                        }
                    })

                    function searchAddrFromCoords(coords: any, callback: any) {
                        // 좌표로 행정동 주소 정보를 요청합니다
                        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
                    }

                    function searchDetailAddrFromCoords(coords: any, callback: any) {
                        // 좌표로 법정동 상세 주소 정보를 요청합니다
                        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
                    }

                    console.log(swLatlng, neLatlng)
                })

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