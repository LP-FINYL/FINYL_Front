import {NextPage} from "next";
import {Tag, TagCloseButton} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {isArray} from "@chakra-ui/utils";

interface itemType {
    key: string
    value?: string
}

interface IProps {
    gap?: number | string
    initItems: Array<string>
    item: Array<string | undefined>
    setItem: (item: Array<string | undefined>) => void
}
const TagView:NextPage<IProps> = ({gap, initItems = [], item, setItem}) => {
    const [selectTags, setSelectTags] = useState<Array<string | undefined>>([])

    useEffect(() => {
        if(!isArray(item)){
            setSelectTags([item])
        }else{
            setSelectTags(item)
        }
    }, [item]);

    const SelectTag = () => {
        const itemState = item.findIndex(v => v !== undefined)
        const itemAllState = item.findIndex(v => v === undefined)

        if(itemState === -1 || itemAllState === -1){
            return <Tag size={'md'}>
                전체
                <TagCloseButton />
            </Tag>
        }

        return initItems.map((tag, index) => {
            return tag === item[index] ? <Tag key={tag} size={'md'}>
                {tag}
                <TagCloseButton onClick={() => {
                    let tmpItems = item
                    tmpItems[index] = undefined
                    setItem([...tmpItems])
                }}/>
            </Tag> : <></>
        })
    }

    return <div className={`flex flex-col gap-${gap ?? '[18px]'}`}>
        <div className={'flex gap-[3px] flex-wrap'}>
            <SelectTag />
        </div>
        <div className={'flex gap-[3px]'}>
            {
                initItems.map((v, index) => {
                    return v !== item[index] ? <Tag
                        key={v}
                        className={'cursor-pointer'}
                        onClick={() => {
                            let tmpItems = item
                            tmpItems[index] = v
                            if(tmpItems.findIndex(v => v === undefined) === -1) {
                                setItem(new Array(initItems.length).fill(undefined))
                            }else {
                                setItem([...tmpItems])
                            }
                        }}
                    >
                        {v}
                    </Tag> : <></>
                })
            }
        </div>
    </div>
}

export {
    TagView
}