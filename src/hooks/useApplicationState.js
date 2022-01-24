"use strict";
exports.__esModule = true;
var react_1 = require("react");
var store_1 = require("../store");
var useApplicationState = function () {
    var _a = (0, react_1.useContext)(store_1.CheckoutStore), state = _a.state, dispatch = _a.dispatch;
    var setApplicationStatus = function (newState) {
        dispatch({
            type: 'checkout/update',
            payload: newState
        });
    };
    return {
        data: state,
        updateApplicationState: setApplicationStatus
    };
};
exports["default"] = useApplicationState;
