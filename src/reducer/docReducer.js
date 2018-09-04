const docReducer = (state = "", action) => {
  switch(action.type) {
    case 'SET_DOC':
      return action.doc;
    default:
      return state; //docId
  }
};

export default docReducer;
