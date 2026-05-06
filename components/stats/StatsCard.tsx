import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}

export default function StatsCard({ label, value, sub, accent = '#111' }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: accent }]}>{value}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
  sub: {
    fontSize: 13,
    color: '#888',
  },
});
