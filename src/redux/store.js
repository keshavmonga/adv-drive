import { configureStore } from '@reduxjs/toolkit'
import portalReducer from './slices/portalSlice'
import loaderReducer from './slices/loaderSlice'
import pathReducer from './slices/pathSlice'
import snackReducer from './slices/snackSlice'
import fetchedDataReducer from './slices/fetchedDataSlice'
import updateSliceReducer from './slices/updateSlice'
import selectedDataReducer from './slices/selectedDataSlice'

export default configureStore({
  reducer: {
    portal:portalReducer,
    loader:loaderReducer,
    path:pathReducer,
    snack:snackReducer,
    fetchedData:fetchedDataReducer,
    update:updateSliceReducer,
    selectedData:selectedDataReducer
  },
})