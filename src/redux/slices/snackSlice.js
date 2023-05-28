import { createSlice } from '@reduxjs/toolkit'

export const snackSlice = createSlice({
  name: 'snack',
  initialState: {
    value: [false,"success","message"],
  },
  reducers: {
    snackOn: (state,param) => {
        const { payload } = param;
        const { type , message } = payload;
        state.value=[true,type,message];
    },
    snackOff: (state) => {
        state.value=[false,state.value[1],state.value[2]];
    },
  },
})

export const { snackOn,snackOff } = snackSlice.actions

export default snackSlice.reducer