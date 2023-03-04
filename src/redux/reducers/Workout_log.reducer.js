const log = (state = [], action) => {
    switch (action.type) {
      case "CURRENT_LOG":
        return action.payload;
      default:
        return state;
    }
  };
  
      export default log
  