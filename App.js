import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Magic } from "@magic-sdk/react-native-expo";
import { OAuthExtension } from "@magic-ext/react-native-expo-oauth";
import { Card } from "react-native-elements";
import * as Linking from "expo-linking";

export default function App() {
  const magic = new Magic("pk_live_2F9E1D4324CD5A1D", {
    extensions: [new OAuthExtension()],
  });

  const magicGoogleSignIn = async () => {
    const res = await magic.oauth.loginWithPopup({
      provider: "google",
      redirectURI: Linking.createURL("exp://"),
    });
    alert(JSON.stringify(res));
  };

  const TouchableButton = (props) => (
    <View style={styles.actionContainer}>
      <Pressable style={styles.button} onPress={() => props.handler()}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaProvider>
      <magic.Relayer />
      <View style={styles.container}>
        <Card>
          <Card.Title>Google Login</Card.Title>
          <TouchableButton handler={() => magicGoogleSignIn()} title="Login" />
        </Card>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
