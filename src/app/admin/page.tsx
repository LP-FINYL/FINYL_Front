"use client"
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell, Tooltip
} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {adminNoAuthFetch} from "@/api/api";

interface OTType {
    day: string
    time?: string
}

interface cardType {
    id: string
    title: string
    image?: string
    address?: string
    tags?: string
    info?: string
    operatorTime?: string
}

const Home = () => {
    const router = useRouter()
    const [storeList, setStoreList] = useState<Array<cardType>>([])

    useEffect(() => {
        getStoreEntireInfo()
    }, [])

    const getStoreEntireInfo = async () => {
        const result = await adminNoAuthFetch('adminStoreEntireInfo', 'GET')

        setStoreList([...result])
    }

    const getStoreDelete = async (id: string) => {
        await adminNoAuthFetch('adminDelete', 'POST', {
            id: id
        }).then(() => {
            getStoreEntireInfo()
        })
    }

    const operatorTimeConvert = (ot?: Array<OTType>) => {
        let otString: string = '-'

        if(ot && ot.length){
            otString = `${ot[0].day} ${ot[0].time ? `: ${ot[0].time}` : ''}`
        }

        return otString
    }

    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-screen p-6">
            <div className={'flex justify-between py-6'}>
                <p className={'font-inter font-bold text-2xl'}>
                    STORE INFO
                </p>
                <Button color="primary" onClick={() => router.push('/admin/create')}>
                    생성
                </Button>
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>매장명</TableColumn>
                    <TableColumn>주소</TableColumn>
                    <TableColumn>태그</TableColumn>
                    <TableColumn>정보</TableColumn>
                    <TableColumn>운영시간</TableColumn>
                    <TableColumn> </TableColumn>
                </TableHeader>
                <TableBody items={storeList}>
                    {
                        (item) => {
                            return <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.tags}</TableCell>
                                <TableCell>{item.info}</TableCell>
                                <TableCell>
                                    {
                                        item.operatorTime ? operatorTimeConvert(JSON.parse(item.operatorTime)) : "-"
                                    }
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Button
                                            isIconOnly
                                            onClick={() => {
                                                router.push(`/admin/update/${item.id}`)
                                            }}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            color="danger"
                                            isIconOnly
                                            onClick={() => {
                                                getStoreDelete(item.id)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        }
                    }
                </TableBody>
            </Table>
        </div>
      </div>
    )
}


 export default Home