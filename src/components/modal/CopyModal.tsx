import { useToast } from '@chakra-ui/react'
import {Button, useClipboard} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {NextPage} from "next";
import {CopyIcon} from "@chakra-ui/icons";

interface props {
    text: string
    copyValue: string
}

const CopyModal: NextPage<props> = ({text, copyValue}) => {
    const toast = useToast()
    const { onCopy, value, setValue, hasCopied } = useClipboard("")

    useEffect(() => {
        setValue(copyValue)
    }, [copyValue]);

    return (
        <>
            <Button
                className={'bg-slate-400 mr-[9px]'}
                colorScheme={'pink'}
                variant={'solid'}
                leftIcon={<CopyIcon />}
                size={'sm'}
                onClick={() => {
                    onCopy()

                    toast({
                        title: "복사되었습니다.",
                        duration: 2000,
                        status: 'success'
                    })
                }}
            >
                <p className={'font-inter text-white text-sm font-semibold leading-tight'}>{text}</p>
            </Button>
        </>
    )
}

export {CopyModal}