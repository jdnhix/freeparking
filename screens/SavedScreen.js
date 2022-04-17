import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../components/Colors";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { createOpenLink } from "react-native-open-maps";
import { SearchBar } from "@rneui/themed";

// TODO:
// Make the cancel button on search bar always visible

// Component for each saved spot
function Spot(props) {
  // whether or not the favourite star is checked
  const [fav, setFav] = useState(props.fav);
  // "star" for filled star icon; "staro" for star outline
  const [favName, setFavName] = useState(props.fav ? "star" : "staro");
  useEffect(() => {
    setFav(props.fav);
    setFavName(props.fav ? "star" : "staro");
  }, [props.fav]);

  // when route icon is clicked. Go to Apple/Google maps
  const toRoute = createOpenLink({ query: props.loc });

  // when "edit" in dropdown menu is selected
  // TODO: need to account for time
  const editSpot = () => {
    const editFunc = props.editFunc;
    editFunc({
      idx: props.rmIdx,
      title: props.title,
      loc: props.loc,
    });
  };

  // when "remove" in dropdown menu is selected
  const removeSpot = () => {
    const rmFunc = props.rmFunc;
    rmFunc(props.rmIdx);
  };

  const editFav = props.editFav;

  const flipFav = () =>
    fav
      ? (setFav(false), setFavName("staro"), editFav(props.rmIdx, false))
      : (setFav(true), setFavName("star"), editFav(props.rmIdx, true));

  // Styles for the dropdown menu
  const menuStyles = {
    optionsContainer: {
      width: 100,
      padding: 3,
    },
    optionWrapper: {
      margin: 3,
    },
    optionText: {
      fontSize: 17,
      fontWeight: "400",
      color: COLORS.green_theme,
    },
  };

  return (
    <View
      style={[
        styles.spotContainer,
        {
          flexDirection: "row",
        },
      ]}
    >
      {/* Star button structured this way to increase touchable area */}
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        activeOpacity={0.8}
        onPressOut={flipFav}
      >
        <View>
          <AntDesign name={favName} size={30} color={COLORS.red_theme} />
        </View>
      </TouchableOpacity>

      <View
        style={{
          flex: 4,
          alignItems: "flex-start",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <Text style={styles.spotTitle}>{props.title}</Text>
        <Text style={styles.spotLoc}>{props.loc}</Text>
        <Text>{props.time}</Text>
      </View>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPressOut={toRoute}
        >
          <Text style={styles.btnText}>Route</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Menu>
          <MenuTrigger>
            <Ionicons
              name="md-ellipsis-vertical"
              size={30}
              color={COLORS.red_theme}
            />
          </MenuTrigger>
          <MenuOptions customStyles={menuStyles}>
            <MenuOption text="Edit" onSelect={editSpot} />
            <MenuOption text="Remove" onSelect={removeSpot} />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

export default function SavedScreen({ navigation, route }) {
  const screenHeight = Dimensions.get("window").height;
  const scrollThreshold = 0.75; // when the spots take up x% of the screen, scoll is enabled

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

  const initArr = [
    {
      title: "Vanderbilt",
      loc: "2301 Vanderbilt Place",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 0,
    },
    {
      title: "Vandy",
      loc: "2301 Vanderbilt Place",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 1,
    },
    {
      title: "Target1",
      loc: "White bridge",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 2,
    },
    {
      title: "Target2",
      loc: "White bridge",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 3,
    },
    {
      title: "Target3",
      loc: "White bridge",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 4,
    },
    {
      title: "Target4",
      loc: "White bridge",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 5,
    },
    {
      title: "Target5",
      loc: "White bridge",
      fav: false,
      timeArr: defTimeArr.map((time) => ({ ...time })),
      idx: 6,
    },
  ];

  // route.params.newSpot is an Object received from EditSpotScreen containing
  // information for a new Spot to be added. So far it contains title: "a title"
  // and loc: "location". Will need to add time in some format later

  // route.params.origSpot is an Object sent to EditSpotScreen containing
  // information for an existing Spot.

  // route.params.editSpot is an Object received from EditSpotScreen containing
  // updated information for an existing Spot.

  // Handle received newSpot information
  useEffect(() => {
    if (route.params?.newSpot) {
      addSpot(route.params.newSpot);
    }
  }, [route.params?.newSpot]);

  // Handle updated information on an existing spot
  useEffect(() => {
    if (route.params?.editSpot) {
      editSpot(route.params.editSpot);
    }
  }, [route.params?.editSpot]);

  const [spotArr, setSpotArr] = useState(
    initArr.map((spot) => {
      return { ...spot };
    })
  );

  // Generate ID for the Spots list.
  // Can delete after backend is ready
  const generateID = (spot, i) => {
    return `${spot.title}_${new Date().getTime()}_${i}`;
  };

  // Boolean indicating only show fav or not
  const [showFav, setShowFav] = useState(false);

  // Make the spots scrollable or not
  const [scroll, setScroll] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const [query, setQuery] = useState("");

  const search = useRef(null);

  // Styles for the dropdown menu
  const menuStyles = {
    optionsContainer: {
      width: 140,
      padding: 3,
    },
    optionWrapper: {
      margin: 3,
    },
    optionText: {
      fontSize: 17,
      fontWeight: "400",
      color: COLORS.green_theme,
    },
  };

  // Show search bar or not. The search icon and "Cancel" call this function
  // Clears the search query so there won't be issues displaying all the spots
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setQuery("");
  };

  // Updates search query
  const updateQuery = (query) => {
    setQuery(query);
  };

  // navigate to EditSpotScreen for adding a Spot
  const toAddSpot = () => {
    navigation.navigate("EditSpot");
  };

  // Action to add spot
  // TODO: need to account for time later
  const addSpot = (newSpot) => {
    setSpotArr([
      ...spotArr,
      {
        title: newSpot.title,
        loc: newSpot.loc,
        fav: false,
        timeArr: newSpot.timeArr,
        idx: spotArr.length,
      },
    ]);
  };

  // Function to remove a spot
  const removeSpot = (idx) => {
    let tmpArr = spotArr.filter((spot) => spot.idx !== idx);
    for (let i = idx; i < tmpArr.length; ++i) {
      tmpArr[i].idx = i;
    }
    setSpotArr(tmpArr);
  };

  // Go to EditSpot page to edit a spot
  // TODO: need to add time as parameter later
  // idx: index in the current spotArr
  const toEditSpot = ({ idx, title, loc }) => {
    navigation.navigate({
      name: "EditSpot",
      params: {
        origSpot: {
          idx: idx,
          title: title,
          loc: loc,
        },
      },
    });
  };

  // Function to edit a spot
  // TODO: need to add time as a parameter
  const editSpot = ({ idx, title, loc }) => {
    let tmpSpots = [...spotArr];
    let target = { ...tmpSpots[idx] };
    target.title = title;
    target.loc = loc;
    tmpSpots[idx] = target;
    setSpotArr(tmpSpots);
  };

  // Function to set a spot favourite or not
  // favQ: boolean, favourite or not
  const flipFav = (idx, favQ) => {
    let tmpSpots = [...spotArr];
    let target = { ...tmpSpots[idx] };
    target.fav = favQ;
    tmpSpots[idx] = target;
    setSpotArr(tmpSpots);
  };

  const filterSearch = (spot) => {
    return (
      spot.title.toLowerCase().includes(query.toLowerCase()) ||
      spot.loc.toLowerCase().includes(query.toLowerCase())
    );
  };

  const connectTimeStr = (pArr) => {
    let res = "";
    if (pArr.length !== 0) {
      res = pArr[0].string.slice();
      pArr.forEach((time, i) => {
        if (i !== 0) {
          res += "; " + time.string.slice();
        }
      });
    } else {
      res = "No Available Time";
    }
    return res;
  };

  return (
    <View style={{ flex: 1 }}>
      {showSearch ? (
        <SearchBar
          ref={search}
          containerStyle={styles.searchBar}
          lightTheme={true}
          platform={Platform.OS}
          showCancel={true}
          cancelButtonTitle="Cancel"
          onCancel={toggleSearch}
          inputStyle={styles.searchBarInput}
          placeholder="Type title/address..."
          onChangeText={updateQuery}
          value={query}
        />
      ) : (
        <View style={styles.topBar}>
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center",
              marginLeft: "4%",
            }}
          >
            <Menu>
              <MenuTrigger>
                <Ionicons
                  name="ios-menu"
                  size={40}
                  color={COLORS.green_theme}
                />
              </MenuTrigger>
              <MenuOptions customStyles={menuStyles}>
                {/* <MenuOption text="Sort (title) A-Z" onSelect={toMenu} />
              <MenuOption text="Sort (title) Z-A" onSelect={toMenu} /> */}
                <MenuOption
                  text="Show Favorite"
                  onSelect={() => {
                    setShowFav(true);
                  }}
                />
                <MenuOption
                  text="Show All"
                  onSelect={() => {
                    setShowFav(false);
                  }}
                />
              </MenuOptions>
            </Menu>
          </View>

          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.pageTitle}>Saved Spots</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPressOut={toggleSearch}
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
              marginRight: "5%",
            }}
          >
            <View>
              <FontAwesome name="search" size={30} color={COLORS.green_theme} />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            if (height / screenHeight > scrollThreshold) {
              setScroll(true);
            } else {
              setScroll(false);
            }
          }}
        >
          <ScrollView
            scrollEnabled={scroll}
            contentContainerStyle={styles.scrollSec}
          >
            {query === ""
              ? showFav
                ? spotArr
                    .filter((spot) => spot.fav)
                    .map((spot, i) => {
                      return (
                        <Spot
                          key={generateID(spot, i)}
                          rmIdx={spot.idx}
                          rmFunc={removeSpot}
                          editFunc={toEditSpot}
                          editFav={flipFav}
                          style={styles.spot}
                          title={spot.title}
                          loc={spot.loc}
                          time={connectTimeStr(spot.timeArr)}
                          fav={spot.fav}
                        ></Spot>
                      );
                    })
                : spotArr.map((spot, i) => (
                    <Spot
                      key={generateID(spot, i)}
                      rmIdx={spot.idx}
                      rmFunc={removeSpot}
                      editFunc={toEditSpot}
                      editFav={flipFav}
                      style={styles.spot}
                      title={spot.title}
                      loc={spot.loc}
                      time={connectTimeStr(spot.timeArr)}
                      fav={spot.fav}
                    ></Spot>
                  ))
              : spotArr
                  .filter((spot) => filterSearch(spot))
                  .map((spot, i) => {
                    return (
                      <Spot
                        key={generateID(spot, i)}
                        rmIdx={spot.idx}
                        rmFunc={removeSpot}
                        editFunc={toEditSpot}
                        editFav={flipFav}
                        style={styles.spot}
                        title={spot.title}
                        loc={spot.loc}
                        time={spot.time}
                        fav={spot.fav}
                      ></Spot>
                    );
                  })}
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity style={styles.addBtn} onPressOut={toAddSpot}>
        <Text style={styles.addBtnTxt}>Add Spot</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  // Entire Spot component styling
  spotContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  // Top bar containing menu and search icon
  topBar: {
    height: 50,
    marginTop: "13%",
    flexDirection: "row",
  },
  // Search bar styling
  searchBar: {
    height: 55,
    marginTop: "13%",
    justifyContent: "center",
  },
  // Seach bar input styling
  searchBarInput: {
    fontSize: 20,
    justifyContent: "center",
  },
  // "Saved Spots" text styling
  pageTitle: {
    fontSize: 25,
    color: COLORS.green_theme,
    fontWeight: "500",
  },
  // "Route" button styling
  button: {
    backgroundColor: COLORS.green_theme,
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  // "Route" button text styling
  btnText: {
    fontSize: 15,
    color: "white",
  },
  // Each spot entry's styling
  spot: {
    height: 200,
  },
  // First line of the spot entry
  spotTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: COLORS.green_theme,
  },
  // Location of the spot
  spotLoc: {
    fontWeight: "600",
    fontSize: 15,
    color: COLORS.green_theme,
  },
  // Scroll section style
  scrollSec: {
    paddingBottom: "20%",
  },
  // Add spot button
  addBtn: {
    backgroundColor: COLORS.green_theme,
    position: "absolute",
    width: 170,
    height: 50,
    bottom: "4%",
    left: "30%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  // Add spot button text
  addBtnTxt: {
    fontSize: 20,
    color: "white",
  },
});
