import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import './scss/App.css'
import { FirebaseContextProvider } from '@FireContext'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FirebaseContextProvider>
  </React.StrictMode>,
)
