
const fetchTemplate = (state = [], action) => {
    switch (action.type) {
      case "SET_TEMPLATE":
        return action.payload;
      case "SECOND_TEMPLATE":
        return state.map((template) =>
          template.id === action.payload.id ? action.payload : template
        );
      default:
        return state;
    }
  };
  
  export default fetchTemplate;
  