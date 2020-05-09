import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  comments: [],
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getComments: state => {
      state.loading = true
    },
    getCommentsSuccess: (state, { payload }) => {
      state.comments = payload
      state.loading = false
      state.hasErrors = false
    },
    getCommentsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const {
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
} = commentsSlice.actions
export const commentsSelector = state => state.comments
export default commentsSlice.reducer

export function fetchComments(postId) {
  return async dispatch => {
    dispatch(getComments())

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      )
      const data = await response.json()

      dispatch(getCommentsSuccess(data))
    } catch (error) {
      dispatch(getCommentsFailure())
    }
  }
}
