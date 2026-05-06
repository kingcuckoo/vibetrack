import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Category, MOCK_SUGGESTIONS } from '@/data/mock-gallery';
import CategoryPill from './CategoryPill';

const ALL_CATEGORIES: Category[] = ['food', 'body', 'exercise', 'scale', 'other'];

interface AnnotationSheetProps {
  onSave: () => void;
  onDiscard: () => void;
}

export default function AnnotationSheet({ onSave, onDiscard }: AnnotationSheetProps) {
  const insets = useSafeAreaInsets();
  const suggestion = React.useMemo(
    () => MOCK_SUGGESTIONS[Math.floor(Math.random() * MOCK_SUGGESTIONS.length)],
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(suggestion.category);
  const [notes, setNotes] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      {/* Drag handle */}
      <View style={styles.handle} />

      {/* Photo preview row */}
      <View style={styles.previewRow}>
        <View style={[styles.thumbnail, { backgroundColor: suggestion.color }]} />
        <View style={styles.aiText}>
          <Text style={styles.aiHint}>AI thinks this is:</Text>
          <Text style={styles.aiLabel}>{suggestion.aiLabel}</Text>
          <Text style={styles.aiAnnotation}>{suggestion.aiAnnotation}</Text>
        </View>
      </View>

      {/* Category pills */}
      <Text style={styles.sectionLabel}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
        style={styles.pillsScroll}
      >
        {ALL_CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat}
            category={cat}
            selected={selectedCategory === cat}
            onPress={() => setSelectedCategory(cat)}
          />
        ))}
      </ScrollView>

      {/* Notes */}
      <Text style={styles.sectionLabel}>Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Add a note..."
        placeholderTextColor="#bbb"
        style={styles.notesInput}
        returnKeyType="done"
      />

      <View style={styles.divider} />

      {/* Actions */}
      <View style={[styles.actions, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity onPress={onDiscard} style={styles.discardBtn}>
          <Text style={styles.discardText}>✕  Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
          <Text style={styles.saveText}>✓  Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    minHeight: '50%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 20,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  aiText: {
    flex: 1,
    gap: 3,
  },
  aiHint: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
  },
  aiLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  aiAnnotation: {
    fontSize: 13,
    color: '#666',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  pillsScroll: {
    marginBottom: 20,
  },
  pillsRow: {
    paddingRight: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111',
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  discardBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  discardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888',
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#111',
  },
  saveText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
