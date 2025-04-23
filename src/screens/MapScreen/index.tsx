import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Button from '../../components/Button';

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

interface MapScreenProps {
  onAlarmSet?: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({onAlarmSet = () => {}}) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [destinationLocation, setDestinationLocation] =
    useState<Location | null>(null);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const mapRef = useRef<MapView | null>(null);

  // Distance in meters at which to trigger the alarm
  const ALARM_TRIGGER_DISTANCE = 500;

  // Calculate distance between two points in meters
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance; // Distance in meters
  };

  // Stop the alarm
  const stopAlarm = useCallback(() => {
    setIsAlarmSet(false);
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setDestinationLocation(null);
    setDistance(null);
  }, [watchId]);

  // Trigger the alarm
  const triggerAlarm = useCallback(() => {
    Alert.alert(
      'Wake Up!',
      'You are approaching your destination!',
      [{text: 'Stop Alarm', onPress: stopAlarm}],
      {cancelable: false},
    );
    // Vibration or sound would be added here
  }, [stopAlarm]);

  // Start watching position for real-time tracking
  const startWatchingPosition = useCallback(() => {
    const id = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setCurrentLocation(location);

        // Check distance to destination if an alarm is set
        if (destinationLocation) {
          const dist = calculateDistance(
            latitude,
            longitude,
            destinationLocation.latitude,
            destinationLocation.longitude,
          );

          setDistance(dist);

          // Trigger alarm if within range
          if (dist <= ALARM_TRIGGER_DISTANCE && isAlarmSet) {
            triggerAlarm();
          }
        }
      },
      error => console.log('Error watching position', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
    setWatchId(id);
  }, [destinationLocation, isAlarmSet, triggerAlarm]);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setCurrentLocation(location);

        // Watch position for real-time tracking if alarm is set
        if (isAlarmSet) {
          startWatchingPosition();
        }
      },
      error => {
        console.log('Error getting location', error);
        Alert.alert(
          'Error',
          'Could not get your location. Please check your location permissions.',
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [isAlarmSet, startWatchingPosition]);

  // Request location permissions
  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Transit Nap Location Permission',
            message: 'Transit Nap needs access to your location to set alarms.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, [getCurrentLocation]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [requestLocationPermission, watchId]);

  // Set destination on map press
  const handleMapPress = (e: any) => {
    if (!isAlarmSet) {
      setDestinationLocation(e.nativeEvent.coordinate);
    }
  };

  // Set the alarm for the selected destination
  const handleSetAlarm = () => {
    if (destinationLocation) {
      setIsAlarmSet(true);
      startWatchingPosition();

      // Temporarily using a mock address
      const mockAddress = `${destinationLocation.latitude.toFixed(
        4,
      )}, ${destinationLocation.longitude.toFixed(4)}`;

      // Call the callback to update app state
      onAlarmSet({
        latitude: destinationLocation.latitude,
        longitude: destinationLocation.longitude,
        address: mockAddress,
      });

      Alert.alert(
        'Alarm Set',
        'You will be alerted when you are approaching your destination.',
        [{text: 'OK'}],
      );

      // Fit both markers in the map view
      if (mapRef.current && currentLocation) {
        mapRef.current.fitToCoordinates(
          [
            {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            },
            {
              latitude: destinationLocation.latitude,
              longitude: destinationLocation.longitude,
            },
          ],
          {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
            animated: true,
          },
        );
      }
    }
  };

  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton
        onPress={handleMapPress}>
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}

        {destinationLocation && (
          <>
            <Marker
              coordinate={{
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
              }}
              title="Destination"
              description="Your destination"
              pinColor="red"
            />

            {isAlarmSet && (
              <Circle
                center={{
                  latitude: destinationLocation.latitude,
                  longitude: destinationLocation.longitude,
                }}
                radius={ALARM_TRIGGER_DISTANCE}
                fillColor="rgba(255, 0, 0, 0.1)"
                strokeColor="rgba(255, 0, 0, 0.5)"
                strokeWidth={2}
              />
            )}

            {currentLocation && destinationLocation && (
              <>
                {/* We'll add directions when a valid API key is provided */}
                {/* <MapViewDirections
                  origin={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }}
                  destination={{
                    latitude: destinationLocation.latitude,
                    longitude: destinationLocation.longitude,
                  }}
                  apikey="YOUR_GOOGLE_MAPS_API_KEY" 
                  strokeWidth={3}
                  strokeColor="#FCA14E"
                /> */}
              </>
            )}
          </>
        )}
      </MapView>

      <View style={styles.controlPanel}>
        {!isAlarmSet && destinationLocation ? (
          <View style={styles.controlContent}>
            <Text style={styles.instructionText}>Destination selected</Text>
            <Button
              text="Set Alarm for This Location"
              onPress={handleSetAlarm}
              style={styles.alarmButton}
            />
          </View>
        ) : !isAlarmSet ? (
          <Text style={styles.instructionText}>
            Tap on the map to select your destination
          </Text>
        ) : (
          <View style={styles.controlContent}>
            <Text style={styles.alarmText}>
              Alarm set! You will be notified when you are within{' '}
              {(ALARM_TRIGGER_DISTANCE / 1000).toFixed(1)}km of your
              destination.
            </Text>
            {distance && (
              <Text style={styles.distanceText}>
                Current distance: {(distance / 1000).toFixed(2)}km
              </Text>
            )}
            <Button
              text="Cancel Alarm"
              onPress={stopAlarm}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  controlPanel: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  controlContent: {
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  alarmText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  distanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCA14E',
    marginBottom: 15,
  },
  alarmButton: {
    backgroundColor: '#FCA14E',
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#333',
  },
});

export default MapScreen;
