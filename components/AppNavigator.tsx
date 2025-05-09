import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PatientDetailsForm from '../screens/PatientDetailsForm';
import ChatScreen from '../screens/ChatScreen';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PatientDetails" 
        component={PatientDetailsForm} 
        options={{ headerShown: false }}
      />
        <Stack.Screen 
        name="ChatScreen" 
        component={(props: any) => <ChatScreen {...props} />} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}