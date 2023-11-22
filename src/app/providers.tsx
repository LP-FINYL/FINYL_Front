// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import {NextUIProvider} from "@nextui-org/react";
import {SearchProvider} from "@/context/SearchProvider";
import {createElement} from "react";

const AppProvider = ({ contexts , children }: any) => contexts.reduce(
    // eslint-disable-next-line react/no-children-prop
    (prev: any, context: any) => createElement(context, {
        children: prev
    }),
    children
)

export function Providers({
                              children
                          }: {
    children: React.ReactNode
}) {

    return (
        <AppProvider contexts={[SearchProvider]}>
            <NextUIProvider>
                <CacheProvider>
                    <ChakraProvider>
                        {children}
                    </ChakraProvider>
                </CacheProvider>
            </NextUIProvider>
        </AppProvider>
    )
}