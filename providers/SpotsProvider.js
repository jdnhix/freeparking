import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Spot } from "../schemas";
import { useAuth } from "./AuthProvider";

const SpotsContext = React.createContext(null);

const SpotsProvider = ( props ) => {
    const [spots, setSpots] = useState([]);
    const { user } = useAuth();

    const realmRef = useRef(null);

    useEffect(() => {
        if (user == null) {
            console.error("Null user? Needs to log in!");
            return;
        }

        const OpenRealmBehaviorConfiguration = {
            type: 'openImmediately',
        };
        const config = {
            schema: [Spot.schema],
            sync: {
                user: user,
                partitionValue: `${user.id}`,
                newRealmFileBehavior: OpenRealmBehaviorConfiguration,
                existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
            },
        };

        Realm.open(config).then((realm) => {
            realmRef.current = realm;

            const syncSpots = realm.objects("Spot");
            let sortedSpots = syncSpots.sorted("name");
            setSpots([...sortedSpots]);

            sortedSpots.addListener(() => {
                console.log("Got new data!");
                setSpots([...sortedSpots]);
            });
        });

        return () => {
            closeRealm();
        };
    }, [user]);

    const createSpot = (newSpotName, newSpotAddress) => {
        const realm = realmRef.current;
        realm.write(() => {
            realm.create(
                "Spot",
                new Spot({
                    name: newSpotName,
                    address: newSpotAddress,
                    partition: user.id,
                })
            );
        });
    };

    const deleteSpot = (spot) => {
        const realm = realmRef.current;
        realm.write(() => {
            realm.delete(spot);
            setSpots([...realm.objects("Spot").sorted("name")]);
        });
    };

    const closeRealm = () => {
        const realm = realmRef.current;
        if (realm) {
            realm.close();
            realmRef.current = null;
            setSpots([]);
        }
    };

    return (
        <SpotsContext.Provider
            value={{
                createSpot,
                deleteSpot,
                closeRealm,
                spots,
            }}
        >
            {props.children}
        </SpotsContext.Provider>
    );
};


const useSpots = () => {
    const spots = useContext(SpotsContext);
    if (spots == null) {
        throw new Error("useSpots() called outside of a SpotsProvider?");
    }
    return spots;
};

export { SpotsProvider, useSpots };