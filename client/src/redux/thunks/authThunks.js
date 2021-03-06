import { setAuthError, authLogin, authLogout, setAuthStorage } from "../actions/authActions"
import { AuthAPI } from "../../api"
import { clearData } from "../actions/postsActions"

const storageName = 'userData'

// Get Token and UserId from localStorage
export const getAuthStorageThunk = () => dispatch => {
    const data = JSON.parse(localStorage.getItem(storageName))
    
    if(data && data.token){
        console.log(data.message)
        return dispatch(setAuthStorage(data.token, data.userId))
    }
}

// Login admin POST /api/auth/login
export const authLoginThunk = userData => async dispatch => {
    const data = await AuthAPI.login(userData)

    if(data && data.message){
        console.log(data.message)
        return dispatch(setAuthError(data.message))
    }
    
    localStorage.setItem(storageName, JSON.stringify({ token: data.token, userId: data.userId }))
    
    dispatch(authLogin())
}

// Logout user
export const authLogoutThunk = () => dispatch => {
    localStorage.removeItem(storageName)

    dispatch(authLogout())
    dispatch(clearData())
}

// Register POST /api/auth/register
export const authRegisterThunk = userData => async dispatch => {
    const data = await AuthAPI.register(userData)

    if(data && data.message){
        console.log(data.message)
        return dispatch(setAuthError(data.message))
    }

    return dispatch(authLoginThunk({ email: userData.email, password: userData.password }))
}