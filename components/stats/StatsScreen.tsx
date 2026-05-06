import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import StatsCard from './StatsCard';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const now = new Date();
  const monthLabel = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
        <Text style={styles.title}>Your vibes, tracked.</Text>
        <Text style={styles.subtitle}>{monthLabel}</Text>

        <StatsCard
          label="Current streak"
          value="7 days 🔥"
          sub="Keep it up — longest streak: 12 days"
          accent="#F4A261"
        />
        <StatsCard
          label="Avg. daily calories"
          value="1,840 kcal"
          sub="Logged 5 of the last 7 days"
          accent="#2A9D8F"
        />
        <StatsCard
          label="Body check-ins"
          value="3 this week"
          sub="Last: 2 days ago"
          accent="#E9C46A"
        />
        <StatsCard
          label="Weight"
          value="172 lbs"
          sub="Down 1.5 lbs since last week"
          accent="#6D6875"
        />
        <StatsCard
          label="Workouts logged"
          value="3 this week"
          sub="Upper body · Cardio · Legs"
          accent="#9B5DE5"
        />

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Charts & trends coming in Phase 2</Text>
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
  placeholder: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 13,
    color: '#ccc',
  },
});
