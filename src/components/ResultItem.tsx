import {NextPage} from "next";
import {IconButton, Skeleton} from "@chakra-ui/react";
import Image from "next/image";
import {IoChevronForward} from "react-icons/io5";
import {Icon} from "@chakra-ui/icons";

interface props {
    store: storeInfoType
    onClick?: () => void
}

const ResultItem: NextPage<props> = ({store, onClick}) => {

    const addressConvert = (address: string) => {
        const addressList = address.split(' ')

        return `${addressList[0]}${addressList[1] ? ` ${addressList[1]}` : ""}`
    }

    return <div className={'flex justify-between border-y border-gray-200 w-full py-3 cursor-pointer'} onClick={onClick}>
        <div className={'relative w-[78px] h-[78px]'} >
            <Image
                src={store.image ?? 'https://lh3.googleusercontent.com/p/AF1QipNziqUN_0xcqb5iKZw1wXZs9TbaJM0eaXbaA_3c=s680-w680-h510'}
                alt={'SMC'}
                fill
            />
        </div>
        <div className={'flex flex-col items-start justify-center w-[138px] ml-2 gap-[3px]'}>
            <p className={'font-inter text-gray-900 text-sm font-bold'}>{store.title}</p>
            <p className={'font-inter text-gray-900 text-xs font-normal'}>{addressConvert(store.address ?? '서울 마포구')}</p>
            <p className={'font-inter text-slate-500 text-xs font-normal'}>{store.tags}</p>
        </div>
        <div className={'flex items-center'}>
            <Icon
                aria-label={''}
                as={IoChevronForward}
                color={'gray.400'}
                fontSize={24}
            />
        </div>
    </div>
}

export default ResultItem