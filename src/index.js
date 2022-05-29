import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import loadable from '@loadable/component'
import { Provider } from 'mobx-react'
import { setupAxiosInterceptors } from './utils'
import { persist } from './utils/persist.js'
import { stores } from './stores/domain'
import { ToastContainer } from 'react-toastify'
import './index.scss'
import IntlProviderWrapper from './IntlProviderWrapper'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components'
const App = loadable(() => import('./App'))

persist('authStore', stores.authStore, {
  storage: localStorage,
  whitelist: [{ key: '_user', crypt: true }, { key: '_isAuth' }, { key: '_loginTries' }, { key: '_userName' }],
})

persist('appStore', stores.appStore, {
  storage: localStorage,
  whitelist: [{ key: '_currentLanguage' }],
})

setupAxiosInterceptors(stores.appStore, stores.authStore)

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider {...stores}>
    <BrowserRouter>
      <IntlProviderWrapper>
        <Routes>
          <Route
            path="/*"
            element={
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            }
          />
        </Routes>
      </IntlProviderWrapper>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
