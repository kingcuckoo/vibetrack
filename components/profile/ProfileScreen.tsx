import React, { useState } from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function SettingsRow({
  label,
  right,
  onPress,
  danger,
}: {
  label: string;
  right?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
      disabled={!onPress && !right}
    >
      <Text style={[styles.rowLabel, danger && styles.dangerText]}>{label}</Text>
      {right ?? <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [imperialUnits, setImperialUnits] = useState(true);

  const comingSoon = () => Alert.alert('Coming soon', 'This feature isn\'t available yet.');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>YO</Text>
          </View>
          <Text style={styles.name}>Your Name</Text>
          <Text style={styles.since}>vibetrack member since May 2026</Text>
        </View>

        <SectionHeader title="Preferences" />
        <View style={styles.section}>
          <SettingsRow
            label="Reminder notifications"
            right={<Switch value={notifications} onValueChange={setNotifications} />}
          />
          <View style={styles.separator} />
          <SettingsRow
            label={`Units: ${imperialUnits ? 'lbs / oz' : 'kg / ml'}`}
            right={
              <TouchableOpacity onPress={() => setImperialUnits(u => !u)} style={styles.unitToggle}>
                <Text style={styles.unitToggleText}>{imperialUnits ? 'Switch to metric' : 'Switch to imperial'}</Text>
              </TouchableOpacity>
            }
          />
        </View>

        <SectionHeader title="Account" />
        <View style={styles.section}>
          <SettingsRow label="Export my data" onPress={comingSoon} />
          <View style={styles.separator} />
          <SettingsRow label="Privacy policy" onPress={comingSoon} />
          <View style={styles.separator} />
          <SettingsRow
            label="About vibetrack"
            right={<Text style={styles.version}>v0.1.0-mockup</Text>}
          />
        </View>

        <SectionHeader title="Danger zone" />
        <View style={styles.section}>
          <SettingsRow label="Delete all data" onPress={comingSoon} danger />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scroll: {
    paddingHorizontal: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInitials: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  since: {
    fontSize: 13,
    color: '#aaa',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLabel: {
    fontSize: 15,
    color: '#111',
  },
  dangerText: {
    color: '#FF3B30',
  },
  chevron: {
    fontSize: 18,
    color: '#ccc',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#f0f0f0',
    marginLeft: 16,
  },
  version: {
    fontSize: 13,
    color: '#bbb',
  },
  unitToggle: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  unitToggleText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
});
