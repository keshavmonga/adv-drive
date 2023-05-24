import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    value: false,
  },
  reducers: {
    loading: (state,param) => {
        const { payload } = param;
        state.value=payload;
    }
  },
})

export const { loading } = loaderSlice.actions

export default loaderSlice.reducer