import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

export const history = createHistory()
const loggerMiddleware = createLogger()

const sagaMiddleware = createSagaMiddleware()
const initialState = {}
const enhancers = []

const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
  loggerMiddleware
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store