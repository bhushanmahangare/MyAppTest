import React from 'react';
import useInternetInfo from '../../hooks/useInternetInfo';
import Text from '../../components/atoms/Text/Text.component';
import Flexbox from '../../components/atoms/FlexBox/Flexbox.component';

export default function InternetStatus() {
  const internetStatus = useInternetInfo();
  return (
    <Flexbox padding={16} gap={16} justifyContent="center" alignItems="center">
      <Text fontSize={20} fontWeight="700">
        Internet Status
      </Text>
      <Text fontSize={20}>{JSON.stringify(internetStatus, null, 4)}</Text>
    </Flexbox>
  );
}
