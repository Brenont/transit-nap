import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Button';

interface HomeHighlightProps {
  username?: string;
  onSetBusStop?: () => void;
  activeAlarm?: string | null;
}

const HomeHighlight: React.FC<HomeHighlightProps> = ({
  username = 'John',
  onSetBusStop = () => {},
  activeAlarm = null,
}) => {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#FCA14E', '#FFE6CE']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.linerBg}>
        <View style={styles.container}>
          {/* <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View> */}

          <View style={styles.content}>
            <Text style={styles.greeting}>Hello, {username}</Text>

            {activeAlarm ? (
              <>
                <Text style={styles.title}>Active Alarm</Text>
                <Text style={styles.alarmLocation}>{activeAlarm}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    text="View on map"
                    onPress={onSetBusStop}
                    showArrow={true}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>
                  Set an alarm{'\n'}location-based
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    text="Set bus stop"
                    onPress={onSetBusStop}
                    showArrow={true}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linerBg: {
    flex: 1,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 2,
    elevation: 2, // for Android
    paddingBottom: 20, // Adjust padding to accommodate the linear gradient background
    backgroundColor: '#fff',
  },
  container: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 20,
    paddingTop: 100,
    paddingBottom: 60,
  },
  menuIcon: {
    width: 30,
    height: 20,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  menuLine: {
    height: 2,
    backgroundColor: '#333',
    width: 25,
  },
  content: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    lineHeight: 40,
    marginBottom: 15,
  },
  alarmLocation: {
    fontSize: 18,
    color: '#444',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'flex-start',
  },
});

export default HomeHighlight;
