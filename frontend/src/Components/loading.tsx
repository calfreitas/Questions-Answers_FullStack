
interface Props {
    label?: string;
    disabled: boolean
}
const Loading: React.FC<Props> = ({ label = "Loading...", disabled = false }) => {
    return (
        disabled
            ? <div
                data-test-id="loading"
                className="mt-4 p-2 h-full text-white items-center justify-center text-center"
            >
                {label}
            </div>
            : <></>
    )
}

export default Loading;