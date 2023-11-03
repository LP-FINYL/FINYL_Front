"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";
import Image from "next/image";
import {ArrowBackIcon, CopyIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import { Button, ButtonGroup } from '@chakra-ui/react'

interface OTType {
    day: string
    time?: string
}
interface props {
    title: string
    image?: string
    description?: string
    tags?: Array<string>
    info?: string
    operatingTime?: Array<OTType>
}

const initStyle: string = 'absolute z-10 left-14 bottom-0 h-[800px] w-[393px] bg-white'

const FinylMainCard: NextPage<props> = ({title, image, description, tags, info, operatingTime}) => {

    useEffect(() => {

    }, [])

    return <div className={initStyle}>
        <div className={'flex flex-col w-full h-full rounded-t-[10px]'}>
            <div className={'flex justify-between w-full h-12 px-[21px] py-3'}>
                <ArrowBackIcon boxSize={6} />
                <ExternalLinkIcon boxSize={6} />
            </div>
            <div className={'w-full h-[393px]'}>
                <div className={'absolute w-full h-[393px]'} >
                    <Image
                        src={'https://lh3.googleusercontent.com/p/AF1QipNziqUN_0xcqb5iKZw1wXZs9TbaJM0eaXbaA_3c=s680-w680-h510'}
                        alt={'SMC'}
                        fill
                    />
                </div>
            </div>
            <div className={'flex flex-col p-6'}>
                <p className={"font-inter text-slate-600 text-sm font-normal leading-tight"}>
                    {tags?.join(',')}
                </p>
                <p className={"font-inter text-xl font-bold text-gray-900 leading-normal"}>
                    {title}
                </p>
                <p className={"font-inter text-slate-600 text-sm font-normal my-[18px]"}>
                    {description}
                </p>
                <div className={'flex'}>
                    <Button
                        className={'bg-slate-400 mr-[9px]'}
                        colorScheme={'pink'}
                        variant={'solid'}
                        leftIcon={<CopyIcon />}
                        size={'sm'}
                    >
                        <p className={'font-inter text-white text-sm font-semibold leading-tight'}>주소 복사</p>
                    </Button>
                    <Button
                        className={'bg-slate-400'}
                        colorScheme={'pink'}
                        variant={'solid'}
                        leftIcon={<CopyIcon />}
                        size={'sm'}
                    >
                        <p className={'font-inter text-white text-sm font-semibold leading-tight'}>전화번호 복사</p>
                    </Button>
                </div>
                <div className={'border-t-[1px] my-4 border-t-line'}/>
                <div className={'flex justify-between'}>
                    <div className={'w-[160px] flex flex-col'}>
                        <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                            정보
                        </p>
                        <p className={'mt-[9px] whitespace-pre-line text-line font-inter text-gray-900 text-sm font-normal leading-tight'}>
                            {info ?? '-'}
                        </p>
                    </div>
                    <div className={'w-[160px] flex flex-col'}>
                        <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                            운영시간
                        </p>
                        <div className={'mt-[9px]'}>
                            {
                                operatingTime?.map((value) => {
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
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FinylMainCard