import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Category, CATEGORY_LABELS, CATEGORY_COLORS } from '@/data/mock-gallery';

interface CategoryPillProps {
  category: Category;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryPill({ category, selected, onPress }: CategoryPillProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(selected ? CATEGORY_COLORS[category] : 'transparent', { duration: 150 }),
    borderColor: withTiming(selected ? CATEGORY_COLORS[category] : '#ddd', { duration: 150 }),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(selected ? '#fff' : '#555', { duration: 150 }),
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
      <Animated.View style={[styles.pill, animatedStyle]}>
        <Animated.Text style={[styles.label, textStyle]}>
          {CATEGORY_LABELS[category]}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
