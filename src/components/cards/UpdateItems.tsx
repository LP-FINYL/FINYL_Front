import {Input} from "@chakra-ui/input";
import {NextPage} from "next";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";

interface IProps {
    title: string
    description: string
    children?:any
}

const UpdateItems: NextPage<IProps> = ({title, description, children}) => {
    return <AccordionItem>
        <AccordionButton>
            <Box flex={'1'} className={'flex flex-col gap-[9px] justify-start text-start'}>
                <p className={'font-inter font-bold text-sm text-gray-900 leading-tight'}>{title}</p>
                <p className={'font-inter font-normal text-sm text-slate-500 leading-tight'}>{description}</p>
            </Box>
            <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
            {children}
        </AccordionPanel>
    </AccordionItem>
}

export { UpdateItems }