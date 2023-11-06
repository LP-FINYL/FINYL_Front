"use client"
import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
import {useEffect, useState} from "react";
import {NextPage} from "next";
import {Button} from "@nextui-org/react";

declare global {
    interface Window {
        kakao: any;
    }
}

interface props {
    setAddress: (address: string, lat: number, lon: number) => void
}

const DaumPost: NextPage<props> = ({setAddress}) => {
    const [searchResult, setSearchResult] = useState<string|undefined>(undefined)
    //클릭 시 수행될 팝업 생성 함수
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=040ca9bab6805a5dc1355dd4141d7490&autoload=false&libraries=services`
        document.head.appendChild(kakaoMapScript)

        const onLoadKakaoAPI = () => {
            if(searchResult){
                window.kakao.maps.load(() => {
                    let geocoder = new window.kakao.maps.services.Geocoder();

                    geocoder.addressSearch(searchResult, function(result: any, status: any) {

                        // 정상적으로 검색이 완료됐으면
                        if (status === window.kakao.maps.services.Status.OK) {
                            console.log('lat', result[0].y)
                            console.log('lon', result[0].x)
                            setAddress(searchResult, result[0].y, result[0].x)
                        }
                    });
                })
            }
        }

        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
    }, [searchResult]);

    const handleComplete = (data: any) => {
        console.log(data.address)
        setSearchResult(data.address)
    }
    //클릭 시 발생할 이벤트
    const handleClick = () => {
        //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleComplete});
    }
    return <Button onClick={handleClick}>주소찾기</Button>
}

export default DaumPost;