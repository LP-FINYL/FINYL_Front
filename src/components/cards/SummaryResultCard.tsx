"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import SearchBox from "@/components/searchBox/SearchBox";
import {useState} from "react";
import Image from "next/image";
import {Skeleton} from "@chakra-ui/react";

interface props {

}


const SummaryResultCard: NextPage<props> = ({}) => {
    const router = useRouter()
    const [keyword, setKeyword] = useState<string>("")

    return <div className={'w-[248px] h-auto'}>
        <div className={'w-[248px] h-[248px]'}>
            <div className={'absolute w-[248px] h-[248px]'} >
                <Image
                    src={'https://lh3.googleusercontent.com/p/AF1QipNziqUN_0xcqb5iKZw1wXZs9TbaJM0eaXbaA_3c=s680-w680-h510'}
                    alt={'SMC'}
                    fill
                />
            </div>
        </div>
        <p className={'text-slate-600 text-xs font-normal font-inter leading-[18px] h-[18px]'}>중고 레코드샵</p>
        <p className={'text-gray-900 text-sm font-normal font-inter leading-tight'}>방레코드</p>
    </div>
}

export default SummaryResultCard