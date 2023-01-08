import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/ListScreen';
import TodoScreen from '../screens/TodoScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
export default Tabs;