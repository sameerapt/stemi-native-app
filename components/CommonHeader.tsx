import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { NavigationProp } from '@react-navigation/native';

type CommonHeaderProps = {
  navigation: NavigationProp<any>;
  title: string;
  showBackButton?: boolean;
  isChatScreen?: boolean;
  onCallPress?: () => void;
  onVideoPress?: () => void;
  hasNotifications?: boolean;
  onNotificationPress?: () => void;
};

const CommonHeader = ({ 
  navigation, 
  title, 
  showBackButton = true,
  isChatScreen = false,
  onCallPress,
  onVideoPress,
  hasNotifications = false,
  onNotificationPress
}: CommonHeaderProps) => {
  return (
    <View style={styles.header}>
      {/* Left Section - Back Button */}
      <View style={styles.left}>
        {showBackButton && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* Center Section - Title */}
      <View style={styles.center}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Right Section - Icons */}
      <View style={[styles.right, isChatScreen && styles.chatRight]}>
        {isChatScreen ? (
          // Chat Screen Icons (Video + Call)
          <View style={styles.chatIconsContainer}>
            <TouchableOpacity onPress={onVideoPress} style={styles.iconButton}>
              <Ionicons name="videocam-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCallPress} style={styles.iconButton}>
              <Ionicons name="call-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          // Default Notification Icon
          <TouchableOpacity 
            onPress={onNotificationPress} 
            style={styles.notificationButton}
          >
            <Ionicons 
              name={hasNotifications ? "notifications" : "notifications-outline"} 
              size={24} 
              color="black" 
            />
            {hasNotifications && <View style={styles.notificationBadge} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 12,
  },
  left: {
    width: 50,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  right: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  chatRight: {
    width: 100,
  },
  chatIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  backButton: {
    padding: 4,
  },
});

export default CommonHeader;