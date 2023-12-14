"use client"
import {useContext, useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import Image from "next/image";
import {ArrowBackIcon, ExternalLinkIcon, Icon} from '@chakra-ui/icons'
import {
    Accordion,
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
import {CreateItems} from "@/components/cards/CreateItems";
import {UpdateItems} from "@/components/cards/UpdateItems";
import {TagView} from "@/components/tag/TagView";

interface slackCardType extends cardType {
    deleteReason?: string
}

interface props {
}

const initStyle: string = 'relative z-10 top-0 h-screen w-[292px] bg-white py-[52px] px-[21px] border-l border-slate-200'

const initData = {
    title:'',
    operatorTime: [{day: '월', time: ''},{day: '화', time: ''},{day: '수', time: ''},{day: '목', time: ''},{day: '금', time: ''},{day: '토', time: ''},{day: '일', time: ''},{day: ''}]
}

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
        }else{
            setSlackbotData({...initData})
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
        const result = await slackFetch(`approval/${type}`,"POST", {
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

    const renderOperatorTimeInputs = () => {
        const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일']
        return daysOfWeek.map((day, index) => (
            <div key={index} className={'flex justify-between items-center'}>
                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight mr-[6px]'}>
                    {day}
                </p>
                <Input
                    size={'md'}
                    placeholder={'정보를 입력해주세요'}
                    value={slackbotData?.operatorTime ? slackbotData.operatorTime[index].time : ''}
                    onChange={(e) => setOperatorTime(index, e.target.value)}
                />
            </div>
        ))
    }

    const renderTag = (index: number, label: string) => {
        return (
            <Tag size={'sm'} className={`cursor-pointer ${tagArray[index] ? 'bg-slate-500' : 'bg-slate-200'}`}
                 onClick={() => {
                     let tmp = tagArray
                     if (tmp[index]) {
                         tmp[index] = undefined
                     } else {
                         tmp[index] = label
                     }

                     setTagArray([...tmp])
                 }}>
                <TagLabel
                    className={`font-inter text-xs leading-none font-bold text-gray-900 ${tagArray[index] ? 'text-white' : ''}`}>
                    {label}
                </TagLabel>
            </Tag>
        )
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
                    <CreateItems title={'매장명'} description={'레코드샵 이름을 입력해주세요'} >
                        <Input
                            size={'md'}
                            placeholder={'매장명을 입력해주세요'}
                            value={slackbotData.title}
                            onChange={(e) => setInsertDataKey('title', e.target.value)}
                        />
                    </CreateItems>
                    <CreateItems title={'매장 이미지'} description={'매장 이미지를 등록해주세요'}>
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
                    </CreateItems>
                    <CreateItems title={'주소'} description={'주소 검색을 통해 주소를 등록해주세요'} >
                        <DaumPost setAddress={(address, lat, lng) => {
                            console.log('address', address)
                            setAddress(address, lat, lng)
                        }} />
                        <Input size={'md'} disabled value={slackbotData.address}/>
                    </CreateItems>
                    <CreateItems title={'전화번호'} description={'매장 연락처를 입력해주세요'}>
                        <Input
                            size={'md'}
                            placeholder={'매장 전화번호를 입력해주세요'}
                            value={slackbotData.phone}
                            onChange={(e) => setInsertDataKey('phone', e.target.value)}
                        />
                    </CreateItems>
                    {/*<CreateItems title={'운영시간'} description={'요일별 매장 운영시간을 입력해주세요'}>*/}
                    {/*    {renderOperatorTimeInputs()}*/}
                    {/*    <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>*/}
                    {/*        기타 정보를 입력해주세요 <br/>*/}
                    {/*        (연중무휴, 명절 정보 등)*/}
                    {/*    </p>*/}
                    {/*    <Input*/}
                    {/*        size={'md'}*/}
                    {/*        placeholder={'정보를 입력해주세요'}*/}
                    {/*        value={slackbotData?.operatorTime ? slackbotData.operatorTime[7].day : ''}*/}
                    {/*        onChange={(e) => setOperatorTime(7, e.target.value)}*/}
                    {/*    />*/}
                    {/*</CreateItems>*/}
                    {/*<CreateItems title={'태그'} description={'레코드샵 유형에 해당하는 태그를 선택해주세요'}>*/}
                    {/*    <TagView initItems={['중고 바이닐', '신품 바이닐', 'LP 바']} item={tagArray} setItem={() => {}} />*/}
                    {/*</CreateItems>*/}
                    <CreateItems
                        title={'태그'}
                        description={'레코드샵 유형에 해당하는 태그를 선택해주세요'}
                    >
                        <div>
                            {renderTag(0, '신품 바이닐')}
                            {renderTag(1, '중고 바이닐')}
                            {renderTag(2, 'LP 바')}
                        </div>
                    </CreateItems>
                    <CreateItems title={'사이트'} description={'매장 홈페이지 등\n관련 사이트를 입력해 주세요'}>
                        <Input
                            size={'md'}
                            placeholder={'링크를 입력해주세요'}
                            value={slackbotData.site}
                            onChange={(e) => setInsertDataKey('site', e.target.value)}
                        />
                    </CreateItems>
                    <CreateItems title={'인스타그램'} description={'매장 인스타그램 링크를 입력해주세요'}>
                        <Input
                            size={'md'}
                            placeholder={'링크를 입력해주세요'}
                            value={slackbotData.instaUrl}
                            onChange={(e) => setInsertDataKey('instaUrl', e.target.value)}
                        />
                    </CreateItems>
                    <CreateItems title={'매장 정보'} description={'매장 정보(설명, 특징 등)를\n를 입력해주세요'}>
                        <Input
                            size={'md'}
                            placeholder={'정보를 입력해주세요'}
                            value={slackbotData.info}
                            onChange={(e) => setInsertDataKey('info', e.target.value)}
                        />
                    </CreateItems>
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
