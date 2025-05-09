import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

type EmsDetailScreenProps = {
    route: {
        params?: {
            patientName?: string;
        };
    };
    navigation: any;
};

const EmsDetailScreen: React.FC<EmsDetailScreenProps> = ({ route, navigation }) => {
    const { patientName = "Alicia Peterson" } = route.params || {};
    // Use the same static image for now (replace with actual map integration if needed)
    const mapImageUrl = "https://a.storyblok.com/f/117609/2028x1242/eb3996dc4a/integrating-google-maps-react.png";

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader
                navigation={navigation}
                title={patientName}
                isChatScreen={true}
                onCallPress={() => console.log('Initiate voice call')}
                onVideoPress={() => console.log('Initiate video call')}
            />

            {/* Map Container */}
            <View style={styles.mapContainer}>
                <Image
                    source={{ uri: mapImageUrl }}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                {/* Overlay travel details on the map */}
                <View style={styles.travelDetailsOverlay}>
                    <View style={styles.travelDetailBox}>
                        <Text style={styles.travelDetailText}>33 min</Text>
                    </View>
                    <View style={styles.travelDetailBox}>
                        <Text style={styles.travelDetailText}>5 miles</Text>
                    </View>
                </View>
                <View style={styles.mapOverlay}>
                    <TouchableOpacity style={styles.navigationButton}>
                        <Ionicons name="navigate" size={24} color="#1A719F" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* EMS Details Card */}
            <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>EMS Details</Text>
                <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailValue}>08:08</Text>
                        <Text style={styles.detailLabel}>Arrival</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailItem}>
                        <Text style={styles.detailValue}>2 min</Text>
                        <Text style={styles.detailLabel}>Duration</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailItem}>
                        <Text style={styles.detailValue}>500</Text>
                        <Text style={styles.detailLabel}>Meters</Text>
                    </View>
                </View>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton}>
                    <FontAwesome5 name="ambulance" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <FontAwesome name="group" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <AntDesign name="adduser" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="attach" size={24} color="#333" />
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
    mapContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        position: 'relative',
    },
    mapImage: {
        flex: 1,
        width: '100%',
    },
    travelDetailsOverlay: {
        position: 'absolute',
        top: 16,
        left: 16,
        flexDirection: 'column',
        gap: 8,
    },
    travelDetailBox: {
        backgroundColor: 'white',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    travelDetailText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    mapOverlay: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    navigationButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        elevation: 3,
    },
    detailsCard: {
        backgroundColor: 'black',
        borderRadius: 24,
        marginHorizontal: 16,
        marginVertical: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 12,
        textAlign:'center'
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailValue: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        marginBottom: 4,
    },
    detailLabel: {
        fontSize: 14,
        color: 'white',
    },
    separator: {
        width: 1,
        backgroundColor: 'white',
        marginVertical: 8,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    navButton: {
        padding: 8,
    },
});

export default EmsDetailScreen;