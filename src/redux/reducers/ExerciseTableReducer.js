
const UserTable= (state={},action) =>{
    if (action.type=== "ADD_TABLE"){
        return {...state, ...action.payload}
    }
    return state;
}

export default UserTable