import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomeHighlight from './src/components/HomeHighlight';
import HistoryList from './src/components/HistoryList';
import TabMenu from './src/components/TabMenu';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState('home');

  // Sample commute history data
  const commuteHistory = [
    {
      id: '1',
      location: '275 Orient Way',
      date: '17 April 2025',
      time: '5:20pm',
    },
    {
      id: '2',
      location: '45 Ridge Rd',
      date: '8 April 2025',
      time: '9:43pm',
    },
    {
      id: '3',
      location: '275 Orient Way',
      date: '23 March 2025',
      time: '7:24am',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : '#fff',
      padding: 0,
    },
    content: {
      paddingBottom: 80, // Added space for tab menu
      paddingHorizontal: 0,
    },
    placeholderScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 80, // Space for tab menu
    },
    placeholderText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <View style={styles.placeholderScreen}>
            <Text style={styles.placeholderText}>Map Screen</Text>
          </View>
        );
      case 'home':
        return (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>
            <HomeHighlight
              username="John"
              onSetBusStop={() => console.log('Setting bus stop...')}
            />
            <HistoryList
              items={commuteHistory}
              onItemPress={item => console.log('Selected item:', item)}
            />
          </ScrollView>
        );
      case 'settings':
        return (
          <View style={styles.placeholderScreen}>
            <Text style={styles.placeholderText}>Settings Screen</Text>
          </View>
        );
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
}

export default App;
