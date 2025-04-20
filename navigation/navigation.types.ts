import {ComponentType} from 'react';
import {ScreenNames} from './navigation.config';

export type RootStackParamList = {
  [ScreenNames.PRODUCT_LIST]: undefined;
  [ScreenNames.PRODUCT_DETAIL]: {product: any};
  [ScreenNames.CONTACT_EXAMPLE]: undefined;
  [ScreenNames.USERS]: undefined;
  [ScreenNames.TODO]: undefined;
  [ScreenNames.HOME]: undefined;
  [ScreenNames.LOCATION_PRACTICE]: undefined;
  [ScreenNames.INTERNET_STATUS]: undefined;
  [ScreenNames.CLASS_COMPONENT]: undefined;
  [ScreenNames.MISC_SCREEN]: undefined;
  [ScreenNames.HOME_TABS]: undefined;
  [ScreenNames.SIDE_DRAWER]: undefined;
  [ScreenNames.CONTEXT_API_EXAMPLE]: undefined;
  [ScreenNames.COUNTER_APP_CONTEXT]: undefined;
};

export type TScreenName = keyof RootStackParamList;

export type TScreenConfig = {
  Component: ComponentType<any>;
  name: TScreenName;
  isTabScreen?: true;
};
