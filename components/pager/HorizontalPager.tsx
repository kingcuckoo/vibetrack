import React from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface HorizontalPagerProps {
  pages: [React.ReactNode, React.ReactNode, React.ReactNode];
  initialIndex?: number;
  onPageChange?: (index: number) => void;
}

export default function HorizontalPager({ pages, initialIndex = 1, onPageChange }: HorizontalPagerProps) {
  const { width } = useWindowDimensions();
  const offsetX = useSharedValue(-initialIndex * width);
  const startX = useSharedValue(-initialIndex * width);

  const activeIndex = useDerivedValue(() => {
    return Math.round(-offsetX.value / width);
  });

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = offsetX.value;
    })
    .onUpdate((e) => {
      const next = startX.value + e.translationX;
      const min = -(pages.length - 1) * width;
      const max = 0;
      // allow slight overscroll resistance at edges
      if (next > max) {
        offsetX.value = max + (next - max) * 0.2;
      } else if (next < min) {
        offsetX.value = min + (next - min) * 0.2;
      } else {
        offsetX.value = next;
      }
    })
    .onEnd((e) => {
      const currentPage = Math.round(-startX.value / width);
      let targetPage = currentPage;
      if (e.velocityX < -300 || e.translationX < -width * 0.3) {
        targetPage = Math.min(currentPage + 1, pages.length - 1);
      } else if (e.velocityX > 300 || e.translationX > width * 0.3) {
        targetPage = Math.max(currentPage - 1, 0);
      }
      offsetX.value = withSpring(-targetPage * width, { damping: 20, stiffness: 200 });
      if (onPageChange) runOnJS(onPageChange)(targetPage);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[{ flex: 1, flexDirection: 'row', width: width * pages.length }, animatedStyle]}>
        {pages.map((page, i) => (
          <Animated.View key={i} style={{ width, flex: 1 }}>
            {page}
          </Animated.View>
        ))}
      </Animated.View>
    </GestureDetector>
  );
}

export { type HorizontalPagerProps };
