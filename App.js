import 'react-native-gesture-handler';
import * as React from 'react';
import {Dimensions} from 'react-native';
import Profile from './Profile/index'
import Home from './Home';
import Explore from './Explore';
import Store from './Store/index'
import SideNavBar from './Drawer/sidebar'
import BottomNavbar from './bottomNavbar';

function HomeScreen() {
  return (
  <Home/>
  );
}
function HomeScreen1() {
  return (
  <Explore/>
  );
}
function SettingsScreen() {
  return (
   <Profile/>
  );
}
function StoreScreen() {
  return (
   <Store/>
  );
}

export default function App() {
  const deviceWidth=Dimensions.get('window').width
    return (
    <>
    {/* {deviceWidth>786?<SideNavBar/>:<BottomNavbar/>} */}
    <BottomNavbar/>     
    </>

    // <NavigationContainer>
    //   <Tab.Navigator
    //    initialRouteName="Login">
    //     <Tab.Screen name="Home" component={Home}  options={{ headerShown: false,
    //       tabBarLabel: 'Home',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="home"  color={color} size={size} />
    //       ),
    //     }}/>
    //     <Tab.Screen name="StoreProducts" component={StoreProducts}  options={{headerShown: false,
    //       tabBarLabel: 'StoreProducts',
    //       tabBarIcon: ({ color, size }) => (
    //         <AntDesign name="search1" color={color} size={size} />
    //       ),
    //     }}/>
    //      <Tab.Screen name="Login" component={Login}  options={{headerShown: false,
    //       tabBarLabel: 'Login',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="store" color={color} size={size} />
    //       ),
    //     }} />
    //     <Tab.Screen name="Projects" component={Projects}  options={{headerShown: false,
    //       tabBarLabel: 'Projects',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialIcons name="design-services" color={color} size={size} />
    //       ),
    //     }}/>
    //     <Tab.Screen name="Profile" component={Profile}  options={{headerShown: false,
    //       tabBarLabel: 'Profile',
    //       tabBarIcon: ({ color, size }) => (
    //         <Octicons name="people" color={color} size={size} />
    //       ),
    //     }} />
        
        
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}