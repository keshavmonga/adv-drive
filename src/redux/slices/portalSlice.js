import { createSlice } from '@reduxjs/toolkit'

export const portalSlice = createSlice({
  name: 'portal',
  initialState: {
    value: {
      rename:false,
      create:false,
    },
  },
  reducers: {
    portalOff: (state) => {
        state.value={rename:false,create:false};
    },
    portalOn: (state,param) => {
      const { payload } = param;
      state.value={...payload};
  },
  },
})

export const { portalOff , portalOn } = portalSlice.actions

export default portalSlice.reducer