const fetchTemplate= (state=[],action) =>{
    switch (action.type){
        case "SET_TEMPLATE":
            return action.payload;
            default:
                return state;
    }
}
export default fetchTemplate