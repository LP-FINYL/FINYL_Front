"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {InputGroup, InputLeftElement, Input, InputRightElement} from "@chakra-ui/input";
import {Icon} from "@chakra-ui/icons";
import {BsSearch} from "react-icons/bs";
import {IoSearch} from "react-icons/io5";

interface props {
    keyword: string
    setKeyword: (keyword: string) => void
    placeholder?: string
    onSearchEvent?: () => void
}

const SearchBox: NextPage<props> = ({keyword, setKeyword, placeholder, onSearchEvent}) => {
    const router = useRouter()

    return <div>
        <InputGroup className={'border-gray-400'}>
            <InputRightElement pointerEvents={'none'}>
                <Icon as={IoSearch} />
            </InputRightElement>
            <Input
                size={'md'}
                value={keyword}
                placeholder={placeholder ?? ''} onChange={e => {
                    setKeyword(e.target.value)
                }}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        onSearchEvent && onSearchEvent()
                    }
                }}
            />
        </InputGroup>
    </div>
}

export default SearchBox