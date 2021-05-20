import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Animated, Vibration } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";

const work_time = 1 * 5;
const break_time = 2 * 5;

export default function Pomodoro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [start, setStart] = useState(false);
  const [key, setKey] = useState(0);
  const [session, setSession] = useState(work_time);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/airhorn.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const onComplete = () => {
    if (session == work_time) {
      setSession(break_time);
    } else {
      setSession(work_time);
    }
    setDisplayMessage(!displayMessage);
    setKey((prev) => prev + 1);
    Vibration.vibrate(2000);
    playSound();
    return [true, 2000];
  };

  const onReset = () => {
    setIsPlaying(false);
    setStart(false);
    setDisplayMessage(false);
    setSession(work_time);
    setKey((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.breaktxt}>
          {displayMessage ? "Next session starts in" : "Time to focus "}
        </Text>
      </View>
      <View>
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={session}
          strokeWidth={10}
          trailColor="#1e212d"
          colors={[
            ["#004777", 0.4],
            ["#F7B801", 0.4],
            ["#A30000", 0.2],
          ]}
          onComplete={() => onComplete()}
        >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text
              style={{ color: animatedColor, fontSize: 40, fontWeight: "bold" }}
            >
              {children({ remainingTime })}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={{ flexDirection: "row", margin: 10, padding: 10 }}>
        {start ? (
          <>
            <FontAwesome5.Button
              onPress={() => onReset()}
              name="fast-backward"
              backgroundColor="#1e212d"
              color="#eabf9f"
              size={35}
            />
            {isPlaying ? (
              <FontAwesome5.Button
                onPress={() => setIsPlaying(false)}
                name="pause-circle"
                backgroundColor="#1e212d"
                color="#eabf9f"
                size={35}
              />
            ) : (
              <FontAwesome5.Button
                onPress={() => setIsPlaying(true)}
                name="play-circle"
                backgroundColor="#1e212d"
                color="#eabf9f"
                size={35}
              />
            )}
          </>
        ) : (
          <>
            <FontAwesome5.Button
              onPress={() => {
                setIsPlaying(true);
                setStart(true);
              }}
              name="play"
              backgroundColor="#1e212d"
              color="#eabf9f"
              size={35}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //  paddingTop: Constants.statusBarHeight,
    backgroundColor: "#1e212d",
    padding: 8,
  },
  breaktxt: {
    color: "#eabf9f",
    fontFamily: "monospace",
    fontSize: 20,
    fontWeight: "bold",
    padding: 40,
  },
});
