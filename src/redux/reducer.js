
const initialState = {
    value : 0,
}

export const cartInfo =  (state = initialState, action)=>{
    switch (action.type) {
        case "ADD_CARD_DATA":
            // console.log("reducer called", action)
            return action.value
            default:
                return initialState
    }
}