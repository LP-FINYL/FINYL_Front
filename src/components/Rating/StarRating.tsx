import {NextPage} from "next";
import {Icon} from "@chakra-ui/icons";
import {FaStar} from "react-icons/fa";

interface IProps {
    rating: number
    setRating: (rating: number) => void
}

const StarRating: NextPage<IProps> = ({rating, setRating}) => {
    return <div className={'flex gap-3'}>
        {
            [...Array(5)].map((star, index) => {
                const ratingValue = index+1
                return <Icon
                    className={'cursor-pointer'}
                    key={index}
                    as={FaStar}
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    onClick={() => {
                        setRating(ratingValue)
                    }}
                />
            })
        }
    </div>
}

export {
    StarRating
}