import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FlashMode = 'off' | 'on' | 'auto';

interface CameraControlsProps {
  flashMode: FlashMode;
  onFlashToggle: () => void;
  onFlip: () => void;
}

const FLASH_ICONS: Record<FlashMode, string> = {
  off: '⚡️',
  on: '🔆',
  auto: '⚡',
};

export default function CameraControls({ flashMode, onFlashToggle, onFlip }: CameraControlsProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity onPress={onFlashToggle} style={styles.button} hitSlop={12}>
        <Text style={styles.icon}>{FLASH_ICONS[flashMode]}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>vibetrack</Text>

      <TouchableOpacity onPress={onFlip} style={styles.button} hitSlop={12}>
        <Text style={styles.icon}>🔄</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
