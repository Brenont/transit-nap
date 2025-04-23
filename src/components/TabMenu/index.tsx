import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TabMenuProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabChange('map')}>
        <View style={activeTab === 'map' ? styles.activeIconContainer : null}>
          <Text style={[styles.icon, activeTab === 'map' && styles.activeIcon]}>🗺️</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabChange('home')}>
        <View style={activeTab === 'home' ? styles.activeIconContainer : styles.inactiveHomeContainer}>
          <Text style={[styles.icon, activeTab === 'home' ? styles.activeHomeIcon : styles.inactiveHomeIcon]}>🏠</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabChange('settings')}>
        <View style={activeTab === 'settings' ? styles.activeIconContainer : null}>
          <Text style={[styles.icon, activeTab === 'settings' && styles.activeIcon]}>⚙️</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 22,
    color: '#777',
  },
  activeIcon: {
    color: '#000',
  },
  activeIconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
  },
  activeHomeIcon: {
    color: '#FCA14E',
  },
  inactiveHomeIcon: {
    color: '#fff',
  },
  inactiveHomeContainer: {
    backgroundColor: '#141428',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default TabMenu;