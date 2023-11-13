"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";

interface props {

}

const initStyle: string = 'absolute z-10 left-14 bottom-0 h-[800px] w-[393px] bg-white'

const SideTab: NextPage<props> = () => {
    const router = useRouter()

    return <div className={'absolute left-0 top-0 w-20 h-screen bg-white z-10'}>
        123123
    </div>
}

export default SideTab