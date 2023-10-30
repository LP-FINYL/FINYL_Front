"use client"
import {useEffect, useState} from "react";
import {NextPage} from "next";

interface props {
    text?: string
    primaryColor?: boolean
    disable?: boolean
    size?: 'small' | 'medium' | 'large'
}

const initStyle: string = 'flex items-center justify-center h-8 rounded-full'
const initFont: string = 'font-inter text-[13px] font-bold'

const FinylButton: NextPage<props> = ({text, primaryColor, disable, size}) => {
    const [styles, setStyles] = useState<string>(initStyle)
    const [font, setFont] = useState<string>(initFont)

    useEffect(() => {
        let tmpStyles: string = `${initStyle} `
        let tmpFont: string = `${initFont} `
        switch (size) {
            case 'medium':
                tmpStyles += 'w-[96px] '
                break;
            case 'large':
                tmpStyles += 'w-[120px] '
                break;
            case 'small':
            default:
                tmpStyles += 'w-[72px] '
                break;
        }

        if(primaryColor){
            tmpStyles += `bg-primary ${!disable ? 'hover:bg-primaryHover cursor-pointer' : ''}`
            tmpFont += 'text-white'
        }else{
            tmpStyles += `bg-lightGray ${!disable ? 'hover:bg-lightGrayHover cursor-pointer' : ''}`
            tmpFont += 'text-black'
        }

        setStyles(tmpStyles)
        setFont(tmpFont)
    }, [size, disable, primaryColor])

    return <div className={styles}>
        <p className={font}>{text}</p>
    </div>
}

export default FinylButton