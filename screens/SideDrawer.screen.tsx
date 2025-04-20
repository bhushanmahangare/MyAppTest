import {createDrawerNavigator} from '@react-navigation/drawer';
import Text from '../components/atoms/Text/Text.component';

const Drawer = createDrawerNavigator();

function Screen1() {
  return <Text>Screen 1</Text>;
}

function Screen2() {
  return <Text>Screen 2</Text>;
}

export default function SideDrawerScreen() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Screen1} />
      <Drawer.Screen name="Profile" component={Screen2} />
    </Drawer.Navigator>
  );
}
