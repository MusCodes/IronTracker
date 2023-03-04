
// const template = (state = [], action) => {
//     switch (action.type) {
//       case "v2SET_TEMPLATE":
//         return action.payload;
//       case "ADD_EXERCISES":
//         return state.map((template) => {
//           if (template.id === action.payload.template_id) {
//             return {
//               ...template,
//               exercises: [
//                 ...template.exercises,
//                 { id: action.payload.id, name: action.payload.name },
//               ],
//             };
//           } else {
//             return template;
//           }
//         });
//       case "DELETE_EXERCISES":
//         return state.map((template) => {
//           if (template.id === action.payload.template_id) {
//             return {
//               ...template,
//               exercises: template.exercises.filter(
//                 (exercise) => exercise.id !== action.payload.id
//               ),
//             };
//           } else {
//             return template;
//           }
          
//         });
        
//       default:
//         return state;
//     }
//   };
  
//   export default template;

const template = (state = [], action) => {
  switch (action.type) {
    case "v2SET_TEMPLATE":
      return action.payload;
    case "ADD_EXERCISES":
      return state.map((template) => {
        if (template.id === action.payload.template_id) {
          return {
            ...template,
            exercises: [
              ...template.exercises,
              { id: action.payload.id, name: action.payload.name },
            ],
          };
        } else {
          return template;
        }
      });
    case "DELETE_EXERCISES":
      return state.map((template) => {
        if (template.id === action.payload.template_id) {
          return {
            ...template,
            exercises: template.exercises.filter(
              (exercise) => exercise.id !== action.payload.id
            ),
          };
        } else {
          return template;
        }
      });
    case "EDIT_TEMPLATE_NAME_SUCCESS":
      const { id, name } = action.payload;
      return state.map((template) => {
        if (template.id === id) {
          return { ...template, name };
        } else {
          return template;
        }
      });
      
    default:
      return state;
  }
};

export default template;

  
  