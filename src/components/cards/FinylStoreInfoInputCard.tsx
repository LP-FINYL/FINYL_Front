"use client"
import {useContext, useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import Image from "next/image";
import {ArrowBackIcon, ExternalLinkIcon, Icon} from '@chakra-ui/icons'
import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Skeleton,
    SkeletonText,
    Tag, TagCloseButton, TagLabel, Textarea,
    useClipboard, useToast
} from '@chakra-ui/react'
import {formDataFetch, noAuthFetch, slackFetch} from "@/api/api";
import {BsGlobe2, BsInstagram} from 'react-icons/bs'
import {useRouter} from "next/navigation";
import {IoLogoInstagram, IoLogoTwitter} from "react-icons/io";
import {IoChevronForward, IoHomeSharp, IoSearch} from "react-icons/io5";
import {Input} from "@chakra-ui/input";
import DaumPost from "@/components/searchAddress/DaumPost";
import {SlackbotContext} from "@/context/SlackbotProvider";

interface slackCardType extends cardType {
    deleteReason?: string
}

interface props {
}

const initStyle: string = 'relative z-10 top-0 h-screen w-[292px] bg-white py-[52px] px-[21px] border-l border-slate-200'

const FinylStoreInfoInputCard: NextPage<props> = ({}) => {
    const router = useRouter()
    const fileRef = useRef<HTMLInputElement>(null);
    const [slackbotData, setSlackbotData] = useState<slackCardType>({
        title:'',
        operatorTime: [{day: '월', time: ''},{day: '화', time: ''},{day: '수', time: ''},{day: '목', time: ''},{day: '금', time: ''},{day: '토', time: ''},{day: '일', time: ''},{day: ''}]
    })
    const [tagArray, setTagArray] = useState<Array<string | undefined>>([undefined, undefined, undefined])
    const { isOpen, type, updateId, setSlackbotContext } = useContext(SlackbotContext)

    useEffect(() => {
        if((type === 'update' || type === 'delete') && updateId){
            getStoreInfo(updateId)
        }
    }, [type, updateId])

    const getStoreInfo = async (id: string) => {
        const result = await noAuthFetch(`storeInfo?id=${id}`, 'GET')

        if(result){
            setSlackbotData({
                ...result,
                operatorTime: JSON.parse(result.operatorTime),
                phone: result.phone ? `0${result.phone}` : '-'
            })
        }
    }

    const handleClick = () => {
        fileRef?.current?.click()
    }

    const handleOnchange = (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        postImageUpload(formData)
    }

    const postSlackbot = async () => {
        const result = await slackFetch(type,"POST", {
            ...slackbotData,
            operatorTime: JSON.stringify(slackbotData.operatorTime),
            tags: tagArray.filter(v => v).join(', ')
        })

        setSlackbotData({
            title:'',
            operatorTime: [{day: '월', time: ''},{day: '화', time: ''},{day: '수', time: ''},{day: '목', time: ''},{day: '금', time: ''},{day: '토', time: ''},{day: '일', time: ''},{day: ''}]
        })

        setSlackbotContext({
            isOpen: false,
            type
        })
        console.log(result)
    }

    const postImageUpload = async (formData: FormData) => {
        const result = await formDataFetch(
            'admin/imageUpload',
            "POST",
            formData
        )

        setInsertDataKey('image', result.publicUrl)
    }

    const setInsertDataKey = (key: string, changeData: string|number) => {
        setSlackbotData({
            ...slackbotData,
            [key]: changeData
        })
    }

    const setOperatorTime = (index: number, value: string) => {
        let tmp = slackbotData.operatorTime ? slackbotData.operatorTime : []

        if(index === 7) {
            tmp[index] = {day: value}
        } else {
            tmp[index] = {day: tmp[index].day, time: value}
        }

        setSlackbotData({...slackbotData, operatorTime: tmp})
    }

    const setAddress = (address: string, lat: number, lng: number) => {
        setSlackbotData({
            ...slackbotData,
            address,
            latitude: lat,
            longitude: lng
        })
    }

    const displayTitle = (type: 'create' | 'update' | 'delete') => {
        switch(type) {
            case 'create':
                return '등록'
            case 'update':
                return '수정'
            case 'delete':
                return '삭제'
        }
    }

    //  ${!selectedId ? 'hidden' : ''} 769px 376px
    return <div className={`${initStyle} overflow-y-scroll ${isOpen ? '' : 'hidden'}`}>
        <div className={'flex justify-between items-center'}>
            <div>
                <p className={'font-inter text-gray-900 text-xl font-bold leading-normal'}>레코드샵 {displayTitle(type)} 신청</p>
                <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>FINd your vinYL</p>
            </div>
            <div className={'w-6 h-6 cursor-pointer'} onClick={() => {
                setSlackbotContext({isOpen: false, type: type})
            }}>
                <Icon as={ArrowBackIcon} boxSize={6} />
            </div>
        </div>
        <div className={'mt-[36px]'}>
            <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
                아래의 양식을 통해 전달해주신 정보는 검토 후 지도에 반영됩니다.
            </p>
        </div>
        <div className={'border-t-[1px] my-6 border-t-line'}/>
        {
            type !== 'delete'
                ? <>
                    <div className={'flex flex-col gap-6'}>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>매장명</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>레코드샵 이름을 입력해주세요</p>
                            <Input
                                size={'md'}
                                placeholder={'매장명을 입력해주세요'}
                                value={slackbotData.title}
                                onChange={(e) => setInsertDataKey('title', e.target.value)}
                            />
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>매장 이미지</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>매장 이미지를 등록해주세요</p>
                            <Button className={'font-inter text-slate-500 text-sm font-bold underline leading-tight justify-start'} variant={'link'} onClick={handleClick}>
                                파일 검색
                            </Button>
                            <Input size={'md'} disabled value={slackbotData.image} />
                            <Input
                                ref={fileRef}
                                type={'file'}
                                className={'hidden'}
                                onChange={(e) => {
                                    if(e.target?.files?.length) {
                                        handleOnchange(e.target.files[0])
                                    }
                                }}
                            />
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>주소</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>주소 검색을 통해 주소를 등록해주세요</p>
                            <DaumPost setAddress={(address, lat, lng) => {
                                console.log('address', address)
                                setAddress(address, lat, lng)
                            }} />
                            <Input size={'md'} disabled value={slackbotData.address}/>
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>전화번호</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>매장 연락처를 입력해주세요</p>
                            <Input
                                size={'md'}
                                placeholder={'매장 전화번호를 입력해주세요'}
                                value={slackbotData.phone}
                                onChange={(e) => setInsertDataKey('phone', e.target.value)}
                            />
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>운영시간</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>요일별 매장 운영시간을 입력해주세요</p>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                                    월:
                                </p>
                                <Input
                                    size={'md'}
                                    placeholder={'정보를 입력해주세요'}
                                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[0].time : ''}
                                    onChange={(e) => setOperatorTime(0, e.target.value)}
                                />
                            </div>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                                    화:
                                </p>
                                <Input
                                    size={'md'}
                                    placeholder={'정보를 입력해주세요'}
                                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[1].time : ''}
                                    onChange={(e) => setOperatorTime(1, e.target.value)}
                                />
                            </div>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                                    수:
                                </p>
                                <Input
                                    size={'md'}
                                    placeholder={'정보를 입력해주세요'}
                                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[2].time : ''}
                                    onChange={(e) => setOperatorTime(2, e.target.value)}
                                />
                            </div>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                                    목:
                                </p>
                                <Input
                                    size={'md'}
                                    placeholder={'정보를 입력해주세요'}
                                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[3].time : ''}
                                    onChange={(e) => setOperatorTime(3, e.target.value)}
                                />
                            </div>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                                    금:
                                </p>
                                <Input
                                    size={'md'}
                                    placeholder={'정보를 입력해주세요'}
                                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[4].time : ''}
                                    onChange={(e) => setOperatorTime(4, e.target.value)}
                                />
                            </div>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                                    토:
                                </p>
                                <Input
                                    size={'md'}
                                    placeholder={'정보를 입력해주세요'}
                                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[5].time : ''}
                                    onChange={(e) => setOperatorTime(5, e.target.value)}
                                />
                            </div>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                                    일:
                                </p>
                                <Input
                                    size={'md'}
                                    placeholder={'정보를 입력해주세요'}
                                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[6].time : ''}
                                    onChange={(e) => setOperatorTime(6, e.target.value)}
                                />
                            </div>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>
                                기타 정보를 입력해주세요 <br/>
                                (연중무휴, 명절 정보 등)
                            </p>
                            <Input
                                size={'md'}
                                placeholder={'정보를 입력해주세요'}
                                value={slackbotData?.operatorTime ? slackbotData.operatorTime[7].day : ''}
                                onChange={(e) => setOperatorTime(7, e.target.value)}
                            />
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>태그</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>레코드샵 유형에 해당하는 태그를 선택해주세요</p>
                            <div>
                                {/*<Tag size={'sm'} className={'bg-gray-500'}>*/}
                                {/*    <TagLabel className={'font-inter text-xs leading-none font-bold text-white'}>선택안함</TagLabel>*/}
                                {/*    <TagCloseButton color={'white'}/>*/}
                                {/*</Tag>*/}
                                <div className={'mt-[15px] flex flex-wrap gap-[6px]'}>
                                    <Tag size={'sm'} className={`cursor-pointer ${tagArray[0] ? 'bg-slate-500' : 'bg-slate-200'}`} onClick={() => {
                                        let tmp = tagArray
                                        if(tmp[0]) {
                                            tmp[0] = undefined
                                        }else {
                                            tmp[0] = "신품 바이닐"
                                        }

                                        setTagArray([...tmp])
                                    }}>
                                        <TagLabel className={`font-inter text-xs leading-none font-bold text-gray-900 ${tagArray[0] ? 'text-white' : ''}`}>
                                            신품 바이닐
                                        </TagLabel>
                                    </Tag>
                                    <Tag size={'sm'} className={`cursor-pointer ${tagArray[1] ? 'bg-slate-500' : 'bg-slate-200'}`} onClick={() => {
                                        let tmp = tagArray
                                        if(tmp[1]) {
                                            tmp[1] = undefined
                                        }else {
                                            tmp[1] = "중고 바이닐"
                                        }

                                        setTagArray([...tmp])
                                    }}>
                                        <TagLabel className={`font-inter text-xs leading-none font-bold text-gray-900 ${tagArray[1] ? 'text-white' : ''}`}>
                                            중고 바이닐
                                        </TagLabel>
                                    </Tag>
                                    <Tag size={'sm'} className={`cursor-pointer ${tagArray[2] ? 'bg-slate-500' : 'bg-slate-200'}`} onClick={() => {
                                        let tmp = tagArray
                                        if(tmp[2]) {
                                            tmp[2] = undefined
                                        }else {
                                            tmp[2] = "LP 바"
                                        }

                                        setTagArray([...tmp])
                                    }}>
                                        <TagLabel className={`font-inter text-xs leading-none font-bold text-gray-900 ${tagArray[2] ? 'text-white' : ''}`}>
                                            LP 바
                                        </TagLabel>
                                    </Tag>
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>사이트</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>매장 홈페이지 등 <br/>관련 사이트를 입력해 주세요</p>
                            <Input
                                size={'md'}
                                placeholder={'링크를 입력해주세요'}
                                value={slackbotData.site}
                                onChange={(e) => setInsertDataKey('site', e.target.value)}
                            />
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>인스타그램</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>매장 인스타그램 링크를 입력해주세요</p>
                            <Input
                                size={'md'}
                                placeholder={'링크를 입력해주세요'}
                                value={slackbotData.instaUrl}
                                onChange={(e) => setInsertDataKey('instaUrl', e.target.value)}
                            />
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>매장 정보</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>매장 정보(설명, 특징 등)를<br/>를 입력해주세요</p>
                            <Input
                                size={'md'}
                                placeholder={'정보를 입력해주세요'}
                                value={slackbotData.info}
                                onChange={(e) => setInsertDataKey('info', e.target.value)}
                            />
                        </div>
                    </div>
                </>
                : <>
                    <div className={'flex flex-col gap-6'}>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>매장명</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>{slackbotData.title}</p>
                        </div>
                        <div className={'flex flex-col gap-[9px]'}>
                            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>삭제 신청 사유</p>
                            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>삭제 신청 사유를 입력해 주세요.</p>
                            <Textarea
                                resize={'none'}
                                placeholder={'삭제 사유를 입력해주세요.'}
                                value={slackbotData.deleteReason}
                                onChange={(e) => setInsertDataKey('deleteReason', e.target.value)}
                            />
                        </div>
                    </div>

                </>
        }
        <div className={'border-t-[1px] my-6 border-t-line'}/>
        <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
            감사합니다<br/>
            검토 후 지도에 반영될 예정입니다.
        </p>
        <Button
            size={'xs'}
            className={'bg-gray-900 rounded-[6px] mt-6 w-[77px]'}
            color={'white'}
            colorScheme={'blue'}
            onClick={postSlackbot}
        >
            제출
        </Button>
    </div>
}

export default FinylStoreInfoInputCard
