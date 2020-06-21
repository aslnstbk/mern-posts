import { CommentsAPI } from "../../api"
import { getComments, addComment } from "../actions/commentsActions"

export const getCommentsThunk = () => async dispatch => {
    const data = await CommentsAPI.get()

    return dispatch(getComments(data))
}

export const createCommentThunk = (comment, postId, token) => async dispatch => {
    const data = await CommentsAPI.create(comment, postId, token)

    return dispatch(addComment(data))
}