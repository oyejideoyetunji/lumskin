import { combineReducers } from "redux";
import { ICart, IPersonalizationDetails, IStoreState, LocalStoreKey } from "../lib/types";
import { setLocalStoreData } from "../store";
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

export function updateLocalStore({
    cart, currency, personalDetails
}: IStoreState){
    setLocalStoreData<ICart>(LocalStoreKey.CART, cart)
    setLocalStoreData<string>(LocalStoreKey.CURRENCY, currency)
    setLocalStoreData<IPersonalizationDetails[]>(
        LocalStoreKey.PERSONAL_DETAILS, personalDetails
    )
}

export default reducer
