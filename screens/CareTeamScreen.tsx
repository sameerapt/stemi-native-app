import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

const CareTeamScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for care team members
  const initialMembers = [
    {
      id: '1',
      name: 'Dr. Hugo Silver',
      role: 'Referring MD | Cypress hospital',
      phone: '(516) 232-4100',
      email: 'hugosilver@cypressbay.org'
    },
    {
      id: '2',
      name: 'Dr. Parasuram Krishnamoorthy',
      role: 'Accepting MD | Everglade Medical Center',
      phone: '(516) 232-4100',
      email: 'alvinerowe@cypressbay.org'
    },
    {
      id: '3',
      name: 'Dr. Vera Cartwright',
      role: 'Accepting MD | Everglade Medical Center',
      phone: '(516) 232-4100',
      email: 'hugosilver@cypressbay.org'
    }
  ];

  const [members, setMembers] = useState(initialMembers);

  // Filter team members based on search query
interface CareTeamMember {
    id: string;
    name: string;
    role: string;
    phone: string;
    email: string;
}

interface CareTeamScreenProps {
    navigation: any;
}

const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
        setMembers(initialMembers);
    } else {
        const filteredMembers = initialMembers.filter((member: CareTeamMember) => 
            member.name.toLowerCase().includes(text.toLowerCase()) || 
            member.role.toLowerCase().includes(text.toLowerCase()) ||
            member.email.toLowerCase().includes(text.toLowerCase())
        );
        setMembers(filteredMembers);
    }
};

  // Render individual team member item
  const renderMemberItem = ({ item }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
        <Text style={styles.memberDetail}>Phone: {item.phone}</Text>
        <Text style={styles.memberDetail}>Email: {item.email}</Text>
      </View>
      <TouchableOpacity style={styles.videoCallButton}>
        <Ionicons name="videocam-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  // Separator component for the list
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader 
        navigation={navigation} 
        title="Care Team Members" 
        showBackButton={false}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search care team members..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>
      
      {/* Team Members List */}
      <FlatList
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={ItemSeparator}
      />
      
      {/* Admin Button */}
      <View style={styles.adminButtonContainer}>
        <TouchableOpacity style={styles.adminButton}>
          <Ionicons name="person" size={20} color="white" />
          <Text style={styles.adminButtonText}>DM Admin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  memberCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  memberDetail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  videoCallButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  separator: {
    height: 12,
  },
  adminButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  adminButton: {
    backgroundColor: '#3d8fbc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  adminButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default CareTeamScreen;