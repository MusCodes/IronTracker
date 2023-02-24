const fetchExercise = (state = [], action) => {
    switch (action.type) {
      case "SET_EXERCISE":
        return action.payload;
      case "ADD_ROW":
        console.log("THIS IS ACTION",action.payload);
        return [...state, action.payload];

      default:
        return state;
    }
  };
  
  export default fetchExercise;
  