import { RootState } from "@redux/configure-store";

export const userSelector = (state: RootState) => state.user.user
export const authDataSelector = (state: RootState) => state.user.authData