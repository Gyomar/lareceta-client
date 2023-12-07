import { combineReducers } from 'redux';
import encuesSatisIlfornoReducer from '@reducers/encues_satis_ilforno.slice';
import uiReducer from '@reducers/ui.slice';


const rootReducer = combineReducers({
  encuesSatisIlforno: encuesSatisIlfornoReducer,
  ui: uiReducer,
});

export default rootReducer;