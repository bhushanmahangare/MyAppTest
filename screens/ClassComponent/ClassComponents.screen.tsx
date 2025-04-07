import React, {Component} from 'react';
import {Button, View} from 'react-native';
import Text from '../../components/atoms/Text/Text.component';

class Counter extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: '#black',
          margin: 16,
          padding: 12,
          borderRadius: 8,
        }}>
        <Button onPress={this.increment} title="Click to Increment"></Button>
        <Text textAlign="center" fontSize={24}>
          {this.state.count}
        </Text>
      </View>
    );
  }
}

class CounterBy4 extends Counter {
  increment(): void {
    this.setState({
      count: this.state.count + 4,
    });
  }
}

export default class ClassComponent extends Component {
  render() {
    return (
      <View>
        <Text fontSize={20}>ClassComponent</Text>
        <Counter></Counter>
        <CounterBy4></CounterBy4>
      </View>
    );
  }
}
