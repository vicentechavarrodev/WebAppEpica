import initialState from './initial_state';
import { LateralBarConstants } from './constant';

export function lateralBarReducer(state = initialState.lateral_bar, action) {
    switch (action.type) {

        case LateralBarConstants.LATERAL_BAR_ACTIVE: {
            return {
                ...state, menuLateralVisible: action.menuLateralVisible
            }

        }


        case LateralBarConstants.GET_FORMULARIOS: {
            return {
                ...state, formularios: action.formularios
            }

        }
        

        default: return state;
    }
}