export interface IUser {
    email: string,
    firstName: string,
    lastName: string,
    birthday: string,
    imgSrc: string,
    readyForJointTraining: boolean,
    sendNotification: boolean
}

export interface IAuth {
    email: string,
    password: string,
}

export interface IFeedback {
    id: string,
    fullName: null,
    imageSrc: null,
    message: null,
    rating: number,
    createdAt: string
}