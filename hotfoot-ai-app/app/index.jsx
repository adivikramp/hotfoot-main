import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

const home = () => {
  return (
    <View>
      <SignedIn>
        {/* < Redirect href={'/hotel/dummyPage'} /> */}
        {/* < Redirect href={'/hotel/[id]'} /> */}
        {/* < Redirect href={'/place/cityDetails'} /> */}
        <Redirect href={"/(tabs)/home"} />
      </SignedIn>
      <SignedOut>
        <Redirect href={"/onboarding"} />
      </SignedOut>
    </View>
  );
};

export default home;
