"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("../api");
var store_1 = require("../store");
var utils_1 = require("../utils");
var shared_1 = require("./shared");
var emptyAddress = {
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    city: '',
    province: '',
    country_code: '',
    province_code: '',
    postal_code: '',
    business_name: '',
    phone_number: ''
};
/**
 * @param {string[]} requiredAddressFields
 */
var useBillingAddress = function (requiredAddressFields) {
    var _a, _b;
    var _c = (0, react_1.useContext)(store_1.CheckoutStore), state = _c.state, dispatch = _c.dispatch, onError = _c.onError;
    var token = state.token, apiPath = state.apiPath;
    var billingAddress = state.applicationState.addresses.billing;
    var billingAddressErrors = state.errors.billingAddress;
    var billingAddressLoadingStatus = state.loadingStatus.billingAddress;
    var countryInfo = state.initialData.country_info;
    var billingSameAsShipping = state.orderInfo.billingSameAsShipping;
    var shippingAddress = (_b = (_a = state.applicationState) === null || _a === void 0 ? void 0 : _a.addresses) === null || _b === void 0 ? void 0 : _b.shipping;
    var memoizedBillingAddress = (0, react_1.useMemo)(function () { return (billingAddress); }, [JSON.stringify(billingAddress), billingSameAsShipping]);
    var memoizedBillingAddressErrors = (0, react_1.useMemo)(function () { return billingAddressErrors; }, [JSON.stringify(billingAddressErrors)]);
    var memoizedRequiredAddressFields = (0, react_1.useMemo)(function () { return requiredAddressFields; }, [JSON.stringify(requiredAddressFields)]);
    var memoizedCountryInfo = (0, react_1.useMemo)(function () { return countryInfo; }, []); // country info never changes, so no need to update it
    var memoizedShippingAddress = (0, react_1.useMemo)(function () { return shippingAddress; }, [JSON.stringify(shippingAddress)]);
    var submitBillingAddress = (0, react_1.useCallback)(function (billingAddressData) { return __awaiter(void 0, void 0, void 0, function () {
        var requiredAddressFieldErrors, appShipping, localShipping, countryData, country, provinceData, province, completeAddress, response, error, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (billingSameAsShipping)
                        return [2 /*return*/, Promise.resolve()];
                    if (requiredAddressFields) {
                        requiredAddressFieldErrors = (0, shared_1.requiredAddressFieldValidation)(billingAddressData, memoizedRequiredAddressFields);
                        if (requiredAddressFieldErrors) {
                            dispatch({
                                type: 'checkout/billingAddress/setErrors',
                                payload: requiredAddressFieldErrors
                            });
                            return [2 /*return*/, Promise.reject(new utils_1.PromiseError('Required fields missing data', { errors: requiredAddressFieldErrors }))];
                        }
                    }
                    if (!billingAddressData || !billingAddressData.country_code) {
                        dispatch({
                            type: 'checkout/billingAddress/setErrors',
                            payload: [{
                                    field: 'country',
                                    message: 'Country is required'
                                }]
                        });
                        return [2 /*return*/, Promise.reject(new utils_1.PromiseError('Country is required', {
                                errors: [
                                    {
                                        field: 'country',
                                        message: 'Country is required'
                                    },
                                ]
                            }))];
                    }
                    appShipping = JSON.stringify(__assign(__assign({}, emptyAddress), memoizedShippingAddress));
                    localShipping = JSON.stringify(__assign(__assign({}, emptyAddress), billingAddressData));
                    // Prevent user from submitting shipping address that is already in app state
                    if (appShipping === localShipping) {
                        if (memoizedBillingAddressErrors && Object.keys(memoizedBillingAddressErrors).length > 0) {
                            return [2 /*return*/, dispatch({
                                    type: 'checkout/billingAddress/set'
                                })];
                        }
                        return [2 /*return*/, Promise.resolve()];
                    }
                    countryData = memoizedCountryInfo.find(function (data) { return data.iso_code === billingAddressData.country_code; });
                    country = countryData === null || countryData === void 0 ? void 0 : countryData.name;
                    if ((countryData === null || countryData === void 0 ? void 0 : countryData.show_province) && !billingAddressData.province_code) {
                        dispatch({
                            type: 'checkout/billingAddress/setErrors',
                            payload: [{
                                    field: 'province',
                                    message: 'Province is required'
                                }]
                        });
                        return [2 /*return*/, Promise.reject(new utils_1.PromiseError('Province is required', {
                                errors: [
                                    {
                                        field: 'province',
                                        message: 'Province is required'
                                    },
                                ]
                            }))];
                    }
                    if ((countryData === null || countryData === void 0 ? void 0 : countryData.show_postal_code) && !billingAddressData.postal_code) {
                        dispatch({
                            type: 'checkout/billingAddress/setErrors',
                            payload: [{
                                    field: 'postal_code',
                                    message: 'Postal code is required'
                                }]
                        });
                        return [2 /*return*/, Promise.reject(new utils_1.PromiseError('Postal code is required', {
                                errors: [
                                    {
                                        field: 'postal_code',
                                        message: 'Postal code is required'
                                    },
                                ]
                            }))];
                    }
                    provinceData = countryData === null || countryData === void 0 ? void 0 : countryData.provinces.find(function (data) { return data.iso_code === billingAddressData.province_code; });
                    if (!provinceData) {
                        dispatch({
                            type: 'checkout/billingAddress/setIncomplete'
                        });
                        return [2 /*return*/, Promise.reject(new utils_1.PromiseError('Address is incomplete', {
                                errors: [
                                    {
                                        field: 'shipping_address',
                                        message: 'Address is incomplete'
                                    },
                                ]
                            }))];
                    }
                    province = provinceData.name;
                    completeAddress = __assign(__assign({}, billingAddressData), { country: country, province: province });
                    dispatch({
                        type: 'checkout/billingAddress/setting'
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_1.updateBillingAddress)(token, apiPath, completeAddress)];
                case 2:
                    response = _a.sent();
                    error = (0, utils_1.handleError)('billingAddress', response);
                    if (error) {
                        if (onError) {
                            onError(error.error);
                        }
                        dispatch({
                            type: "checkout/".concat(error.type, "/setErrors"),
                            payload: error.payload
                        });
                        return [2 /*return*/, Promise.reject(error.error)];
                    }
                    dispatch({
                        type: 'checkout/update',
                        payload: response.data.application_state
                    });
                    return [2 /*return*/, dispatch({
                            type: 'checkout/billingAddress/set',
                            payload: response.data.address
                        })];
                case 3:
                    e_1 = _a.sent();
                    if (onError) {
                        onError(e_1);
                    }
                    dispatch({
                        type: 'checkout/order/setErrors',
                        payload: [{
                                field: 'order',
                                message: 'An error with your order has occured, please try again'
                            }]
                    });
                    return [2 /*return*/, Promise.reject(new utils_1.OrderError())];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [memoizedBillingAddress, memoizedCountryInfo, billingSameAsShipping, memoizedBillingAddressErrors, memoizedRequiredAddressFields, onError]);
    return {
        data: memoizedBillingAddress,
        errors: memoizedBillingAddressErrors,
        loadingStatus: billingAddressLoadingStatus,
        submitBillingAddress: submitBillingAddress
    };
};
exports["default"] = useBillingAddress;
