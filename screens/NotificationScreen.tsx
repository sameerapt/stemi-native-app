import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationsScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  useEffect(() => {
    registerForPushNotifications().then(token => token && setExpoPushToken(token));

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => subscription.remove();
  }, []);

  const handleScheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Case Alert",
        body: "Emergency case received - MRN: 123456",
        sound: 'default',
        data: { type: 'emergency' },
      },
      trigger: { 
        type: 'timeInterval',
        seconds: 1 
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Settings</Text>
      <Text style={styles.token}>Push Token: {expoPushToken}</Text>
      
      <Button
        title="Send Test Notification"
        onPress={handleScheduleNotification}
        color="#2196F3"
      />

      {notification && (
        <View style={styles.notificationCard}>
          <Text style={styles.notificationTitle}>{notification.request.content.title}</Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  token: { 
    backgroundColor: '#ECF0F1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    color: '#7F8C8D'
  },
  notificationCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  }
});

async function registerForPushNotifications() {
  let token;
  if (Device.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}

export default NotificationsScreen;