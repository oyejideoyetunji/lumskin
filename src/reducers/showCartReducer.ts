import { IAction } from "../lib/types";

export enum ShowCartActions {
    show = 'SHOW_CART',
    hide = 'HIDE_CART'
}

export default function ShowCartReducer(
    state = false,
    { type }: IAction<ShowCartActions, null>
): boolean{
    switch(type){
        case ShowCartActions.hide:
            return false
        case ShowCartActions.show:
            return true
        default:
            return state
    }
}

export function setShowCart(
    type: ShowCartActions
): IAction<ShowCartActions, null>{
    return { type, payload: null }
}
