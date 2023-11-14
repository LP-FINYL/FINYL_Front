"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {MouseEventHandler, useState} from "react";
import Image from "next/image";
import {Skeleton} from "@chakra-ui/react";

interface props {
    store: storeInfoType,
    onClick: MouseEventHandler
}


const SummaryResultCard: NextPage<props> = ({store, onClick}) => {

    return <div className={'w-[248px] h-auto cursor-pointer'} onClick={onClick}>
        <div className={'w-[248px] h-[248px]'}>
            <div className={'relative w-[248px] h-[248px]'} >
                <Image
                    src={store.image ?? 'https://lh3.googleusercontent.com/p/AF1QipNziqUN_0xcqb5iKZw1wXZs9TbaJM0eaXbaA_3c=s680-w680-h510'}
                    alt={'FINYL'}
                    fill
                />
            </div>
        </div>
        <p className={'text-slate-600 text-xs font-normal font-inter leading-[18px] h-[18px]'}>{store.tags}</p>
        <p className={'text-gray-900 text-sm font-bold font-inter leading-tight'}>{store.title}</p>
    </div>
}

export default SummaryResultCard