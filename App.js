import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DealsStack } from './components/all_for_deals/DealsComponent';
import { DrawerComponent } from './components/all_for_ideas/IdeasComponent';
import { Info } from './components/all_for_info/InformationComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

//Redux Block
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react';
//Redux End

const Tab = createBottomTabNavigator();
const { persistor, store } = ConfigureStore();
// const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
      persistor={persistor}>
        <NavigationContainer>
            <Tab.Navigator initialRouteName="deals" tabBarOptions={{activeTintColor: '#0059ff'}}>
                <Tab.Screen name="deals" component={DealsStack} options={{tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="archive" color={color} size={size} />),}}/>
                <Tab.Screen name="ideas" component={DrawerComponent} options={{tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="diamond" color={color} size={size} />),}}/>
                <Tab.Screen name="info" component={Info} options={{tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="information-outline" color={color} size={size} />),}}/>
            </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
