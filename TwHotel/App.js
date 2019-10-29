import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Apps from './src/screens';

const RootNavigation = createAppContainer(
  createSwitchNavigator(
    {
      index: {
        screen: Apps,
      },
    },
    {
      initialRouteName: 'index',
    },
  ),
);

export default RootNavigation;
