"use client"
import {useEffect, useState} from "react";
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
    operatorTime?: Array<OTType>
}

const dummyData: Array<cardType> = [{
    id: '123123',
    title: '방레코드',
    address: '서울 마포구 토정로 16길 20 1층 제2호',
    tags: '중고 바이닐',
    info: '클래식 락 재즈 영화음악 중심의 중고 바이닐 및 CD 판매점',
    operatorTime: [{day: "월 - 금", time: "10:00 - 15:30"}, {day: "토", time: "13:00 - 17:30"}, {day: "일요일 정기휴무"}]
}]

const Home = () => {

    useEffect(() => {

    }, [])

    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-screen p-6">
            <div className={'flex justify-between py-6'}>
                <p className={'font-inter font-bold text-2xl'}>
                    STORE INFO
                </p>
                <Button color="primary">
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
                <TableBody items={dummyData}>
                    {
                        (item) => {
                            return <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.tags}</TableCell>
                                <TableCell>{item.info}</TableCell>
                                <TableCell>11:30~3:30</TableCell>
                                <TableCell><div className="relative flex items-center gap-2">
                                    <Tooltip content="수정">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="삭제">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div></TableCell>
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