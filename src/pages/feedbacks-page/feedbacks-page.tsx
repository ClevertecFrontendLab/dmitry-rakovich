
import { Button, Form, Input, Modal, Rate } from "antd"
import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { Loader } from "@components/Loader/Loader"
import { feedbackSelector, userSelector } from "@redux/selectors"
import { FirstFeedback } from "@components/FirstFeedback"
import { StarTwoTone } from "@ant-design/icons"
import styles from './styles.module.scss'
import { fetchFeedbacks, sendFeedback } from "@redux/actions/feedback-actions"
import { Feedback } from "@components/Feedback"
import { SendFeedbackError } from "@components/SendFeedbackError"
import { SendFeedbackSuccess } from "@components/SendFeedbackSuccess"
import { GetFeedbackError } from "@components/GetFeedbackError"
import { signOut } from "@redux/slices/user-slice"
import { push } from "redux-first-history"
import { ROUTES } from "@constants/routes"

export const FeedbacksPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [feedbackError, setFeedbackError] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const feedbacks = useAppSelector(feedbackSelector)

    const postFeedback = async () => {
        const { rating, message } = form.getFieldsValue(['rating', 'message'])
        dispatch(sendFeedback({ rating, message, setIsError, setIsSuccess }))
        setIsOpen(false)
    }

    useEffect(() => {
        if (!user) {
            dispatch(signOut())
            dispatch(push(ROUTES.auth.main))
        }
        dispatch(fetchFeedbacks(setFeedbackError)).finally(() => setIsLoading(false));

    }, [user])

    return (
        <>
            <Loader className={isLoading ? 'visible' : ''} />
            {
                feedbacks.length > 0
                    ? <div className={styles.container}>
                        <div className={`${styles.feedback_list} ${isShow ? styles.open : ''}`}>{feedbacks.slice(0, 10).map(item => <Feedback key={item.id} {...item} />)}</div>
                        <div className={styles.footer}>
                            <Button data-test-id='write-review' onClick={() => setIsOpen(true)} type="default" className={styles.button}>Написать отзыв</Button>
                            <Button data-test-id='all-reviews-button' onClick={() => setIsShow(!isShow)} type="link" className={styles.button_link}>{isShow ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}</Button>
                        </div>
                    </div>
                    : <FirstFeedback setState={setIsOpen} />
            }
            <Modal centered open={isOpen} footer='' onCancel={() => setIsOpen(false)}>
                <Form className={styles.form}
                    form={form}
                    initialValues={{ rating: 0, message: '' }}
                >
                    <Form.Item
                        className={styles.form_item}
                    >
                        <h3 className={styles.title}>Ваш отзыв</h3>
                    </Form.Item>

                    <Form.Item
                        className={styles.rate_item}
                        name="rating"

                        rules={[{
                            required: true,
                            message: 'messages.required',
                        }]}
                    >
                        <Rate character={<StarTwoTone twoToneColor='#FAAD14' />} />
                    </Form.Item>
                    <Form.Item className={styles.message_item} name="message" >
                        <Input.TextArea placeholder="Расскажите, почему Вам понравилось наше приложение"></Input.TextArea>
                    </Form.Item>
                    <Form.Item className={styles.button_item}>
                        <Button data-test-id='new-review-submit-button' onClick={postFeedback} type="primary" className={styles.button}>Опубликовать</Button>
                    </Form.Item>
                </Form>
            </Modal>
            {feedbackError && <GetFeedbackError />}
            {isSuccess && <SendFeedbackSuccess setIsSuccess={setIsSuccess} />}
            {isError && <SendFeedbackError setIsError={setIsError} setIsOpen={setIsOpen} />}
        </>
    )
}