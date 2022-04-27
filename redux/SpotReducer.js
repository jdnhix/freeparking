import { combineReducers } from "redux";

const defTimeArr = [
  {
    days: [true, true, true, true, true, false, false],
    start: new Date("1899-12-31T6:00:00.000Z"),
    end: new Date("1899-12-31T18:00:00.000Z"),
    string: "M-F: 6:00 AM - 6:00 PM",
    idx: 0,
  },
  {
    days: [false, false, false, false, false, true, true],
    start: new Date("1899-12-31T14:00:00.000Z"),
    end: new Date("1899-12-31T17:00:00.000Z"),
    string: "S,U: 0:00 AM - 0:00 AM",
    idx: 1,
  },
];

const INITIAL_STATE = {
  spots: [
    {
      lat: 36.160542,
      long: -86.778748,
      title: "Bridgestone Arena",
      address: "501 Broadway, Nashville, TN 37203",
      timeArr: defTimeArr.map((time) => ({ ...time })),
      fav: false,
      idx: 0,
    },
    {
      lat: 36.13085,
      long: -86.85464,
      title: "Target",
      address: "26 White Bridge Rd",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 1,
    },
    {
      lat: 36.14645,
      long: -86.803482,
      title: "Vanderbilt",
      address: "2301 Vanderbilt Place",
      timeArr: defTimeArr.map((time) => ({ ...time })),
      fav: false,
      idx: 2,
    },
  ],
};

const spotReducer = (state = INITIAL_STATE, action) => {
  const spots = [...state.spots];
  switch (action.type) {
    case "ADD_SPOT":
      let newSpot = action.payload;
      newSpot.idx = spots.length;
      spots.push(action.payload);

      return {
        ...state,
        spots,
      };

    case "REMOVE_SPOT":
      spots.splice(action.payload, 1);

      return {
        ...state,
        spots,
      };

    case "EDIT_SPOT":
      spots[action.payload.idx] = action.payload;

      return {
        ...state,
        spots,
      };

    case "TOGGLE_FAV":
      spots[action.payload].fav = !spots[action.payload].fav;

      return {
        ...state,
        spots,
      };

    default:
      return state;
  }
};

export default combineReducers({
  spots: spotReducer,
});
