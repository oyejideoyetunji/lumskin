import { combineReducers } from "redux";
import CartReducer from "./cartReducers";
import CurrencyReducer from "./currencyReducer";
import personalizationReducer from "./personalizationReducer";
import ShowCartReducer from "./showCartReducer";

const reducer = combineReducers({
    cart: CartReducer,
    showCart: ShowCartReducer,
    currency: CurrencyReducer,
    personalDetails: personalizationReducer
})

export default reducer
