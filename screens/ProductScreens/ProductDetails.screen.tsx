import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  NativeModules,
} from 'react-native';
import {useAppNavigation} from '../../navigation/useAppNavigation';
import {getColors} from 'react-native-image-colors';

const useImageColors = () => {
  const [colors, setColors] = React.useState(null);

  React.useEffect(() => {
    const url = 'https://i.imgur.com/68jyjZT.jpg';

    getColors(url, {
      fallback: '#228B22',
      cache: true,
      key: url,
    }).then(setColors);
  }, []);

  return colors;
};

const ProductDetailScreen = ({route}) => {
  const {product = {}} = route?.params || {};
  useImageColors();

  const [headerBgColor, setHeaderBgColor] = useState('');

  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProductDetailScreen;
