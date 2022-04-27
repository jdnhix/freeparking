export const addSpot = (spot) => ({
  type: "ADD_SPOT",
  payload: spot,
});

export const removeSpot = (idx) => ({
  type: "REMOVE_SPOT",
  payload: idx,
});

export const editSpot = (spot) => ({
  type: "EDIT_SPOT",
  payload: spot,
});

export const toggleFav = (idx) => ({
  type: "TOGGLE_FAV",
  payload: idx,
});
