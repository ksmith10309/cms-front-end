let initialState = {};

export default (state = initialState, action) => {
  let { type, payload = {} } = action;

  let { id, model, data } = payload;
  switch (type) {
    case "GET":
      return { ...state, [model]: data };

    case "POST":
      return {
        ...state,
        [model]: state[model] ? [...state[model], data] : [data]
      };

    case "DELETE":
      let deleteList = state[model].filter(r => r._id !== id);
      return { ...state, [model]: deleteList };

    case "PUT":
      let putList = state[model].map((entry, idx) =>
        idx === id ? data : entry
      );
      console.log("PUT", model, data, putList);
      return { ...state, [model]: putList };

    default:
      return state;
  }
};
