import { combineReducers } from 'redux';
import encuesSatisIlfornoReducer from './encues_satis_ilforno.slice';
import uiReducer from './ui.slice';

const rootReducer = combineReducers({
  encuesSatisIlforno: encuesSatisIlfornoReducer,
  ui: uiReducer
});

export default rootReducer;