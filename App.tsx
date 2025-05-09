import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarActiveTintColor: "#2196F3",
          tabBarStyle: {
            paddingTop: 10,
            height: 60,
            paddingBottom: 10
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="list" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-text" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={NotificationsScreen} // Placeholder
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}