import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

interface CommuteItem {
  id: string;
  location: string;
  date: string;
  time: string;
}

interface HistoryListProps {
  items?: CommuteItem[];
  onItemPress?: (item: CommuteItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
  items = [],
  onItemPress = () => {},
}) => {
  const renderItem = ({item}: {item: CommuteItem}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onItemPress(item)}>
      <View style={styles.logoContainer}>
        <Text style={styles.placeholderEmoji}>📍</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.locationName}>{item.location}</Text>
        <Text style={styles.dateTime}>
          {item.date} - {item.time}
        </Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commute history</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeparator}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 30,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 20,
    marginHorizontal: 0,
    marginTop: -20,
    marginBottom: 0,
    paddingBottom: 80,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 24,
    color: '#E74C3C',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dateTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 3,
  },
  arrowContainer: {
    padding: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default HistoryList;
