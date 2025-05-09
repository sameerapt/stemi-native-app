import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

import type { NavigationProp } from '@react-navigation/native';

interface GroupChannelScreenProps {
    navigation: NavigationProp<any>;
}

const GroupChannelScreen: React.FC<GroupChannelScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Active');
  
  // Sample data for group channels
  const groupChannels = [
    {
      id: '1',
      patientName: 'Mathew Pope',
      caseId: '1234565',
      isAdmin: false,
      members: [
        { id: '1', avatar: 'https://i.pravatar.cc/30?img=1' },
        { id: '2', avatar: 'https://i.pravatar.cc/30?img=2' }
      ],
      joined: true
    },
    {
      id: '2',
      patientName: 'John Doe',
      caseId: '1234565',
      isAdmin: false,
      members: [
        { id: '1', avatar: 'https://i.pravatar.cc/30?img=3' },
        { id: '2', avatar: 'https://i.pravatar.cc/30?img=4' },
        { id: '3', avatar: 'https://i.pravatar.cc/30?img=5' },
        { id: '4', avatar: 'https://i.pravatar.cc/30?img=6' },
        { id: '5', avatar: 'https://i.pravatar.cc/30?img=7' },
        { id: '6', avatar: 'https://i.pravatar.cc/30?img=8' },
      ],
      joined: false
    },
    {
      id: '3',
      patientName: 'Andrew Smith',
      caseId: '1234565',
      isAdmin: true,
      members: [
        { id: '1', avatar: 'https://i.pravatar.cc/30?img=9' },
        { id: '2', avatar: 'https://i.pravatar.cc/30?img=10' }
      ],
      joined: false
    }
  ];

  // Handle joining a group channel
interface Member {
    id: string;
    avatar: string;
}

interface GroupChannel {
    id: string;
    patientName: string;
    caseId: string;
    isAdmin: boolean;
    members: Member[];
    joined: boolean;
}

interface GroupChannelScreenProps {
    navigation: {
        navigate: (screen: string, params?: Record<string, any>) => void;
    };
}

const handleJoinChannel = (item: GroupChannel) => {
    // Navigate to the chat screen with patient information
    navigation.navigate('ChatScreen', { 
        patientName: item.patientName,
        caseId: item.caseId
    });
};

  const renderGroupItem = ({ item }: { item: GroupChannel }) => (
    <View style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <View>
          <Text style={styles.patientName}>
            {item.patientName} {item.isAdmin && <Text style={styles.adminText}>(Admin)</Text>}
          </Text>
          <Text style={styles.caseId}>Case ID: {item.caseId}</Text>
        </View>
        
        {!item.joined ? (
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => handleJoinChannel(item)}
          >
            <Text style={styles.joinButtonText}>Join Group Channel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => handleJoinChannel(item)}
          >
            <Text style={styles.viewButtonText}>View Channel</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.membersSection}>
        <Text style={styles.membersLabel}>Current Members</Text>
        <View style={styles.avatarsRow}>
          {item.members.slice(0, 5).map((member, index) => (
            <Image 
              key={`${item.id}-${member.id}`}
              source={{ uri: member.avatar }} 
              style={[styles.avatar, { zIndex: 10 - index }]}
            />
          ))}
          {item.members.length > 5 && (
            <View style={styles.extraMembersCount}>
              <Text style={styles.extraMembersText}>+{item.members.length - 5}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <CommonHeader 
        navigation={navigation}
        title="Group Channels"
        onNotificationPress={() => navigation.navigate('Notifications')}
      />
      
      <FlatList
        data={groupChannels}
        renderItem={renderGroupItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Active' && styles.activeTab]}
          onPress={() => setActiveTab('Active')}
        >
          <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Archive' && styles.activeTab]}
          onPress={() => setActiveTab('Archive')}
        >
          <Text style={[styles.tabText, activeTab === 'Archive' && styles.activeTabText]}>Archive</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    padding: 16,
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  adminText: {
    fontWeight: '400',
  },
  caseId: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: '#1A719F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#1A719F',
    fontSize: 12,
    fontWeight: '500',
  },
  membersSection: {
    marginTop: 8,
  },
  membersLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: -8,
    borderWidth: 1,
    borderColor: 'white',
  },
  extraMembersCount: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  extraMembersText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  activeTab: {
    backgroundColor: '#1A719F',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
});

export default GroupChannelScreen;