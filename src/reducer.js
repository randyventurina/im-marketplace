import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from 'userReducer'
import web3Reducer from 'util/web3/web3Reducer'
import colonyReducer from 'util/colony/colonyReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  colony: colonyReducer
})

export default reducer
