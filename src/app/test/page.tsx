import FinylButton from "@/components/buttons/FinylButton";

export default function Test() {
    return (
        <div>
            <FinylButton text={'small'} size={'small'} primaryColor />
            <FinylButton text={'medium'} size={'medium'} primaryColor />
            <FinylButton text={'large'} size={'large'} primaryColor />
            <FinylButton text={'small'} size={'small'} />
            <FinylButton text={'medium'} size={'medium'} />
            <FinylButton text={'large'} size={'large'} />
            <FinylButton text={'small'} size={'small'} primaryColor disable/>
            <FinylButton text={'medium'} size={'medium'} primaryColor disable/>
            <FinylButton text={'large'} size={'large'} primaryColor disable/>
            <FinylButton text={'small'} size={'small'} disable/>
            <FinylButton text={'medium'} size={'medium'} disable/>
            <FinylButton text={'large'} size={'large'} disable/>
        </div>
    )
}