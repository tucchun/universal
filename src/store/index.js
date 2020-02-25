import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import homeReducer from './home/index'
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer
})

// const store = createStore(reducer, applyMiddleware(thunk))
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
  const defaultState = window.context ? window.context.state: {}
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}

export default () => createStore(reducer, applyMiddleware(thunk))
