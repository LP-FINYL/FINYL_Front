"use client"
import {useEffect, useState} from "react";
import {
    Button,
    Input,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip
} from "@nextui-org/react";
import DaumPost from "@/components/searchAddress/DaumPost";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {adminNoAuthFetch} from "@/api/api";

interface OTType {
    day: string
    time?: string
}

interface cardType {
    id?: string
    title: string
    image?: string
    address?: string
    site?: string
    instaUrl?: string
    tags?: string
    info?: string
    latitude?: number
    longitude?: number
    operatorTime?: Array<OTType>
}

const Home = () => {
    const [insertData, setInsertData] = useState<cardType>({
        title: '',
    })
    const [operatorTime, setOperatorTime] = useState<Array<OTType>>([])
    const [inputOTData, setInputOTData] = useState<OTType>({day: '', time: ''})

    const setInsertDataKey = (key: string, changeData: string) => {
        setInsertData({
            ...insertData,
            [key]: changeData
        })
    }

    const postAdminCreate = async () => {
        console.log('data', {
            ...insertData,
            operatorTime: JSON.stringify(operatorTime)
        })

        const result = await adminNoAuthFetch('adminCreate', "POST", {
            ...insertData,
            operatorTime: JSON.stringify(operatorTime)
        })

        console.log('result', result)
    }

    const setAddress = (address: string, lat: number, lon: number) => {
        setInsertData({
            ...insertData,
            address: address,
            latitude: lat,
            longitude: lon
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
            <div className={'flex justify-start py-6'}>
                <p className={'font-inter font-bold text-2xl'}>
                    STORE 등록
                </p>
            </div>
            <Spacer y={4} />
            <Input
                label={'매장명'}
                labelPlacement={'outside'}
                placeholder={'매장명을 입력해주세요.'}
                value={insertData.title}
                onChange={(v) => {
                    setInsertDataKey('title', v.target.value)
                }}
            />
            <Spacer y={4} />
            <div className={'flex items-end'}>
                <Input
                    label={'주소'}
                    labelPlacement={'outside'}
                    placeholder={'매장명을 입력해주세요.'}
                    disabled
                    value={insertData.address}
                />
                <DaumPost setAddress={setAddress} />
            </div>
            <Spacer y={4} />
            <Input
                label={'태그'}
                labelPlacement={'outside'}
                placeholder={'태그를 입력해주세요.'}
                value={insertData.tags}
                onChange={(v) => {
                    setInsertDataKey('tags', v.target.value)
                }}
            />
            <Spacer y={4} />
            <Input
                label={'사이트'}
                labelPlacement={'outside'}
                placeholder={'사이트를 입력해주세요.'}
                value={insertData.site}
                onChange={(v) => {
                    setInsertDataKey('site', v.target.value)
                }}
            />
            <Spacer y={4} />
            <Input
                label={'인스타'}
                labelPlacement={'outside'}
                placeholder={'인스타를 입력해주세요.'}
                value={insertData.instaUrl}
                onChange={(v) => {
                    setInsertDataKey('instaUrl', v.target.value)
                }}
            />
            <Spacer y={4} />
            <Input
                label={'매장 정보'}
                labelPlacement={'outside'}
                placeholder={'매장 정보를 입력해주세요.'}
                value={insertData.info}
                onChange={(v) => {
                    setInsertDataKey('info', v.target.value)
                }}
            />
            <Spacer y={4} />
            <div className={'flex flex-col justify-between py-6'}>
                <p className={'font-inter font-bold text-large'}>
                    운영시간
                </p>
                <div className={'flex items-center justify-center'}>
                    <Input
                        label={'요일'}
                        size={'sm'}
                        labelPlacement={'inside'}
                        value={inputOTData.day}
                        onChange={(v) => {
                            setInputOTData({...inputOTData, day: v.target.value})
                        }}
                    />
                    <Input
                        label={'시간 (옵션)'}
                        size={'sm'}
                        labelPlacement={'inside'}
                        onChange={(v) => {
                            setInputOTData({...inputOTData, time: v.target.value})
                        }}
                    />
                    <Button color="primary" onClick={() => {
                        setOperatorTime([...operatorTime, inputOTData])
                        setInputOTData({day: '', time: ''})
                    }}>
                        추가
                    </Button>
                </div>
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>요일</TableColumn>
                    <TableColumn>시간</TableColumn>
                    <TableColumn> </TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        operatorTime.map((item) => {
                            return <TableRow key={item.day}>
                                <TableCell className={'w-[50%]'}>{item.day}</TableCell>
                                <TableCell className={'w-[50%]'}>{item.time}</TableCell>
                                <TableCell><div className="relative flex items-center gap-2">
                                    <Button
                                        color="danger"
                                        onClick={() => {
                                            if(operatorTime.length <= 1) {
                                                setOperatorTime([{day: ''}])
                                            }else {
                                                let tmpList = [...operatorTime]
                                                setOperatorTime([...tmpList])
                                            }
                                        }}
                                        isIconOnly
                                    >
                                        <DeleteIcon color={'white'}/>
                                    </Button>
                                </div></TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
            <Spacer y={4} />
            <Button
                className={'w-full'}
                color={'primary'}
                onClick={() => postAdminCreate()}
            >
                등록하기
            </Button>
        </div>
      </div>
    )
}


 export default Home