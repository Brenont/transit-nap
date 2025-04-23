import React from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{false: '#767577', true: '#FCA14E'}}
            thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sound</Text>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{false: '#767577', true: '#FCA14E'}}
            thumbColor={soundEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Vibration</Text>
          <Switch
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
            trackColor={{false: '#767577', true: '#FCA14E'}}
            thumbColor={vibrationEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{false: '#767577', true: '#FCA14E'}}
            thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <TouchableOpacity style={styles.aboutButton}>
          <Text style={styles.aboutButtonText}>About Transit Nap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aboutButton}>
          <Text style={styles.aboutButtonText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aboutButton}>
          <Text style={styles.aboutButtonText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  aboutButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  aboutButtonText: {
    fontSize: 16,
    color: '#333',
  },
  versionText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 'auto',
    paddingVertical: 20,
  },
});

export default SettingsScreen;
