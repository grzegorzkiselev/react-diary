export const INITIAL_STATE = {
  isValid: {
    title: true,
    post: true
  },
  values: {
    title: "",
    post: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false
};

const validateForm = ({ values }) => {
  let isValid = true;

  const formValidState = { ...INITIAL_STATE.isValid };

  Object.entries(values).forEach((pair) => {
    const [key, value] = pair;
    if (formValidState?.hasOwnProperty(key)) {
      const isFieldValid = value?.trim() != "";

      formValidState[key] = isFieldValid;

      if (isFieldValid === false) {
        isValid = false;
      }
    }
  });

  return [formValidState, isValid];
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR": {
      return { ...INITIAL_STATE };
    }
    case "SET_STATE": {
      return {
        ...state,
        values: { ...state.values, ...action.payload }
      };
    }
    case "RESET_VALIDITY": {
      return { ...state, isValid: INITIAL_STATE.isValid };
    }
    case "SUBMIT": {
      const [formValidState, isValid] = validateForm(state);
      return {
        values: state.values,
        isValid: formValidState,
        isFormReadyToSubmit: isValid
      };
    }
    default: {
      console.error("Unknown reducer type");
      return state;
    }
  }

};