import { IAction, ICart, ICartItem, IPersonalizationDetails, LocalStoreKey } from "../lib/types";
import { getLocalStoreData } from "../store";

const initialCartState: ICart = getLocalStoreData<ICart>(LocalStoreKey.CART) || []

export enum CartActions {
    addManyToCart = 'ADD_MANY_TO_CART',
    addItemToCart = 'ADD_TO_CART',
    removeItemFromCart = 'REMOVE_FROM_CART',
    increaseItemCount = 'INCREASE_COUNT',
    decreaseItemCount = 'DECREASE_COUNT'
}

interface ICartPayload {
    id: number
    personalDetails?: IPersonalizationDetails[]
}

export default function CartReducer(
    state = initialCartState,
    { type, payload }: IAction<CartActions, ICartPayload | ICart>
) :ICart{
    switch(type){
        case CartActions.addManyToCart: {
            const bulkPayload = payload as ICart
            return bulkPayload
        }
        case CartActions.addItemToCart: {
            const itemPayload = payload as ICartPayload
            return state.some((itm) => itm.id === itemPayload.id)
                ? state.map(
                    itm => itm.id === itemPayload.id
                        ? { ...itm, count: itm.count + 1 }
                        : itm
                )
                : [
                    {
                        id: itemPayload.id,
                        personalDetails: itemPayload?.personalDetails || [],
                        count: 1
                    },
                    ...state
                ]
        }
        case CartActions.removeItemFromCart: {
            const itemPayload = payload as ICartPayload
            return state.filter(itm => itm.id !== itemPayload.id)
        }
        case CartActions.increaseItemCount: {
            const itemPayload = payload as ICartPayload
            return state.map(
                itm => itm.id === itemPayload.id
                    ? { ...itm, count: itm.count + 1 }
                    : itm
            )
        }
        case CartActions.decreaseItemCount: {
            const itemPayload = payload as ICartPayload
            return state.map(
                itm => itm.id === itemPayload.id
                    ? { ...itm, count: itm.count - 1 }
                    : itm
            )
        }
        default:
            return state

    }
}

export function addManyToCart(
    payload: ICart
): IAction<CartActions, ICart> {
    return {
        type: CartActions.addManyToCart,
        payload
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
