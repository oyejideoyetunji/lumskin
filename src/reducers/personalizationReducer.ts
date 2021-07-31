import { IAction, IPersonalizationDetails, StoreKey } from "../lib/types";
import { getStoreData } from "../store";

const initialPersonalDetails = getStoreData<
    IPersonalizationDetails[]
>(StoreKey.PERSONAL_DETAILS) || []

export default function personalizationReducer(
    state = initialPersonalDetails,
    { type, payload }: IAction<'SET_PERSONAL_DETAILS', IPersonalizationDetails[]>
): IPersonalizationDetails[]{
    switch(type){
        case 'SET_PERSONAL_DETAILS':
            return payload
        default:
            return state
    }
}

export function setPersonalDetails(
    payload: IPersonalizationDetails[]
): IAction<'SET_PERSONAL_DETAILS', IPersonalizationDetails[]>{
    return { type:'SET_PERSONAL_DETAILS', payload}
}
