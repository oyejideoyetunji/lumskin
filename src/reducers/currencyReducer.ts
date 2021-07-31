import { IAction, StoreKey } from "../lib/types";
import { getStoreData } from "../store";

const initialCurrency = getStoreData<string>(StoreKey.CURRENCY) || 'NGN'

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