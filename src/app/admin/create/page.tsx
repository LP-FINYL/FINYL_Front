"use client"
import {useEffect, useRef, useState} from "react";
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
import {adminFetch, formDataFetch} from "@/api/api";
import {useRouter} from "next/navigation"
import Image from "next/image";
import {checkToken} from "@/components/Functions/useFunctions";
import {Tag} from "@chakra-ui/react";
import {TagView} from "@/components/tag/TagView";
import {STORE_TAG_LIST} from "@/static/lib";

interface OTType {
    day: string
    time?: string
}

const tagsItems = ['신품 바이닐', '중고 바이닐', 'LP 바']

const Home = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const [insertData, setInsertData] = useState<cardType>({
        title: '',
    })
    const [operatorTime, setOperatorTime] = useState<Array<OTType>>([])
    const [inputOTData, setInputOTData] = useState<OTType>({day: '', time: ''})
    const [tagAllowList, setTagAllowList] = useState<Array<string | undefined>>([])

    useEffect(() => {
        if(!checkToken()){
            router.replace('/admin')
        }
    }, []);

    const setInsertDataKey = (key: string, changeData: string) => {
        setInsertData({
            ...insertData,
            [key]: changeData
        })
    }

    const postAdminCreate = async () => {
        const result = await adminFetch('adminCreate', "POST", {
            ...insertData,
            // tags: changeTagsListToString(tagAllowList),
            tags: tagAllowList.filter(v => v),
            operatorTime: JSON.stringify(operatorTime)
        })

        console.log('result', result)
        router.back()
    }

    const setAddress = (address: string, lat: number, lon: number) => {
        setInsertData({
            ...insertData,
            address: address,
            latitude: lat,
            longitude: lon
        })
    }

    const postImageUpload = async (formData: FormData) => {
        const result = await formDataFetch(
            'admin/imageUpload',
            "POST",
            formData
        )

        setInsertDataKey('image', result.publicUrl)
    }

    const handleClick = () => {
        fileRef?.current?.click()
    }

    const handleOnchange = (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        postImageUpload(formData)
    }

    const changeBooleanValue = (list: Array<boolean>, index: number) => {
        let tmpList = list
        tmpList[index] = !tmpList[index]
        return tmpList
    }

    const changeTagsListToString = (allowIndex: Array<boolean>) => {
        const result = allowIndex.map((allow, index) => allow ? tagsItems[index] : undefined).filter(v => v)

        return result.join(', ')
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
                <div className={'flex flex-col'}>
                    <div className={'flex mb-4 w-full h-auto overflow-x-auto'}>
                        <div className={'flex gap-2'}>
                            <div className={'h-24 w-24 rounded-small'}>
                                <div className={'absolute w-24 h-24 rounded-small'} >
                                    {
                                        insertData.image && <Image
                                            src={insertData.image}
                                            alt={insertData.image}
                                            fill
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        className={'w-full'}
                        onClick={handleClick}
                    >
                        이미지 추가
                    </Button>
                    <Input
                        ref={fileRef}
                        type={'file'}
                        className={'hidden'}
                        onChange={(e) => {
                            if(e.target?.files?.length) {
                                handleOnchange(e.target.files[0])
                            }
                        }}
                    />
                </div>
                <Spacer y={4} />
                <div>
                    <p className={'font-inter font-normal text-sm'}>
                        태그
                    </p>
                    <TagView item={tagAllowList} setItem={item => {
                        setTagAllowList(item)
                    }} initItems={STORE_TAG_LIST}/>
                </div>
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
                    label={'전화번호'}
                    labelPlacement={'outside'}
                    placeholder={'전화번호를 입력해주세요.'}
                    value={insertData.phone}
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">+82)</span>
                        </div>
                    }
                    onChange={(v) => {
                        setInsertDataKey('phone', v.target.value)
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