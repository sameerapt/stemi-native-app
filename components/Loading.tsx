import { View, Text, ActivityIndicator } from 'react-native';

const Loading = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#2196F3" />
    <Text style={{ marginTop: 10 }}>Loading...</Text>
  </View>
);

export default Loading;