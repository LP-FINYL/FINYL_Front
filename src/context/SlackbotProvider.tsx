import {createContext, useEffect, useState} from "react";
import {NextPage} from "next";

interface IGlobalContext {
    isOpen?: boolean
    type: 'create' | 'update' | 'delete'
    updateId?: string
}

interface ContextType extends IGlobalContext {
    setSlackbotContext: (value: IGlobalContext) => void
    setUpdateId: (id: string) => void
}

interface IProps {
    children: React.ReactNode
}

export const SlackbotContext = createContext<ContextType>({
    type: 'create',
    setSlackbotContext: () => {},
    setUpdateId: () => {}
})

const SlackbotProvider: NextPage<IProps> = ({children}) => {
    const [context, setContext] = useState<IGlobalContext>({type: 'create'})

    useEffect(() => {

    }, []);

    const setSlackbotContext = (value: IGlobalContext) => {
        setContext({...context, ...value})
    }

    const setUpdateId = (id: string) => {
        setContext({...context, updateId: id})
    }

    return <SlackbotContext.Provider
        value={{
            ...context,
            setSlackbotContext,
            setUpdateId
        }}
    >
        {children}
    </SlackbotContext.Provider>
}

export {
    SlackbotProvider
}