import { createSlice } from '@reduxjs/toolkit'

export const updateSlice = createSlice({
  name: 'update',
  initialState: {
    value: false,
  },
  reducers: {
    refresh: (state) => {
        state.value=!state.value;
    },
  },
})

export const { refresh } = updateSlice.actions

export default updateSlice.reducer