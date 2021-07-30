import { IAction, ICart, ICartItem, IPersonalizationDetails } from "../lib/types";

const initialCartState: ICart = []

export enum CartActions {
    addItemToCart = 'ADD_TO_CART',
    removeItemFromCart = 'REMOVE_FROM_CART',
    increaseItemCount = 'INCREASE_COUNT',
    decreaseItemCount = 'DECREASE_COUNT'
}

interface ICartPayload {
    id: number
    personalDetails?: IPersonalizationDetails[]
}

export function CartReducers(
    state = initialCartState,
    { type, payload }: IAction<CartActions, ICartPayload>
) :ICart{
    switch(type){
        case CartActions.addItemToCart: {
            return state.some((itm) => itm.id === payload.id)
                ? state.map(
                    itm => itm.id === payload.id
                        ? { ...itm, count: itm.count + 1 }
                        : itm
                )
                : [
                    {
                        id: payload.id,
                        personalDetails: payload?.personalDetails || [],
                        count: 1
                    },
                    ...state
                ]
        }
        case CartActions.removeItemFromCart: {
            return state.filter(itm => itm.id !== payload.id)
        }
        case CartActions.increaseItemCount: {
            return state.map(
                itm => itm.id === payload.id
                    ? { ...itm, count: itm.count + 1 }
                    : itm
            )
        }
        case CartActions.decreaseItemCount: {
            return state.map(
                itm => itm.id === payload.id
                    ? { ...itm, count: itm.count - 1 }
                    : itm
            )
        }
        default:
            return state

    }
}

export function addItemToCart(
    payload: ICartPayload
): IAction<CartActions, ICartPayload>{
    return {
        type: CartActions.addItemToCart,
        payload
    }
}

export function removeItemFromCart(
    payload: ICartPayload
): IAction<CartActions, ICartPayload> {
    return {
        type: CartActions.removeItemFromCart,
        payload
    }
}

export function increaseItemCount(
    payload: ICartPayload
): IAction<CartActions, ICartPayload> {
    return {
        type: CartActions.increaseItemCount,
        payload
    }
}

export function decreaseItemCount(
    payload: ICartItem
): IAction<CartActions, ICartPayload> {
    return payload.count > 1
        ? {
            type: CartActions.decreaseItemCount,
            payload
        }
        : {
            type: CartActions.removeItemFromCart,
            payload
        }
}
