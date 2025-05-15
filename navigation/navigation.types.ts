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
  [ScreenNames.TOUCHABLES]: undefined;
  [ScreenNames.HOME_TOP_NAVS]: undefined;
  [ScreenNames.SCROLL_VIEW_WITH_ANIMATED_EVENT]: undefined;
  [ScreenNames.PAN_RESPONDER_WITH_ANIMATED_EVENT]: undefined;
  [ScreenNames.LAYOUT_ANIMATIONS]: undefined;
  [ScreenNames.DEVICE_INFO_EXAMPLE]: undefined;
  [ScreenNames.DOCUMENT_PICKER_VIEWER]: undefined;
  [ScreenNames.READ_FILE_AND_DISPLAY]: {uri: string; name: string};
  [ScreenNames.ASYNC_STORAGE_EXAMPLE]: undefined;
  [ScreenNames.ASYNC_STORAGE_EXAMPLE2]: undefined;
};


export type TScreenName = keyof RootStackParamList;

export type TScreenConfig = {
  Component: ComponentType<any>;
  name: TScreenName;
  isTabScreen?: true;
};
