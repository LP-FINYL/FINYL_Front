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

const ReviewPopover = () => {
    const [stars, setStars] = useState<number>(0)
    const [description, setDescription] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const postReview = async () => {
        const result = await slackFetch('reviews', "POST", {
            title, stars, description
        })
    }

    return <div className={'absolute z-10 right-6 bottom-6'}>
        <Popover placement={"top-end"} returnFocusOnClose >
            <PopoverTrigger>
                <div
                    className={'flex bg-white rounded-full w-10 h-10 justify-center items-center border border-black cursor-pointer'}
                >
                    <Icon as={BsQuestionLg} color={'black'} />
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <div>
                        <p>별점</p>
                        <StarRating rating={stars} setRating={setStars} />
                        <p>제목</p>
                        <div>
                            <Input value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <p>리뷰</p>
                        <div>
                            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className={'w-full flex justify-end items-center'}>
                            <Button onClick={() => postReview()}>보내기</Button>
                        </div>
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </div>
}

export {
    ReviewPopover
}