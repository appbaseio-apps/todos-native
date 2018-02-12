import Expo from 'expo';
import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Spinner, Text } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import { ReactiveBase } from '@appbaseio/reactivesearch-native';

import CONFIG from '../constants/Config';
import COLORS from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';
import Header from '../components/Header';
import AddTodoButton from '../components/AddTodoButton';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },
);

export default class RootNavigator extends React.Component {
  state = {
    isReady: false,
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
    });

    this.setState({ isReady: true });
  }

  renderStatusBar = () => <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />;

  render = () => {
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {this.renderStatusBar()}
          <Spinner color={COLORS.primary} />
        </View>
      );
    }

    const spaceFixer = Platform.OS === 'ios' ? -45 : -80;

    return (
      <ReactiveBase app={CONFIG.app} credentials={CONFIG.credentials} type={CONFIG.type}>
        <PaperProvider>
          <Container style={{ marginTop: spaceFixer }}>
            <RootStackNavigator />
          </Container>
        </PaperProvider>
      </ReactiveBase>
    );
  };
}
