import { alertConstants } from './constants';

const initialState = { type: '',message: '',show: false, title:''};

export function alerts(state = initialState, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message,
                show: action.show,
                title: action.title
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message,
                show: action.show,
                title: action.title
            };
        case alertConstants.SHOW:
            return {
                type: 'alert-info',
                message: action.message,
                show: action.show,
                title: action.title
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}