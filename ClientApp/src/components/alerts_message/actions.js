import { alertConstants } from './constants';

export const alertActions = {
    success,
    error,
    showMessage,
    clear
};

function success(message, show, title) {
    return { type: alertConstants.SUCCESS, message , show, title };
}
function showMessage(message, show, title) {
    return { type: alertConstants.SHOW, message, show , title};
}

function error(message, show, title) {
    return { type: alertConstants.ERROR, message, show, title};
}

function clear() {
    return { type: alertConstants.CLEAR };
}