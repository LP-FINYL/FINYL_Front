"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";
import Image from "next/image";
import FinylButton from "@/components/buttons/FinylButton";

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

const initStyle: string = 'absolute z-10 left-14 bottom-0 h-[752px] w-[456px] bg-white'

const FinylMainCard: NextPage<props> = ({title, image, description, tags, info, operatingTime}) => {

    useEffect(() => {

    }, [])

    return <div className={initStyle}>
        <div className={'flex flex-col w-full h-full'}>
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
                <p className={'underline decoration-solid underline-offset-1 font-black text-2xl'}>
                    {title}
                </p>
                <p className={'font-medium text-sm mt-[10px]'}>
                    {description}
                </p>
                <div className={'flex mt-6'}>
                    {
                        tags?.map((tag) => {
                            return <div key={tag} className={'mr-2'}>
                                <FinylButton key={tag} text={tag} disable size={'medium'} />
                            </div>
                        })
                    }
                </div>
                <div className={'border-t-[1px] my-4 border-t-line'}/>
                <div className={'flex justify-between'}>
                    <div className={'w-[160px] flex flex-col'}>
                        <p className={'font-black text-xl'}>
                            정보
                        </p>
                        <p className={'mt-[9px] whitespace-pre-line text-line font-normal '}>
                            {info ?? '-'}
                        </p>
                    </div>
                    <div className={'w-[160px] flex flex-col'}>
                        <p className={'font-black text-xl'}>
                            운영시간
                        </p>
                        <div className={'mt-[9px]'}>
                            {
                                operatingTime?.map((value) => {
                                    return <div className={'flex justify-between'} key={value.day}>
                                        <p className={'text-line font-normal'}>{value.day}</p>
                                        {
                                            value.time ? <p className={'w-[100px] text-line font-normal'}>{value.time}</p> : undefined
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