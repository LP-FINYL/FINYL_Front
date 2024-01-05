import {
    IconButton,
    Popover,
    PopoverArrow, PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger, Textarea
} from "@chakra-ui/react";
import {BsQuestionLg} from "react-icons/bs";
import {Icon} from "@chakra-ui/icons";
import {StarRating} from "@/components/Rating/StarRating";
import {useState} from "react";
import {Button} from "@chakra-ui/button";
import {slackFetch} from "@/api/api";
import {Input} from "@chakra-ui/input";
import {IoArrowBack} from "react-icons/io5";

const ReviewPopover = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [stars, setStars] = useState<number>(0)
    const [description, setDescription] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const postReview = async () => {
        const result = await slackFetch('reviews', "POST", {
            title, stars, description
        })
    }

    return <div className={'flex flex-col items-end'}>
        <div className={`bg-white mb-3 w-[292px] px-[21px] py-[52px]${isHidden ? ' hidden' : ''}`}>
            <div className={'flex w-full justify-between items-center mb-9'}>
                <div>
                    <p className={'text-gray-900 text-xl font-bold font-inter leading-normal'}>
                        Finyl 리뷰
                    </p>
                    <p className={'font-inter text-slate-600 text-sm font-normal leading-tight'}>
                        FINd your vinYL
                    </p>
                </div>
                <div className={'w-6 h-6 cursor-pointer'} onClick={() => {

                }}>
                    <Icon as={IoArrowBack} boxSize={6} />
                </div>
            </div>
            <div className={'flex flex-col gap-6'}>
                <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>
                    Finyl 사용 경험에 대한 의견을 주세요.
                </p>
                <div className={'w-full border border-t-1 border-t-gray-200'} />
                <div className={'flex flex-col gap-3'}>
                    <p className={'font-inter text-gray-900 text-sm font-bold leading-tight'}>평점</p>
                    <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>Finyl 사용 평점을 매겨주세요.</p>
                    <StarRating rating={stars} setRating={setStars} />
                </div>
                <div className={'flex flex-col gap-3'}>
                    <p className={'font-inter text-gray-900 text-sm font-bold leading-tight'}>기타항목</p>
                    <p className={'font-inter text-slate-500 text-sm font-normal leading-tight'}>Finyl에게 바라는 점이나 <br/>만족스러운 점을 적어주세요!</p>
                    <Textarea value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <p className={'font-inter text-gray-500 text-sm font-normal leading-tight'}>
                    감사합니다.<br/>
                    제공해주신 리뷰는<br/>
                    더 나은 서비스를 위해 활용됩니다. 🔧
                </p>
                <div className={'w-full flex justify-start items-center'}>
                    <Button size={'xs'} colorScheme={'blue'} className={'bg-black w-[61px] px-2'} onClick={() => postReview()}>제출</Button>
                </div>
            </div>
        </div>

        <div
            className={'flex bg-black rounded-full w-[120px] h-5 justify-center items-center border border-black cursor-pointer px-2'}
            onClick={() => setIsHidden(!isHidden)}
        >
            <p className={'font-inter text-white text-xs'}>
                Finyl 리뷰 남기기
            </p>
        </div>
    </div>
}

export {
    ReviewPopover
}