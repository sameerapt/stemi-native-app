// App.js with properly spaced tabs and hidden ChatScreen
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './components/AppNavigator';
import NotificationsScreen from './screens/NotificationScreen';
import GroupChannelScreen from './screens/GroupChannelScreen';
import CareTeamScreen from './screens/CareTeamScreen';
import ChatScreen from './screens/ChatScreen'; // Import ChatScreen
import EmsDetailScreen from './screens/EmsDetailScreen';
// Create a separate stack for ChatScreen
const ChatStack = createStackNavigator();
const ChatScreenStack = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatStack.Screen name="ChatScreenMain" component={ChatScreen} />
  </ChatStack.Navigator>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Create a root stack that contains both the tabs and the chat screen */}
      <RootNavigator />
    </NavigationContainer>
  );
}

// Create a root stack navigator
const RootStack = createStackNavigator();
const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main tabs */}
      <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
      {/* Modal screens that shouldn't appear in the tab bar */}
      <RootStack.Screen name="ChatScreen" component={ChatScreenStack} />
      <RootStack.Screen name="EmsDetailScreen" component={EmsDetailScreen} />
    </RootStack.Navigator>
  );
};

// This function contains only the visible tabs
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: "#1A719F",
        tabBarStyle: {
          paddingTop: 10,
          height: 60,
          paddingBottom: 10
        }
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={AppNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="GroupChannels"
        component={GroupChannelScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Channels",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="CareTeam"
        component={CareTeamScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Care Team",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};