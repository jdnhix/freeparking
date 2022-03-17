import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../components/Colors";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { createOpenLink } from "react-native-open-maps";

// Component for each saved spot
function Spots(props) {
  // whether or not the favourite star is checked
  const [fav, setFav] = useState(false);
  // "star" for filled star icon; "staro" for star outline
  const [favName, setFavName] = useState("staro");

  // TODO: when route icon is clicked. Go to Apple/Google maps
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
        styles.container,
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

export default function SavedScreen() {
  return (
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
      <Spots
        style={styles.spot}
        title="Vanderbilt"
        loc="2301 Vanderbilt Place"
        time="M-F: 6PM - 6AM, S-U: All Day"
      />
      <Spots
        style={styles.spot}
        title="Vanderbilt"
        loc="2301 Vanderbilt Place"
        time="M-F: 6PM - 6AM, S-U: All Day"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 35,
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
});
