import superagent from "superagent";

export const get = payload => dispatch => {
  return superagent
    .get(payload.url)
    .then(data => {
      console.log(payload.url, payload.model, data.body);
      dispatch(runGet({ model: payload.model, data: data.body.results }));
    })
    .catch(console.error);
};

const runGet = payload => {
  return {
    type: "GET",
    payload: payload
  };
};

export const destroy = payload => dispatch => {
  console.log(payload.url);
  return superagent
    .delete(payload.url)
    .then(data => {
      console.log(data);
      dispatch(runDestroy({ model: payload.model, id: payload.id }));
    })
    .catch(console.error);
};

const runDestroy = payload => {
  return {
    type: "DELETE",
    payload: payload
  };
};

export const post = payload => dispatch => {
  return superagent
    .post(payload.url)
    .send(payload.record)
    .then(data => {
      dispatch(runPost({ model: payload.model, data: data.body }));
    })
    .catch(console.error);
};

const runPost = payload => {
  return {
    type: "POST",
    payload: payload
  };
};

export const put = payload => dispatch => {
  return superagent
    .put(payload.url)
    .send(payload.record)
    .then(data => {
      dispatch(
        runPut({ model: payload.model, id: payload.id, data: data.body })
      );
    })
    .catch(console.error);
};

const runPut = payload => {
  return {
    type: "PUT",
    payload: payload
  };
};
