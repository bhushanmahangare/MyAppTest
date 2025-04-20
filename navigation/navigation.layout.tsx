import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames, screens, tabScreens} from './navigation.config';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

const TopNav = createBottomTabNavigator();

import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/Home.screen';
import InternetStatus from '../screens/InternetConnection/InternetStatus.screen';

const Drawer = createDrawerNavigator();

function MyTopNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home1" component={HomeScreen} />
      <Drawer.Screen name="Profile1" component={InternetStatus} />
    </Drawer.Navigator>
  );

  return (
    <TopNav.Navigator
      screenOptions={{
        tabBarPosition: 'top',
      }}>
      {tabScreens.map(({Component, name}) => {
        return (
          <Tab.Screen
            options={{
              tabBarIcon(props) {
                switch (name) {
                  case ScreenNames.HOME:
                    return <Icon size={18} name="home"></Icon>;
                  case ScreenNames.INTERNET_STATUS:
                    return <Icon size={18} name="wifi"></Icon>;
                }
              },
            }}
            name={name}
            component={Component}
          />
        );
      })}
    </TopNav.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      {tabScreens.map(({Component, name}) => {
        return (
          <Tab.Screen
            options={{
              tabBarIcon(props) {
                switch (name) {
                  case ScreenNames.HOME:
                    return <Icon size={18} name="home"></Icon>;
                  case ScreenNames.INTERNET_STATUS:
                    return <Icon size={18} name="wifi"></Icon>;
                }
              },
            }}
            name={name}
            component={Component}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function NavigationLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenNames.HOME_TOP_NAVS}>
        {screens.map(({Component, name}) => {
          return (
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: 'tomato',
                },
                headerTintColor: '#fff',
              }}
              name={name}
              component={Component}
            />
          );
        })}

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: 'tomato',
            },
            headerTintColor: '#fff',
            headerShown: false,
          }}
          name={ScreenNames.HOME_TABS}
          component={MyTabs}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: 'tomato',
            },
            headerTintColor: '#fff',
            headerShown: false,
          }}
          name={ScreenNames.HOME_TOP_NAVS}
          component={MyTopNav}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
