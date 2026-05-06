import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface PageDotsProps {
  count: number;
  activeIndex: number;
}

export default function PageDots({ count, activeIndex }: PageDotsProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} active={i === activeIndex} />
      ))}
    </View>
  );
}

function Dot({ active }: { active: boolean }) {
  const style = useAnimatedStyle(() => ({
    width: withTiming(active ? 8 : 5, { duration: 200 }),
    height: withTiming(active ? 8 : 5, { duration: 200 }),
    borderRadius: 4,
    backgroundColor: active ? '#fff' : 'rgba(255,255,255,0.4)',
  }));
  return <Animated.View style={style} />;
}
