import React from 'react';
import { View, TouchableOpacity, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { GalleryEntry, CATEGORY_LABELS } from '@/data/mock-gallery';

interface GalleryCellProps {
  entry: GalleryEntry;
}

export default function GalleryCell({ entry }: GalleryCellProps) {
  const { width } = useWindowDimensions();
  const cellSize = (width - 4) / 3;

  return (
    <TouchableOpacity style={[styles.cell, { width: cellSize, height: cellSize }]} activeOpacity={0.85}>
      <View style={[styles.bg, { backgroundColor: entry.color }]} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{CATEGORY_LABELS[entry.category][0]}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    margin: 1,
    overflow: 'hidden',
    borderRadius: 2,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
