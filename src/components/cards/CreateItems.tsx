import {Input} from "@chakra-ui/input";
import {NextPage} from "next";

interface IProps {
    title: string
    description: string
    children?:any
}

const CreateItems: NextPage<IProps> = ({title, description, children}) => {
    return <div className={'flex flex-col gap-[9px]'}>
            <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>{title}</p>
            <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>{description}</p>
            {children}
        </div>
}

export { CreateItems }