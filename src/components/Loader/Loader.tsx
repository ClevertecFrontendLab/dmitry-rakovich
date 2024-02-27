import Lottie from "lottie-react"
import animation from '../../assets/loader.json'
import './styles.scss'

export const Loader = () => {
    return (
        <Lottie data-test-id='loader' className="loader" animationData={animation} loop={true} />
    )
}
