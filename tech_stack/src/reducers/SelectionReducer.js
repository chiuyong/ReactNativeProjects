//Reducer is always called with the state and the action
//set Initial State as null
//Cannot be undefined
export default (state = null, action) => {
  switch (action.type) {
    case 'select_library': 
      return action.payload;
    default:
      return state;
  }
};
