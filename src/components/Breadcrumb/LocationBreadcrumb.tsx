import {Breadcrumb, BreadcrumbItem, Select, Tag, TagCloseButton} from "@chakra-ui/react";
import {locations} from "@/static/locations/locations";
import {useState} from "react";
import {NextPage} from "next";

interface IProps {
    isSearch?: boolean
    getSearch?: (address: string) => void
    focusIndex?: number | undefined
    setFocusIndex?: (index: number) => void
    country: string
    city: string
}

const LocationBreadcrumb: NextPage<IProps> = ({isSearch, getSearch, focusIndex, setFocusIndex, country, city}) => {
    const onClickBreadcrumb = (index: number) => {
        setFocusIndex && setFocusIndex(index)
    }

    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <div className={`${isSearch ? " cursor-pointer" : ""}`} onClick={() => onClickBreadcrumb(0)}>
                    <p className={`font-inter text-slate-500 text-sm leading-tight${focusIndex === 0 ? " font-bold" : " font-normal"}`}>
                        {country}
                    </p>
                </div>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <div className={`${isSearch ? " cursor-pointer" : ""}`} onClick={() => onClickBreadcrumb(1)}>
                    <p className={`font-inter text-slate-500 text-sm leading-tight${focusIndex === 1 ? " font-bold" : " font-normal"}`}>
                        {city}
                    </p>
                </div>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export {
    LocationBreadcrumb
}