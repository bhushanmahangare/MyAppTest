import React, {ReactNode} from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';

interface ITextProps {
  children: ReactNode;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  color?: string;
  style?: TextStyle;
}

const Text: React.FC<ITextProps> = ({
  children,
  fontSize = 16,
  fontWeight = 'normal',
  textAlign = 'left',
  color = '#000',
  style,
  ...props
}) => {
  return (
    <RNText
      style={[styles.text, {fontSize, fontWeight, textAlign, color}, style]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#000',
  } as TextStyle,
});

export default Text;
