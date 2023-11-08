import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {useDisclosure} from "@nextui-org/react";
import {Button, useClipboard} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {NextPage} from "next";
import {CopyIcon} from "@chakra-ui/icons";

interface props {
    text: string
    copyValue: string
}

const CopyModal: NextPage<props> = ({text, copyValue}) => {
    const { onCopy, value, setValue, hasCopied } = useClipboard("")

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

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
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                <p className={'font-inter text-white text-sm font-semibold leading-tight'}>{text}</p>
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>복사가 완료되었습니다.</ModalHeader>
                    <ModalFooter>
                        <Button color={'primary'} onClick={onClose}>확인</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export {CopyModal}