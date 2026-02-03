import { View } from "reshaped";

import { CreateApplicationButton } from "@/components/create-application-button";

export default function Home() {
  return (
    <View
      align="center"
      as="header"
      borderBottom
      borderColor="neutral"
      direction="row"
      justify="space-between"
      paddingBottom={5}
      paddingTop={6}
    >
      <h1>Applications</h1>

      <CreateApplicationButton />
    </View>
  );
}
