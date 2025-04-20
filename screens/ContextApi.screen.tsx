import React, {createContext, Fragment, useContext, useState} from 'react';
import {Text, View} from 'react-native';

const textStyle = {
  fontSize: 28,
};

function Parent() {
  console.log('Rendering parent');
  return (
    <Fragment>
      <Text style={textStyle}>Parent</Text>
      <Child />
    </Fragment>
  );
}

const Parent1 = React.memo(function Parent1() {
  console.log('Rendering parent1');
  return <Text style={textStyle}>Parent1</Text>;
});

function Child() {
  const value = useContext(AppContext);
  console.log('Rendering child');
  return (
    <View>
      <Text style={textStyle}>Child</Text>
      <Text style={textStyle}>{JSON.stringify(value, null, 2)}</Text>
    </View>
  );
}

const AppContext = createContext<any>({});

export default function ContextApiExampleScreen() {
  const [age, setAge] = useState(26);

  return (
    <AppContext.Provider
      value={{
        name: 'virendra',
        age,
      }}>
      <View>
        <Text
          style={textStyle}
          onPress={() => {
            setAge(age + 1);
          }}>
          click To change
        </Text>
        <Text style={textStyle}>ContextAPI Example</Text>
        <Parent />
        <Parent1 />
        <Child />
      </View>
    </AppContext.Provider>
  );
}
