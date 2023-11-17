"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {Button} from "@nextui-org/react";

import {deleteCookie, setCookie} from 'cookies-next';
import {authFetch} from "@/api/api";

interface loginInfoType {
    id: string
    password: string
}

interface props {

}

const initStyle: string = 'absolute z-10 left-14 bottom-0 h-[800px] w-[393px] bg-white'

const AdminHeader: NextPage<props> = () => {
    const router = useRouter()

    const logout = async () => {
        const result = await authFetch('logout', "POST")

        if(result.success){
            deleteCookie('accessToken')
            router.replace('/admin')
        }
    }

    return <div className={'flex justify-end w-full h-20 bg-white p-3'}>
        <Button onClick={() => logout()}>
            LOG OUT
        </Button>
    </div>
}

export default AdminHeader