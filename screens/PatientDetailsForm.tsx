import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

const PatientDetailsForm = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    mrn: '622656',
    fullName: 'Matthew Pope',
    dob: '13 Aug 1990',
    phone: '(111)2121212',
    firstContact: '12:46 AM EST',
    location: 'Mount Sinai Queens',
    cathLab: 'The Mount Sinai Hospital',
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };
  
  // Add a function to remove a specific image
  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <CommonHeader navigation={navigation} title="Patient Details" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.formRow}>
          <Text style={styles.label}>MRN*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.mrn}
              onChangeText={(text) => setFormData(prev => ({ ...prev, mrn: text }))}
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Patient Full Name*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
            />
            <Ionicons name="person-outline" size={20} color="#777" style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Date of Birth*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.dob}
              onChangeText={(text) => setFormData(prev => ({ ...prev, dob: text }))}
            />
            <Ionicons name="calendar-outline" size={20} color="#777" style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Phone Number*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
            />
            <Ionicons name="call-outline" size={20} color="#777" style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>First Medical Contact*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.firstContact}
              onChangeText={(text) => setFormData(prev => ({ ...prev, firstContact: text }))}
            />
            <Ionicons name="time-outline" size={20} color="#777" style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Patient Location*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
            />
            <Ionicons name="chevron-down-outline" size={20} color="#777" style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Cath Lab Location*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.cathLab}
              onChangeText={(text) => setFormData(prev => ({ ...prev, cathLab: text }))}
            />
            <Ionicons name="chevron-down-outline" size={20} color="#777" style={styles.inputIcon} />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Upload ECG/EKG Pic*</Text>
          <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
            {images.length > 0 ? (
              <View style={styles.thumbnailContainer}>
                {images.map((img, index) => (
                  <View key={index} style={styles.thumbnailWrapper}>
                    <Image source={{ uri: img }} style={styles.thumbnail} />
                    <TouchableOpacity 
                      style={styles.removeImageButton} 
                      onPress={() => removeImage(index)}
                    >
                      <Ionicons name="close-circle" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
                {/* Add upload icon if there's space for more images */}
                <Ionicons name="image-outline" size={22} color="#777" style={styles.uploadIcon} />
              </View>
            ) : (
              <View style={styles.uploadButtonContent}>
                <Ionicons name="image-outline" size={22} color="#777" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.alarmButton}>
          <Text style={styles.alarmButtonText}>Raise STEMI Alarm</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    height: 56,
  },
  backButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 28,
  },
  formContainer: {
    padding: 16,
  },
  formRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#222222',
    marginBottom: 4,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    backgroundColor: 'white',
    height: 80,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  uploadButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  thumbnailWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  uploadIcon: {
    marginLeft: 'auto',
  },
  alarmButton: {
    backgroundColor: '#0277BD',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  alarmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default PatientDetailsForm;