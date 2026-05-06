import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import CameraControls from './CameraControls';
import CaptureButton from './CaptureButton';
import PageDots from '@/components/pager/PageDots';
import { GALLERY_SECTIONS } from '@/data/mock-gallery';

type FlashMode = 'off' | 'on' | 'auto';
type CaptureMode = 'photo' | 'video';

interface CameraScreenProps {
  pagerIndex: number;
}

export default function CameraScreen({ pagerIndex }: CameraScreenProps) {
  const insets = useSafeAreaInsets();
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [captureMode, setCaptureMode] = useState<CaptureMode>('photo');
  const [isRecording, setIsRecording] = useState(false);
  const [isFront, setIsFront] = useState(false);

  const lastEntry = GALLERY_SECTIONS[0]?.data[0]?.[0];

  const cycleFlash = () => {
    setFlashMode(f => f === 'off' ? 'on' : f === 'on' ? 'auto' : 'off');
  };

  const handleCapture = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/annotation');
  };

  const swipeUpGesture = Gesture.Pan()
    .onEnd((e) => {
      if (e.velocityY < -600 && e.translationY < -50) {
        router.push('/gallery');
      }
    });

  return (
    <GestureDetector gesture={swipeUpGesture}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <CameraControls
          flashMode={flashMode}
          onFlashToggle={cycleFlash}
          onFlip={() => setIsFront(f => !f)}
        />

        {/* Viewfinder placeholder */}
        <View style={styles.viewfinder}>
          <Text style={styles.viewfinderHint}>
            {isFront ? 'Front camera' : 'Camera preview'}
          </Text>
          <Text style={styles.viewfinderSub}>tap {captureMode === 'photo' ? '📸' : '🎥'} to capture</Text>
        </View>

        {/* Bottom bar */}
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
          {/* Gallery thumbnail */}
          <TouchableOpacity onPress={() => router.push('/gallery')} style={styles.galleryThumb}>
            {lastEntry ? (
              <View style={[styles.thumbInner, { backgroundColor: lastEntry.color }]} />
            ) : (
              <View style={[styles.thumbInner, { backgroundColor: '#333' }]} />
            )}
          </TouchableOpacity>

          {/* Capture button */}
          <CaptureButton
            mode={captureMode}
            isRecording={isRecording}
            onPress={handleCapture}
            onRecordStart={() => {
              setIsRecording(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }}
            onRecordStop={() => {
              setIsRecording(false);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              Alert.alert('Video captured', 'Video recording is a placeholder in this mockup.');
            }}
          />

          {/* Mode toggle */}
          <View style={styles.modeToggle}>
            <TouchableOpacity
              onPress={() => setCaptureMode('photo')}
              style={[styles.modeBtn, captureMode === 'photo' && styles.modeBtnActive]}
            >
              <Text style={[styles.modeBtnText, captureMode === 'photo' && styles.modeBtnTextActive]}>
                PHOTO
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCaptureMode('video')}
              style={[styles.modeBtn, captureMode === 'video' && styles.modeBtnActive]}
            >
              <Text style={[styles.modeBtnText, captureMode === 'video' && styles.modeBtnTextActive]}>
                VIDEO
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Page dots */}
        <View style={[styles.dotsContainer, { bottom: insets.bottom + 100 }]}>
          <PageDots count={3} activeIndex={pagerIndex} />
        </View>

        {/* Swipe up hint */}
        <View style={[styles.swipeHint, { bottom: insets.bottom + 88 }]}>
          <Text style={styles.swipeHintText}>↑  gallery</Text>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewfinder: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  viewfinderHint: {
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
  },
  viewfinderSub: {
    color: '#333',
    fontSize: 13,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 16,
    zIndex: 10,
  },
  galleryThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  thumbInner: {
    flex: 1,
  },
  modeToggle: {
    gap: 4,
    alignItems: 'center',
  },
  modeBtn: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  modeBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  modeBtnText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  modeBtnTextActive: {
    color: '#fff',
  },
  dotsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  swipeHint: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  swipeHintText: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 11,
    letterSpacing: 1,
  },
});
