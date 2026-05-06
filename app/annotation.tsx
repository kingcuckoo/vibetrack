import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AnnotationSheet from '@/components/annotation/AnnotationSheet';

export default function Annotation() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Tap outside to dismiss (auto-save) */}
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <AnnotationSheet
        onSave={() => router.back()}
        onDiscard={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
