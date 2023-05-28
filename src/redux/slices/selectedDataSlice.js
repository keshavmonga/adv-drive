import { createSlice } from '@reduxjs/toolkit'

export const selectedDataSlice = createSlice({
  name: 'selectedData',
  initialState: {
    value: {did:'',ext:''},
  },
  reducers: {
    updateSelectedData: (state,param) => {
        const { payload } = param;
        state.value=payload;
    }
  },
})

export const { updateSelectedData } = selectedDataSlice.actions

export default selectedDataSlice.reducer