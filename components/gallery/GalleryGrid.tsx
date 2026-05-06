import React from 'react';
import { SectionList, View, StyleSheet } from 'react-native';
import { GALLERY_SECTIONS, GalleryEntry, GallerySection } from '@/data/mock-gallery';
import GalleryCell from './GalleryCell';
import GalleryHeader from './GalleryHeader';

export default function GalleryGrid() {
  return (
    <SectionList<GalleryEntry[], GallerySection>
      sections={GALLERY_SECTIONS}
      keyExtractor={(row, index) => row.map(e => e.id).join('-') + index}
      renderItem={({ item: row }) => (
        <View style={styles.row}>
          {row.map((entry) => (
            <GalleryCell key={entry.id} entry={entry} />
          ))}
          {/* fill empty cells in last row */}
          {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.emptyCell} />
          ))}
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <GalleryHeader title={section.title} />
      )}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  emptyCell: {
    flex: 1,
    margin: 1,
  },
});
