import {NextPage} from "next";
import {Tag, TagCloseButton} from "@chakra-ui/react";

interface itemType {
    key: string
    value?: string
}

interface IProps {
    gap?: number
    initItems: Array<string>
    item: Array<string>
    setItem: (item: string | undefined) => void
}
const TagView:NextPage<IProps> = ({gap, initItems = [], item}) => {
    return <div className={`flex flex-col gap-[${gap ?? 18}px]`}>
        <div>
            <Tag size={'md'}>
                전체
                <TagCloseButton />
            </Tag>
        </div>
        <div className={'flex gap-[3px] '}>
            {
                initItems.filter((v, index) => v !== item[index]).map(v => <Tag key={v}>{v}</Tag>)
            }
        </div>
    </div>
}

export {
    TagView
}