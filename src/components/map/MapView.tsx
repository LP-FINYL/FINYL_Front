"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";
import {noAuthFetch} from "@/api/api";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import Script from "next/script";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=040ca9bab6805a5dc1355dd4141d7490&autoload=false&libraries=services`;

interface MarkerGroup {
    id: string
    marker: any
}

interface props {
    setSelectedId: (id: string) => void
    setCurrentLocation: (currentLocation: string) => void
    selectedId?: string
    setStoreList: (list: Array<storeInfoType>) => void
    storeList: Array<storeInfoType>
    centerCoords?: [number, number]
}

const MapView:NextPage<props> = ({storeList, setStoreList, setSelectedId, setCurrentLocation}) => {
    const [centerCoords, setCenterCoords] = useState<{lat: number, lng: number}>({
        lat: 37.557938025275, lng: 126.922059899484
    })

    const getLocationDirections = async (SWlatitude: number, SWlongitude: number, NElatitude: number, NElongitude: number) => {
        const locations = await noAuthFetch(`locationDirections?SWlatitude=${SWlatitude}&SWlongitude=${SWlongitude}&NElatitude=${NElatitude}&NElongitude=${NElongitude}`, 'GET')
        console.log(locations)

        setStoreList(locations)
    }

    useEffect(() => {
        window.kakao.maps.load(() => {
            var geocoder = new window.kakao.maps.services.Geocoder();

            function searchAddrFromCoords(lat: number, lng: number, callback: any) {
                // 좌표로 행정동 주소 정보를 요청합니다
                geocoder.coord2RegionCode(lng, lat, callback);
            }

            if(centerCoords.lng && centerCoords.lat) {
                searchAddrFromCoords(centerCoords.lat, centerCoords.lng, (result: any, status: any) => {
                    for(var i = 0; i < result.length; i++) {
                        // 행정동의 region_type 값은 'H' 이므로
                        if (result[i].region_type === 'H') {
                           setCurrentLocation(result[i].address_name)
                            break;
                        }
                    }
                })
            }
        })
    }, [centerCoords])

    return (
        <>
            <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
            <Map
                center={{ lat: 37.557938025275, lng: 126.922059899484 }}
                style={{ width: '100%', height: '100%' }}
                onTileLoaded={(map) => {
                    const sw = map.getBounds().getSouthWest()
                    const ne = map.getBounds().getNorthEast()

                    setCenterCoords({lat: map.getCenter().getLat(), lng: map.getCenter().getLng()})

                    getLocationDirections(sw.getLat(), sw.getLng(), ne.getLat(), ne.getLng())
                }}
            >
                {
                    storeList.map(store => {
                        if(store.longitude && store.latitude){
                            return <MapMarker
                                key={store.id}
                                position={{
                                    lat: store.latitude,
                                    lng: store.longitude
                                }}
                            />
                        }else{
                            return <></>
                        }
                    })
                }
            </Map>
        </>
    )
}


export default MapView