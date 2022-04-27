export const addSpot = (spot) => ({
  type: "ADD_SPOT",
  payload: spot,
});

export const removeSpot = (spot) => ({
  type: "REMOVE_SPOT",
  payload: spot,
});
