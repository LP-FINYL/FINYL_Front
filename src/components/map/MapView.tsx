"use client"
import {useContext, useEffect, useState} from "react";
import {NextPage} from "next";
import {noAuthFetch} from "@/api/api";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import Script from "next/script";
import {SearchContext} from "@/context/SearchProvider";

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
    centerCoords: { lat: number, lng: number }
    zoomLevel: number
}

const MapView:NextPage<props> = ({selectedId, setSelectedId, setCurrentLocation, centerCoords, zoomLevel}) => {
    const [center, setCenter] = useState<{lat: number, lng: number}>(centerCoords)
    const {isSearchNow, searchList, coords, setCoords} = useContext(SearchContext)

    useEffect(() => {
        if(centerCoords){
            setCenter(centerCoords)
        }
    }, [centerCoords]);

    useEffect(() => {
        window.kakao.maps.load(() => {
            var geocoder = new window.kakao.maps.services.Geocoder();

            function searchAddrFromCoords(lat: number, lng: number, callback: any) {
                // 좌표로 행정동 주소 정보를 요청합니다
                geocoder.coord2RegionCode(lng, lat, callback);
            }

            if(center.lng && center.lat) {
                searchAddrFromCoords(center.lat, center.lng, (result: any, status: any) => {
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
    }, [center])

    return (
        <>
            <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
            <Map
                level={zoomLevel}
                zoomable={true}
                center={center}
                style={{ width: '100%', height: '100%' }}
                onTileLoaded={(map) => {
                    const sw = map.getBounds().getSouthWest()
                    const ne = map.getBounds().getNorthEast()

                    setCenter({lat: map.getCenter().getLat(), lng: map.getCenter().getLng()})

                    if(!isSearchNow) {
                        setCoords && setCoords({
                            SWlat: sw.getLat(),
                            SWlng: sw.getLng(),
                            NElat: ne.getLat(),
                            NElng: ne.getLng()
                        })
                    }
                }}
            >
                {
                    searchList.map(store => {
                        if(store.longitude && store.latitude){
                            return <MapMarker
                                key={store.id}
                                onClick={() => {
                                    store.id && setSelectedId(store.id)
                                    if(store.latitude && store.longitude){
                                        setCenter({
                                            lat: store.latitude,
                                            lng: store.longitude
                                        })
                                    }
                                }}
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