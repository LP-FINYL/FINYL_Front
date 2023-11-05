// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import {NextUIProvider} from "@nextui-org/react";

export function Providers({
                              children
                          }: {
    children: React.ReactNode
}) {
    return (
        <NextUIProvider>
            <CacheProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </NextUIProvider>
    )
}