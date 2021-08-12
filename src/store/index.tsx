import { createStore } from 'redux';
import reducer from '../reducers';
import { ICart, IPersonalizationDetails, IStoreState, LocalStoreKey } from "../lib/types";
import { setLocalStoreData } from "../localStoretore";


const store = createStore(reducer)

store.subscribe(() => {
    updateLocalStore(store.getState())
})

function updateLocalStore({
    cart, currency, personalDetails
}: IStoreState) {
    setLocalStoreData<ICart>(LocalStoreKey.CART, cart)
    setLocalStoreData<string>(LocalStoreKey.CURRENCY, currency)
    setLocalStoreData<IPersonalizationDetails[]>(
        LocalStoreKey.PERSONAL_DETAILS, personalDetails
    )
}

export default store
