import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  //Key: Value
  //How this property will show up on my state object
  libraries: LibraryReducer,
  selectedLibraryId: SelectionReducer
});
