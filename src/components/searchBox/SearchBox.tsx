"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {InputGroup, InputLeftElement, Input} from "@chakra-ui/input";
import {Icon} from "@chakra-ui/icons";
import {BsSearch} from "react-icons/bs";

interface props {
    keyword: string
    setKeyword: (keyword: string) => void
}

const SearchBox: NextPage<props> = ({keyword, setKeyword}) => {
    const router = useRouter()

    return <div>
        <InputGroup className={'border-gray-400'}>
            <InputLeftElement pointerEvents={'none'}>
                <Icon as={BsSearch} />
            </InputLeftElement>
            <Input
                size={'md'}
                value={keyword}
                placeholder={'Find your vinyl'} onChange={e => {
                    setKeyword(e.target.value)
                }}
            />
        </InputGroup>
    </div>
}

export default SearchBox