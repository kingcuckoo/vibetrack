import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HorizontalPager from '@/components/pager/HorizontalPager';
import CameraScreen from '@/components/camera/CameraScreen';
import StatsScreen from '@/components/stats/StatsScreen';
import ProfileScreen from '@/components/profile/ProfileScreen';

export default function Index() {
  const [pagerIndex, setPagerIndex] = useState(1);

  return (
    <View style={styles.container}>
      <HorizontalPager
        pages={[
          <StatsScreen key="stats" />,
          <CameraScreen key="camera" pagerIndex={pagerIndex} />,
          <ProfileScreen key="profile" />,
        ]}
        initialIndex={1}
        onPageChange={setPagerIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
});
