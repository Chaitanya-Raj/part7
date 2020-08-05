const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.content;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

let timeoutId;

export const setNotification = (content, time = 5) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      content,
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, time * 1000);
  };
};

export const clearNotification = () => ({ type: "CLEAR_NOTIFICATION" });

export default notificationReducer;
