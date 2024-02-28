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