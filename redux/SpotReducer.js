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
      lat: 36.23,
      long: -86.71,
      title: "Brentwood??",
      address: "idek lol",
      timeArr: defTimeArr.map((time) => ({ ...time })),
      fav: true,
      idx: 0,
    },
    {
      lat: 36.09,
      long: -86.74,
      title: "Middle of nowhere",
      address: "1818 church st",
      timeArr: defTimeArr.map((time) => ({ ...time })),
      fav: false,
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
  switch (action.type) {
    case "ADD_SPOT":
      const spots = state.spots;

      spots.push(action.payload);

      const newState = { spots };

      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export default combineReducers({
  spots: spotReducer,
});
