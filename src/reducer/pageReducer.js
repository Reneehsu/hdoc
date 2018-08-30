const pageReducer = (state = 'Register', action) => {
  switch(action.type) {
    case 'PAGE':
      return action.page;
    default:
      return state;
  }
};

export default pageReducer;
