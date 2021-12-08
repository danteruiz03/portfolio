import activeComponent from "./activeComponent";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    activeComponent: activeComponent
});

export default rootReducer;