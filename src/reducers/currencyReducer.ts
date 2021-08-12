import { IAction, LocalStoreKey } from "../lib/types";
import { getLocalStoreData } from "../localStoretore";

const initialCurrency = getLocalStoreData<string>(LocalStoreKey.CURRENCY) || 'NGN'

export default function CurrencyReducer(
    state = initialCurrency,
    { type, payload}: IAction<'SET_CURRENCY', string>
): string{
    switch(type){
        case 'SET_CURRENCY':
            return payload
        default:
            return state
    }
}

export function setCurrency(
    payload: string
): IAction<'SET_CURRENCY', string>{
    return { type: 'SET_CURRENCY', payload }
}