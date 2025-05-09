import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

interface Item {
  name: string;
  caseId: string;
  timeElapsed: string;
  facility: string;
  timestamp: string;
  status: 'Pending Review' | 'Under Review' | 'Accepted';
  hasEye?: boolean;
  hasMessage?: boolean;
  hasLocation?: boolean;
}

const HomeScreen = ({ navigation }) => {
  const alarmItems: Item[] = [
    {
      name: 'Mathew Pope',
      caseId: '123456',
      timeElapsed: '0 min 13 sec',
      facility: 'Cypress Hospital',
      timestamp: '',
      status: 'Pending Review',
      hasEye: true,
      hasMessage: true
    },
    {
      name: 'Graham Bell',
      caseId: '123456', 
      timeElapsed: '6 min 13 sec',
      facility: 'Cypress Hospital',
      timestamp: 'Raised On: 12:30AM, 12/31/23',
      status: 'Under Review',
      hasEye: true,
      hasMessage: true,
      hasLocation: true
    },
    {
      name: 'Alicia Peterson',
      caseId: '123456',
      timeElapsed: '13 min 13 sec',
      facility: 'Cypress Hospital',
      timestamp: 'Raised On: 12:50AM, 12/31/23',
      status: 'Accepted',
      hasEye: true,
      hasMessage: true,
      hasLocation: true
    }
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Pending Review':
        return styles.pendingStatus;
      case 'Under Review':
        return styles.underReviewStatus;
      case 'Accepted':
        return styles.acceptedStatus;
      default:
        return {};
    }
  };

  const getStatusTextStyle = (status: string) => {
    switch(status) {
      case 'Pending Review':
        return styles.pendingText;
      case 'Under Review':
        return styles.underReviewText;
      case 'Accepted':
        return styles.acceptedText;
      default:
        return {};
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.iconContainer}>
          {item.hasEye && <View style={styles.icon}><Ionicons name="eye" size={18} color="#1A719F" /></View>}
          {item.hasMessage && <View style={styles.icon}><Ionicons name="chatbubble-ellipses" size={18} color="#1A719F" /></View>}
        </View>
      </View>
      
      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Case ID:</Text>
        <Text style={styles.detailValue}>{item.caseId}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Time Elapsed:</Text>
        <Text style={styles.detailValue}>{item.timeElapsed}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Pickup Facility:</Text>
        <Text style={styles.detailValue}>{item.facility}</Text>
        {item.hasLocation && 
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={16} color="#1A719F" />
          </View>
        }
      </View>

      <View style={[styles.footerContainer, { borderRadius: 10 }]}>
        <Text style={styles.timestampText}>{item.timestamp}</Text>
      </View>
      <View style={[styles.statusBorder, getStatusStyle(item.status)]}>
        <Text style={[styles.statusText, getStatusTextStyle(item.status)]}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <CommonHeader navigation={navigation} title="Alarms" />

      <FlatList
        data={alarmItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        // Add padding at the bottom to make room for the button
        contentInset={{ bottom: 90 }}
        contentInsetAdjustmentBehavior="automatic"
        ListFooterComponent={<View style={{ height: 90 }} />}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('PatientDetails')}
      >
        <Image 
          source={require('../assets/Raise-Stemi-Alarm.png')} 
          style={styles.fabImage}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 90, // Additional padding to ensure content doesn't hide behind the button
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden', // Make sure status bar doesn't overflow
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#212121',
    flex: 1,
  },
  locationIcon: {
    marginLeft: 4,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  timestampText: {
    fontSize: 12,
    color: '#757575',
  },
  statusBorder: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginHorizontal: -16,
    marginBottom: -16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  pendingStatus: {
    backgroundColor: "#949494"
  },
  underReviewStatus: {
    backgroundColor: '#E07C34',
  },
  acceptedStatus: {
    backgroundColor: '#149D5C',
  },
  pendingText: {
    color: '#ffff',
  },
  underReviewText: {
    color: '#ffff',
  },
  acceptedText: {
    color: '#ffff',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20, // Moved up from 70 to make it more visible
    right: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Ensure it appears above other elements
  },
  fabImage: {
    width: 110,
    height: 110,
  }
});

export default HomeScreen;