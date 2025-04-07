import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface IFlexProps {
  children: ReactNode;
  flexDirection?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  padding?: number;
  margin?: number;
  marginVertical?: number;
  gap?: number;
  style?: ViewStyle;
}

const Flexbox: React.FC<IFlexProps> = ({
  children,
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  padding = 0,
  margin = 0,
  gap = 0,
  marginVertical,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.flex,
        {
          flexDirection,
          justifyContent,
          alignItems,
          padding,
          margin,
          gap,
          marginVertical,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
  } as ViewStyle,
});

export default Flexbox;
