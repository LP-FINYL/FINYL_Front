"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {Icon} from "@chakra-ui/icons";
import finyl_logo from '@/static/images/finyl_logo.png'
import Image from "next/image";

interface props {

}

const initStyle: string = 'absolute z-10 left-14 bottom-0 h-[800px] w-[393px] bg-white'

const SideTab: NextPage<props> = () => {
    const router = useRouter()

    return <div className={'absolute left-0 top-0 w-20 h-screen bg-white z-10 border-r border-gray-200'}>
        <div className={'pt-6 px-3'}>
            <Image
                src={finyl_logo}
                alt={'finyl_logo'}
                width={69}
                height={37}
            />
        </div>
    </div>
}

export default SideTab