import ClassComponent from '../screens/ClassComponent/ClassComponents.screen';
import ContactExample from '../screens/ContactExample/ContactExample.screen';
import ContextApiExampleScreen from '../screens/ContextApi.screen';
import CounterAppContextScreen from '../screens/CounterAppContext/CounterAppContext.screen';
import HomeScreen from '../screens/Home.screen';
import InternetStatus from '../screens/InternetConnection/InternetStatus.screen';
import LocationPractice from '../screens/LocationPractice/LocationPractice.screen';
import MiscScreen from '../screens/Misc.screen';
import ProductDetailScreen from '../screens/ProductScreens/ProductDetails.screen';
import ProductListScreen from '../screens/ProductScreens/ProductList.screen';
import SideDrawerScreen from '../screens/SideDrawer.screen';
import TodoScreen from '../screens/Todo.screen';
import UsersScreen from '../screens/Users/Users.screen';
import {TScreenConfig} from './navigation.types';
import Touchables from '../screens/ButtonExample/LongPressButtonExample';
import ScrollViewWithAnimatedEventExample from '../screens/ScrollViewWithAnimatedEventExample/ScrollVieWithAnimatedEventExample';
import PanResponderWithAnimatedEventExample from '../screens/PanResponderWithAnimatedEventExample/PanResponderWithAnimatedEventExample';
import LayoutAnimations from '../screens/LayoutAnimations/LayoutAnimations';
import { DeviceInfoExample } from '../screens/ReactNativeDeviceInfo/react-native-device-info';
import { DocumentPickerViewer } from '../screens/DocumentPickerViewer/DocumentPickerViewer';
import { ReadFileAndDisplay } from '../screens/DocumentPickerViewer/ReadFileAndDisplay';
import AsyncStorageExample from '../screens/Day_15_Async_Storage/1.async-storage-example';
import AsyncStorageExample2 from '../screens/Day_15_Async_Storage/2.async-storage-example2';



export const ScreenNames = {
  PRODUCT_LIST: 'ProductList',
  PRODUCT_DETAIL: 'ProductDetails',
  CONTACT_EXAMPLE: 'ContactExample',
  USERS: 'Users',
  TODO: 'Todo',
  HOME: 'Home',
  LOCATION_PRACTICE: 'LocationPlayground',
  INTERNET_STATUS: 'InternetStatus',
  CLASS_COMPONENT: 'ClassComponent',
  MISC_SCREEN: 'MISC_SCREEN',
  HOME_TABS: 'HOME_TABS',
  HOME_TOP_NAVS: 'HOME_TOP_TABS',
  SIDE_DRAWER: 'SIDE_DRAWER',
  CONTEXT_API_EXAMPLE: 'CONTEXT_API_EXAMPLE',
  COUNTER_APP_CONTEXT: 'COUNTER_APP_CONTEXT',
  TOUCHABLES: 'TOUCHABLES',
  SCROLL_VIEW_WITH_ANIMATED_EVENT: 'ScrollViewWithAnimatedEventExample',
  PAN_RESPONDER_WITH_ANIMATED_EVENT: 'PanResponderWithAnimatedEventExample',
  LAYOUT_ANIMATIONS: 'LayoutAnimations',
  DEVICE_INFO_EXAMPLE: 'DeviceInfoExample',
  DOCUMENT_PICKER_VIEWER: 'DocumentPickerViewer',
  READ_FILE_AND_DISPLAY: 'ReadFileAndDisplay',
  ASYNC_STORAGE_EXAMPLE: 'AsyncStorageExample',
  ASYNC_STORAGE_EXAMPLE2: 'AsyncStorageExample2',
} as const;

const _screens: TScreenConfig[] = [
  {
    Component: ProductListScreen,
    name: ScreenNames.PRODUCT_LIST,
  },
  {
    Component: ProductDetailScreen,
    name: ScreenNames.PRODUCT_DETAIL,
  },
  {
    Component: CounterAppContextScreen,
    name: ScreenNames.COUNTER_APP_CONTEXT,
  },
  {
    Component: ContextApiExampleScreen,
    name: ScreenNames.CONTEXT_API_EXAMPLE,
  },
  {
    Component: SideDrawerScreen,
    name: ScreenNames.SIDE_DRAWER,
  },
  {
    Component: ContactExample,
    name: ScreenNames.CONTACT_EXAMPLE,
  },
  {
    Component: UsersScreen,
    name: ScreenNames.USERS,
  },
  {
    Component: TodoScreen,
    name: ScreenNames.TODO,
  },
  {
    Component: HomeScreen,
    isTabScreen: true,
    name: ScreenNames.HOME,
  },
  {
    Component: LocationPractice,
    name: ScreenNames.LOCATION_PRACTICE,
  },
  {
    Component: InternetStatus,
    name: ScreenNames.INTERNET_STATUS,
    isTabScreen: true,
  },
  {
    Component: ClassComponent,
    name: ScreenNames.CLASS_COMPONENT,
  },
  {
    Component: MiscScreen,
    name: ScreenNames.MISC_SCREEN,
  },
  {
    Component: Touchables,
    name: ScreenNames.TOUCHABLES,
  },
  {
    Component: ScrollViewWithAnimatedEventExample,
    name: ScreenNames.SCROLL_VIEW_WITH_ANIMATED_EVENT,
  },
  {
    Component: PanResponderWithAnimatedEventExample,
    name: ScreenNames.PAN_RESPONDER_WITH_ANIMATED_EVENT,
  },
  {
    Component: DeviceInfoExample,
    name: ScreenNames.DEVICE_INFO_EXAMPLE,
  },
  {
    Component: DocumentPickerViewer,
    name: ScreenNames.DOCUMENT_PICKER_VIEWER,
  },
  {
    Component: ReadFileAndDisplay,
    name: ScreenNames.READ_FILE_AND_DISPLAY,
  },
  {
    Component: AsyncStorageExample,
    name: ScreenNames.ASYNC_STORAGE_EXAMPLE,
  },
  {
    Component: AsyncStorageExample2,
    name: ScreenNames.ASYNC_STORAGE_EXAMPLE2,
  },
];

export const tabScreens = _screens.filter(screen => screen.isTabScreen);
export const screens = _screens.filter(screen => !screen.isTabScreen);