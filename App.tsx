import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import TabMenu from './src/components/TabMenu';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import {AlarmProvider, useAlarm} from './src/context/AlarmContext';

// Main app content component
const AppContent: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState('home');
  const {setAlarm} = useAlarm();

  const handleNavigateToMap = () => {
    setActiveTab('map');
  };

  const handleSetAlarm = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setAlarm(location);
    setActiveTab('home'); // Return to home screen to show active alarm
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : '#fff',
    },
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <MapScreen onAlarmSet={handleSetAlarm} />;
      case 'home':
        return <HomeScreen onNavigateToMap={handleNavigateToMap} />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {renderContent()}
      <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
};

// Root component with context provider
function App(): React.JSX.Element {
  return (
    <AlarmProvider>
      <AppContent />
    </AlarmProvider>
  );
}

export default App;
