// const currentTemplate = (state = [], action) => {
//     switch (action.type) {
//       case "CURRENT_TEMPLATE":
//         return  action.payload;
//       default:
//         return state;
//     }
//   }
const currentTemplate = (state = null, action) => {
  switch (action.type) {
    case "CURRENT_TEMPLATE":
      return action.payload;
    default:
      return state;
  }
};

    export default currentTemplate
