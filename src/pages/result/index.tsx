// import { AuthWrapper } from "@components/AuthWrapper"
// import styles from './styles.module.scss'
// import { Button } from "antd"
// import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
// import { push } from "redux-first-history"
// import { ReactNode, useEffect } from "react"
// import './icons.scss'
// import { ROUTES } from "@constants/routes"

// type Props = {
//     Icon: ReactNode,
//     title: string,
//     text: string,
//     buttonText: string,
//     route: string
// }

// export const Result: React.FC<Props> = ({ buttonText, Icon, text, title, route }) => {
//     const dispatch = useAppDispatch()
//     const goTo = () => {
//         dispatch(push(route))
//     }
//     const { user } = useAppSelector(state => state.user)
//     useEffect(() => {
//         if (user) dispatch(push(ROUTES.main))
//     }, [user])
//     return (
//         <AuthWrapper>
//             <div className={styles.form}>
//                 {Icon}
//                 <div>
//                     <h1 className={styles.title}>{title}</h1>
//                     <p className={styles.text}>{text}</p>
//                 </div>
//                 <Button
//                     type="primary"
//                     onClick={goTo}
//                     className={styles.button}
//                 >
//                     {buttonText}
//                 </Button>
//             </div>
//         </AuthWrapper>
//     )
// }