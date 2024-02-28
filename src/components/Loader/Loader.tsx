import Lottie from "lottie-react"
import animation from '../../assets/loader.json'
import './styles.scss'

type Props = {
    className: string
}
export const Loader = ({ className }: Props) => {
    return (
        <Lottie data-test-id='loader' className={`loader ${className}`} animationData={animation} loop={true} />
    )
}
