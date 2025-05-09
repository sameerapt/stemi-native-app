import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
;

import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
    ChatScreen: { patientName?: string };
    EmsDetailScreen: { patientName?: string };
    // add other screens here if needed
};

type ChatScreenProps = StackScreenProps<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ route, navigation }: ChatScreenProps) => {
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);
    const { patientName } = route.params || { patientName: 'Mathew Pope' };

    // Sample messages data - you can replace with your actual data
    const [messages, setMessages] = useState([
        {
            id: '1',
            sender: 'Dr. Alvin Rowe',
            content: 'has just joined the Group Channel',
            timestamp: '12:51 AM',
            isSystemMessage: true
        },
        {
            id: '2',
            sender: 'Dr. Hugo Silver',
            content: 'has just joined the Group Channel',
            timestamp: '12:52 AM',
            isSystemMessage: true
        },
        {
            id: '3',
            sender: 'Dr. Hugo Silver',
            content: 'I see that ambulance is on the way, we will prepare for patient transfer.',
            timestamp: '12:55 AM',
            isSystemMessage: false
        }
    ]);

    const sendMessage = () => {
        if (message.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            sender: 'You', // Replace with actual user name
            content: message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSystemMessage: false
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    type Message = {
        id: string;
        sender: string;
        content: string;
        timestamp: string;
        isSystemMessage: boolean;
    };

    const renderMessage = ({ item }: { item: Message }) => {
        if (item.isSystemMessage) {
            return (
                <View style={styles.systemMessageContainer}>
                    <Text style={styles.systemMessageText}>
                        <Text style={styles.systemMessageSender}>{item.sender}</Text> {item.content}
                    </Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            );
        }

        const isCurrentUser = item.sender === 'You';

        return (
            <View style={[
                styles.messageContainer,
                isCurrentUser ? styles.outgoingMessage : styles.incomingMessage
            ]}>
                {!isCurrentUser && (
                    <Text style={styles.senderName}>{item.sender}</Text>
                )}
                <View style={[
                    styles.messageBubble,
                    isCurrentUser ? styles.outgoingBubble : styles.incomingBubble
                ]}>
                    <Text style={[
                        styles.messageText,
                        isCurrentUser ? styles.outgoingText : styles.incomingText
                    ]}>
                        {item.content}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader
                navigation={navigation}
                title={patientName ?? 'Mathew Pope'}
                isChatScreen={true}
                onCallPress={() => console.log('Initiate voice call')}
                onVideoPress={() => console.log('Initiate video call')}
            />

            <View style={styles.onlineInfo}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.onlineText}>5:0 min ago</Text>
            </View>

            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesList}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                style={styles.inputContainer}
            >
                <TouchableOpacity style={styles.attachButton}>
                    <Ionicons name="add-circle" size={24} color="#1A719F" />
                </TouchableOpacity>

                <View style={styles.textInputContainer}>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder="Send a message..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                    <TouchableOpacity style={styles.micButton}>
                        <Ionicons name="mic" size={20} color="#777" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                    disabled={message.trim() === ''}
                >
                    <Ionicons name="send" size={20} color={message.trim() ? "#1A719F" : "#999"} />
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {/* Bottom navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('EmsDetailScreen', { patientName })}
                >
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
    onlineInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        backgroundColor: '#F0F0F0',
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    onlineText: {
        fontSize: 12,
        color: '#666',
    },
    messagesList: {
        padding: 16,
    },
    messageContainer: {
        marginBottom: 16,
        maxWidth: '85%',
    },
    incomingMessage: {
        alignSelf: 'flex-start',
    },
    outgoingMessage: {
        alignSelf: 'flex-end',
    },
    senderName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1A719F',
        marginBottom: 2,
    },
    messageBubble: {
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    incomingBubble: {
        backgroundColor: '#1A719F',
        borderBottomLeftRadius: 4,
    },
    outgoingBubble: {
        backgroundColor: '#E5E5EA',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 15,
    },
    incomingText: {
        color: 'white',
    },
    outgoingText: {
        color: 'black',
    },
    systemMessageContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    systemMessageText: {
        fontSize: 12,
        color: '#666',
    },
    systemMessageSender: {
        fontWeight: '600',
        color: '#1A719F',
    },
    timestamp: {
        fontSize: 10,
        color: '#999',
        marginTop: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    attachButton: {
        padding: 6,
    },
    textInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 12,
        marginHorizontal: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 8,
        maxHeight: 100,
    },
    micButton: {
        padding: 6,
    },
    sendButton: {
        padding: 6,
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

export default ChatScreen;