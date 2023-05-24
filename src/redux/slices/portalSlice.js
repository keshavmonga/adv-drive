import { createSlice } from '@reduxjs/toolkit'

export const portalSlice = createSlice({
  name: 'portal',
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
        state.value=!state.value;
    },
  },
})

export const { toggle } = portalSlice.actions

export default portalSlice.reducer