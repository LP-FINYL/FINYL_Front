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
import {Button} from "@nextui-org/react";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {adminFetch} from "@/api/api";
import {Pagination} from "@nextui-org/pagination";
import {getCookie, setCookie} from 'cookies-next';
import {checkToken} from "@/components/Functions/useFunctions";
import AdminHeader from "@/components/sideTab/AdminHeader";

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
    const [totalPage, setTotalPage] = useState<number>(1)
    const [page, setPage] = useState<number>(1);
    const [storeList, setStoreList] = useState<Array<cardType>>([])

    const router = useRouter()

    useEffect(() => {
        if(!checkToken()) return router.replace('/admin')

        getStoreEntireInfo(page)
    }, [page]);

    const getStoreEntireInfo = async (page: number) => {
        const result: pagenationType<cardType> = await adminFetch(`adminStoreEntireInfo?limit=10&page=${page}`, 'GET')

        setTotalPage(result.result.totalPages)
        setStoreList([...result.result.results])
    }

    const getStoreDelete = async (id: string) => {
        await adminFetch('adminDelete', 'POST', {
            id: id
        }).then(() => {
            getStoreEntireInfo(1)
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
          <AdminHeader />
        <div className="w-full h-screen p-6">
            <div className={'flex justify-between pb-6'}>
                <p className={'font-inter font-bold text-2xl'}>
                    STORE INFO
                </p>
                <Button color="primary" onClick={() => router.push('/admin/create')}>
                    생성
                </Button>
            </div>
            <Table
                aria-label="Example static collection table"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={totalPage}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
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