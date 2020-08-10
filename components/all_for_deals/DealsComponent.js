import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ListOfDeals } from './ListOfDeals';
import { DealInformation } from './DealInformation';
import { AddNewDeal } from './AddNewDeal';

const Stack = createStackNavigator();

export const DealsStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List of your deals" component={ListOfDeals} />
      <Stack.Screen name="Add new deal" component={AddNewDeal} />
      <Stack.Screen name="Deal information" component={DealInformation} />
    </Stack.Navigator>
  );
}