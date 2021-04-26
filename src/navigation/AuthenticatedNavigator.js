import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons'

import SignInScreen from '../screens/SignInScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AdvancedSearchScreen from '../screens/AdvancedSearchScreen';
import CreateGameScreen from '../screens/CreateGameScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import GamesDetails from '../screens/GamesDetails';
import ForgotPasswordScreenEditProfile from '../screens/ForgotPasswordScreenEditProfile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();


function Root() {
    return (
            <Tabs.Navigator
                tabBarOptions={{
                    showLabel: false
                }}
                screenOptions={({route}) => ({
                    tabBarIcon: () => {
                    let iconName;
                    if(route.name=="NotificationScreen") {
                        iconName="notifications"
                    } else if (route.name=="AdvancedSearchScreen"){
                        iconName="search"
                    } else if (route.name=="CreateGameScreen"){
                        iconName="add"
                    } else if (route.name=="ProfileScreen"){
                        iconName="person"
                    }
                    return <MaterialIcons name={iconName} size={24}/>
                    
                }
            })}
            >       
                <Tabs.Screen name="AdvancedSearchScreen" component={AdvancedSearchScreen} />                        
                <Tabs.Screen name="CreateGameScreen" component={CreateGameScreen} />
                <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
                
            </Tabs.Navigator>
    );
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Root" 
                component={Root} 
                options={{headerShown: false}}
                />              
                <Stack.Screen 
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="ForgotPasswordScreenEditProfile"
                component={ForgotPasswordScreenEditProfile}
                options={{headerShown:false}}
                />
                <Stack.Screen 
                name="AdvancedSearchScreen"
                component={AdvancedSearchScreen}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="GamesDetails"
                component={GamesDetails}
                options={{
                    title: 'Game Info',
                    headerStyle: {
                      backgroundColor: 'f2f2f2',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      alignSelf: 'center'
                    }, 
                }}
                />
                 <Stack.Screen 
                name="SignInScreen" 
                component={SignInScreen} 
                options={{headerShown: false, title: 'Login'}}/>
                <Stack.Screen 
                name="SignUpScreen"
                component={SignUpScreen}
                options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default AppNavigator;