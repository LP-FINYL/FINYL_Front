"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {InputGroup, InputLeftElement, Input, InputRightElement, InputRightAddon} from "@chakra-ui/input";
import {Icon} from "@chakra-ui/icons";
import {BsSearch} from "react-icons/bs";
import {IoCloseCircle, IoSearch} from "react-icons/io5";
import {IconButton} from "@chakra-ui/react";

interface props {
    keyword: string
    setKeyword: (keyword: string) => void
    placeholder?: string
    onSearchEvent?: () => void
    isSearch?: boolean
    searchClearEvent?: () => void
}

const SearchBox: NextPage<props> = ({keyword, setKeyword, placeholder, onSearchEvent, isSearch, searchClearEvent}) => {
    const router = useRouter()

    return <div>
        <InputGroup className={'border-gray-400'}>
            <Input
                size={'md'}
                value={keyword}
                placeholder={placeholder ?? ''} onChange={e => {
                    setKeyword(e.target.value)
                }}
                onKeyDown={(e) => {
                    console.log(e.key)
                    if(e.key === 'Enter') {
                        onSearchEvent && onSearchEvent()
                    }

                    if(e.key === 'Escape') {
                        searchClearEvent && searchClearEvent()
                    }
                }}
            />
            <InputRightElement>
                {
                    isSearch && <Icon color={'gray.400'} className={'cursor-pointer'} as={IoCloseCircle} onClick={() => searchClearEvent && searchClearEvent()} />
                }
                {
                    !isSearch && <Icon className={'cursor-pointer'} as={IoSearch} onClick={() => onSearchEvent && onSearchEvent()} />
                }
            </InputRightElement>
        </InputGroup>
    </div>
}

export default SearchBox