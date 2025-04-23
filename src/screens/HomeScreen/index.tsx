import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HomeHighlight from '../../components/HomeHighlight';
import HistoryList from '../../components/HistoryList';
import {useAlarm} from '../../context/AlarmContext';

interface HomeScreenProps {
  username?: string;
  onNavigateToMap?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  username = 'User',
  onNavigateToMap = () => {},
}) => {
  const {alarmHistory, isAlarmActive, alarmLocation} = useAlarm();

  // Convert alarm history to the format expected by HistoryList
  const historyItems = alarmHistory.map((item, index) => ({
    id: String(index),
    location: item.address,
    date: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    time: new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <HomeHighlight
        username={username}
        onSetBusStop={onNavigateToMap}
        activeAlarm={isAlarmActive ? alarmLocation?.address : null}
      />
      <HistoryList items={historyItems} onItemPress={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 80, // Space for tab menu
  },
});

export default HomeScreen;
