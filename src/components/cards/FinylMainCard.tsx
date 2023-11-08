"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";
import Image from "next/image";
import {ArrowBackIcon, ExternalLinkIcon, Icon} from '@chakra-ui/icons'
import {IconButton, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonText} from '@chakra-ui/react'
import {noAuthFetch} from "@/api/api";
import {CopyModal} from "@/components/modal/CopyModal";
import {BsGlobe2, BsInstagram} from 'react-icons/bs'
import {useRouter} from "next/navigation";

interface props {
    selectedId?: string
    setSelectedId: (selectedId?: string) => void
}

const initStyle: string = 'absolute z-10 left-14 bottom-0 h-[800px] w-[393px] bg-white'

const FinylMainCard: NextPage<props> = ({selectedId, setSelectedId}) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)
    const [
        {
            title,
            image,
            address,
            tags,
            phone,
            site,
            instaUrl,
            info,
            operatorTime
        }, setCardData] = useState<storeInfoType>({ title: '' })

    useEffect(() => {
        if(selectedId){
            getStoreInfo(selectedId)
        }else{
            setCardData({
                title: ''
            })
            setLoading(true)
        }
    }, [selectedId])

    const getStoreInfo = async (id: string) => {
        const result = await noAuthFetch(`storeInfo?id=${id}`, 'GET')

        setCardData({
            ...result,
            operatorTime: JSON.parse(result.operatorTime),
            phone: result.phone ? `0${result.phone}` : '-'
        })

        setLoading(false)
    }

    const goToUrl = (url: string) => {
        window.open(url)
    }

    const ShareMenu = () => {
        if(site || instaUrl) {
            return (
                <Menu>
                    <MenuButton
                        boxSize={6}
                        as={IconButton}
                        aria-label='Options'
                        icon={<ExternalLinkIcon boxSize={6} />}
                    />
                    <MenuList>
                        {
                            site && <div onClick={() => goToUrl(site)}>
                                <MenuItem icon={<Icon boxSize={4} as={BsGlobe2} />}>
                                    웹사이트로 이동
                                </MenuItem>
                            </div>
                        }
                        {
                            instaUrl &&
                            <div onClick={() => goToUrl(instaUrl)}>
                                <MenuItem icon={<Icon boxSize={4} as={BsInstagram} onClick={() => goToUrl(instaUrl)}/>}>
                                    인스타그램으로 이동
                                </MenuItem>
                            </div>
                        }
                    </MenuList>
                </Menu>
            )
        }else{
            <div></div>
        }
    }

    return <div className={`${initStyle} ${!selectedId ? 'hidden' : ''}`}>
        <div className={'flex flex-col w-full h-full rounded-t-[10px]'}>
            <div className={'flex justify-between w-full h-12 px-[21px] py-3'}>
                <ArrowBackIcon className={'cursor-pointer'} boxSize={6} onClick={() => {
                    setSelectedId(undefined)
                }}/>
                <ShareMenu />
            </div>
            <div className={'w-full h-[393px]'}>
                <div className={'absolute w-full h-[393px]'} >
                    <Skeleton isLoaded={!loading} height={393}>
                        <Image
                            src={image ?? 'https://lh3.googleusercontent.com/p/AF1QipNziqUN_0xcqb5iKZw1wXZs9TbaJM0eaXbaA_3c=s680-w680-h510'}
                            alt={'SMC'}
                            fill
                        />
                    </Skeleton>
                </div>
            </div>
            <div className={'flex flex-col p-6'}>
                <SkeletonText noOfLines={1} isLoaded={!loading}>
                <p className={"font-inter text-slate-600 text-sm font-normal leading-tight"}>{tags ?? ''}</p>
                </SkeletonText>
                <SkeletonText mt={2} noOfLines={1} isLoaded={!loading}>
                <p className={"font-inter text-xl font-bold text-gray-900 leading-normal"}>{title ?? ''}</p>
                </SkeletonText>
                <SkeletonText my={2} noOfLines={1} isLoaded={!loading}>
                <p className={"font-inter text-slate-600 text-sm font-normal my-[18px]"}>{address ?? ''}</p>
                </SkeletonText>
                <div className={'flex'}>
                    <CopyModal text={'주소 복사'} copyValue={address ?? ''}/>
                    <CopyModal text={'전화번호 복사'} copyValue={phone ?? ''}/>
                </div>
                <div className={'border-t-[1px] my-4 border-t-line'}/>
                <div className={'flex justify-between'}>
                    <div className={'w-[160px] flex flex-col'}>
                        <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                            정보
                        </p>
                        <SkeletonText isLoaded={!loading}>
                            <p className={'mt-[9px] whitespace-pre-line text-line font-inter text-gray-900 text-sm font-normal leading-tight'}>
                                {info ?? '-'}
                            </p>
                        </SkeletonText>
                    </div>
                    <div className={'w-[160px] flex flex-col'}>
                        <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                            운영시간
                        </p>
                        <SkeletonText isLoaded={!loading}>
                            <div className={'mt-[9px]'}>
                                {
                                    operatorTime?.map((value) => {
                                        return <div className={'flex justify-between'} key={value.day}>
                                            <p className={'whitespace-pre-line text-line font-inter text-gray-900 text-sm font-normal leading-tight'}>{value.day}</p>
                                            {
                                                value.time
                                                    ? <p className={'w-[100px] whitespace-pre-line text-line font-inter text-gray-900 text-sm font-normal leading-tight'}>
                                                        {value.time}
                                                    </p>
                                                    : undefined
                                            }
                                        </div>
                                    }) ?? ''
                                }
                            </div>
                        </SkeletonText>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FinylMainCard