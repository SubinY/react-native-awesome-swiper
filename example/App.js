/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Swiper from 'react-native-awesome-swiper';
import { View, Text } from 'react-native';

const images = [
  { url: require('./assets/slide1.jpg') },
  { url: require('./assets/slide2.jpg') },
  { url: require('./assets/slide3.jpg') },
]

type Props = {};

export default class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Swiper images={images} height={400} />
      </View>
    );
  }
}
