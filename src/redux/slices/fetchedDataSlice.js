import { createSlice } from '@reduxjs/toolkit'

export const fetchedDataSlice = createSlice({
  name: 'fetchedData',
  initialState: {
    value: [],
  },
  reducers: {
    refreshData: (state,param) => {
        const { payload } = param;
        state.value=payload;
    }
  },
})

export const { refreshData } = fetchedDataSlice.actions

export default fetchedDataSlice.reducer