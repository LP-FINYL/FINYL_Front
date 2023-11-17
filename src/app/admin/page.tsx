"use client"
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {authFetch} from "@/api/api";
import {useRouter} from "next/navigation";

import {getCookie, setCookie} from 'cookies-next';

interface loginInfoType {
    id: string
    password: string
}

const Home = () => {
    const router = useRouter()

    const [loginInfo, setLoginInfo] = useState<loginInfoType>({
        id: '',
        password: ''
    })
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
        if(e.key === 'Enter'){
            login(loginInfo)
        }
    }

    const login = async (loginInfo: loginInfoType) => {
        const result = await authFetch('login', "POST", loginInfo)

        if(result.success){
            setCookie('accessToken', result.token)
            router.push('/admin/dashboard')
        }
    }

    return (
      <div className="w-full h-screen flex justify-center items-center">
          <div className={'flex flex-col justify-center items-center gap-3'}>
              <p className={'font-inter font-black text-xl'}>ADMIN LOGIN</p>
              <Input
                  labelPlacement={'outside'}
                  label={'ID'}
                  placeholder={'ID를 입력해 주세요.'}
                  onKeyDown={onKeyDownEnter}
                  value={loginInfo.id}
                  onChange={(e) => setLoginInfo({
                      ...loginInfo,
                      id: e.target.value
                  })}
              />
              <Input
                  labelPlacement={'outside'}
                  label={'PW'}
                  placeholder={'PW를 입력해 주세요.'}
                  endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                      </button>
                  }
                  type={isVisible ? "text" : "password"}
                  onKeyDown={onKeyDownEnter}
                  value={loginInfo.password}
                  onChange={(e) => setLoginInfo({
                      ...loginInfo,
                      password: e.target.value
                  })}
              />
              <Button className={'w-full mt-10'} color={'primary'} type="button" onClick={() => login(loginInfo)}>
                  <p>Login</p>
              </Button>
          </div>
      </div>
    )
}


 export default Home