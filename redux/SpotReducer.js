import { combineReducers } from "redux";
import { apiKey } from "../components/Key";

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

      if (!newSpot.lat || !newSpot.long) {
        console.log("no lat/long present...");

        const addressArr = newSpot.address.split(" ");
        const addressStr = addressArr.join("+");

        fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            addressStr +
            "&components=country:US" +
            "&key=" +
            apiKey
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status != "OK") {
              console.log("there was an issue calculating the lat/long");
              console.log(responseJson);
            } else {
              console.log("calculated lat/long");
              const coords = responseJson.results[0].geometry.location;
              newSpot.lat = coords.lat;
              newSpot.long = coords.lng;
            }
          });
      }

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
      const edittedSpot = action.payload;

      const addressArr = edittedSpot.address.split(" ");
      const addressStr = addressArr.join("+");

      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          addressStr +
          "&components=country:US" +
          "&key=" +
          apiKey
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status != "OK") {
            console.log("there was an issue calculating the lat/long");
            console.log(responseJson);
          } else {
            console.log("calculated lat/long");
            const coords = responseJson.results[0].geometry.location;
            edittedSpot.lat = coords.lat;
            edittedSpot.long = coords.lng;
            console.log(edittedSpot);
          }
        });

      spots[action.payload.idx] = edittedSpot;

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
