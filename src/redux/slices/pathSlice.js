import { createSlice } from '@reduxjs/toolkit'

export const pathSlice = createSlice({
  name: 'path',
  initialState: {
    value: {
      path: [],
      pathName: []
    },
  },
  reducers: {
    updatePath: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
})

export const { updatePath } = pathSlice.actions

export default pathSlice.reducer