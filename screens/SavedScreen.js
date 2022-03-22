import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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

// TODO:
//  1. Add a spot button and add a spot functionality
//  2. Remove a spot functionality
//  3. Spots scrollable when full. Not scrollable when not full.
//  4. All/Favourite tabs.

// Component for each saved spot
function Spot(props) {
  // whether or not the favourite star is checked
  const [fav, setFav] = useState(false);
  // "star" for filled star icon; "staro" for star outline
  const [favName, setFavName] = useState("staro");

  // when route icon is clicked. Go to Apple/Google maps
  const toRoute = createOpenLink({ query: props.loc });

  // when "edit" in dropdown menu is selected
  const editSpot = () => {
    console.log("Edit!");
  };

  // when "remove" in dropdown menu is selected
  const removeSpot = () => {
    console.log("Remove!");
  };

  const flipFav = () =>
    fav
      ? (setFav(false), setFavName("staro"))
      : (setFav(true), setFavName("star"));

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
      uc
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
  useEffect(() => {
    if (route.params?.newSpot) {
      addSpot(route.params.newSpot);
      console.log(route);
    }
  }, [route.params?.newSpot]);

  const [spotArr, setSpotArr] = useState([
    {
      title: "Vanderbilt",
      loc: "2301 Vanderbilt Place",
      time: "M-F: 6PM - 6AM, S-U: All Day",
    },
    {
      title: "Vandy",
      loc: "2301 Vanderbilt Place",
      time: "M-F: 6PM - 6AM, S-U: All Day",
    },
  ]);

  // Action to add spot
  const addSpot = (newSpot) => {
    setSpotArr([
      ...spotArr,
      {
        title: newSpot.title,
        loc: newSpot.loc,
        time: "M-F: 6PM - 6AM, S-U: All Day",
      },
    ]);
  };

  // navigate to EditSpotScreen
  const toAddSpot = () => {
    navigation.navigate("EditSpot");
  };

  const toMenu = () => {
    console.log("Menu");
  };

  const toSearch = () => {
    console.log("Search");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressOut={toMenu}
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: "4%",
          }}
        >
          <View>
            <Ionicons name="ios-menu" size={40} color={COLORS.green_theme} />
          </View>
        </TouchableOpacity>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.pageTitle}>Saved Spots</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressOut={toSearch}
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

      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
          },
        ]}
      >
        {/* <ScrollView>
      </ScrollView> */}
        {spotArr.map((spot, i) => (
          <Spot
            key={i}
            style={styles.spot}
            title={spot.title}
            loc={spot.loc}
            time={spot.time}
          ></Spot>
        ))}
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
    paddingBottom: 15,
  },
  // Top bar containing menu and search icon
  topBar: {
    height: 50,
    marginTop: "13%",
    flexDirection: "row",
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
    backgroundColor: "blue",
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
