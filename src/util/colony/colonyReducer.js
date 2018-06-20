const initialState = {
  colonyInstance: null
}

const colonyReducer = (state = initialState, action) => {
  if (action.type === 'COLONY_INITIALIZED')
  {
    return Object.assign({}, state, {
      colonyInstance: action.payload.colonyInstance
    })
  }

  return state
}

export default colonyReducer
