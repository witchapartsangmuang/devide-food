import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './pages/MainPage'
import { store } from './stores/index.js'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <Main />
    </Provider>
  // </React.StrictMode>
)