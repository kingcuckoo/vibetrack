import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

type CaptureMode = 'photo' | 'video';

interface CaptureButtonProps {
  mode: CaptureMode;
  isRecording: boolean;
  onPress: () => void;
  onRecordStart: () => void;
  onRecordStop: () => void;
}

export default function CaptureButton({ mode, isRecording, onPress, onRecordStart, onRecordStop }: CaptureButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (mode === 'video') {
      Animated.spring(scale, { toValue: 1.12, useNativeDriver: true, speed: 20 }).start();
      onRecordStart();
    }
  };

  const handlePressOut = () => {
    if (mode === 'video') {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
      onRecordStop();
    }
  };

  const handlePress = () => {
    if (mode === 'photo') {
      Animated.sequence([
        Animated.timing(scale, { toValue: 0.88, duration: 80, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }),
      ]).start();
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.outer, isRecording && styles.outerRecording, { transform: [{ scale }] }]}>
        <View style={[styles.inner, mode === 'video' && styles.innerVideo, isRecording && styles.innerRecording]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRecording: {
    borderColor: '#FF3B30',
  },
  inner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  innerVideo: {
    backgroundColor: '#FF3B30',
  },
  innerRecording: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
});
