import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View,AppRegistry  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import Projects from './Projects/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StoreProducts from './Store/products'
const Tab = createBottomTabNavigator();
import Login from './Login/index'
import Profile from './Profile/index'
import Home from './Home';
import Explore from './Explore';
import Store from './Store/index'
import OTPScreen from './OtpAuth/'
import Signup from './Signup/index'
import ProductDetailView from './Store/productDetailView'
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
import UpcomingProjects from './Projects/UpcomingProjects/index'
import OngoingProjects from './Projects/OngoingProjects/index'
import UpcomingSpacesses from './Projects/UpcomingProjects/spacesses'
import SpaceDetails from './Projects/UpcomingProjects/spaceDetails'
import OngoingSpace from './Projects/OngoingProjects/OngoingSpacs'
import FinalizedDesigns from './Projects/finalizedDesigns'
import SampleCreateSpace from './SampleCreateSpace/index'
import Dashboard from './Dashboard/index'
import SideProfile from './SideProfile/index'
import Payments from './Payments/index'
import AllEstimates from './Estimates/index'
import Activity from './Activity/index'
import Notifications from './Notifications/index'
import SavedPosts from './SavedPosts/index'
import SavedPostHome from './Home/savedPosts'
import UserProfileEditor from './SampleImageUpload/index'
import LikedPosts from './Activity/likedPosts'

const StoreStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Store" component={Store} />
    <HomeStack.Screen name="StoreProducts" component={StoreProducts} />
    <HomeStack.Screen name="ProductDetailView" component={ProductDetailView} />
  </HomeStack.Navigator>
);
const ProjectStackScreen=()=>(
  <HomeStack.Navigator>
 <HomeStack.Screen name="Projects" component={Projects} />
  <HomeStack.Screen name="UpcomingProjects" component={UpcomingProjects} />
  <HomeStack.Screen name="OngoingProjects" component={OngoingProjects} />
  <HomeStack.Screen name="UpcomingSpacesses" component={UpcomingSpacesses} />
  <HomeStack.Screen name='SpaceDetails' component={SpaceDetails} />
  <HomeStack.Screen name='OngoingSpace' component={OngoingSpace} />
  <HomeStack.Screen name='FinalizedDesigns' component={FinalizedDesigns} />
</HomeStack.Navigator>
);
const HomeStackScreen=()=>(
  <HomeStack.Navigator>
  <HomeStack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
  <HomeStack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
  <HomeStack.Screen name="SideProfile" component={SideProfile}  />
  <HomeStack.Screen name="SavedPosts" component={SavedPosts} />
  <HomeStack.Screen name="savedpostHome" component={SavedPostHome} />
  <HomeStack.Screen name="Notifications" component={Notifications} />
</HomeStack.Navigator>
);
const DashboardStackScreen=()=>(
  <HomeStack.Navigator>
      <HomeStack.Screen name="Dashboard" component={Dashboard}  options={{headerShown: false}} />
  <HomeStack.Screen name="Profile" component={Profile}  />
  <HomeStack.Screen name="Payments" component={Payments} />
  <HomeStack.Screen name="AllEstimates" component={AllEstimates}  />
  <HomeStack.Screen name="Notifications" component={Notifications} />
  <HomeStack.Screen name="SideProfile" component={SideProfile}  />
  <HomeStack.Screen name="Projects" component={Projects}  />
  <HomeStack.Screen name="Activity" component={Activity}  />
  <HomeStack.Screen name="LikedPosts" component={LikedPosts}  />
  </HomeStack.Navigator>
)

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

export default function BottomNavbar() {
  return (
   
    <NavigationContainer>
      <Tab.Navigator
       initialRouteName="UserProfileEditor">
        <Tab.Screen name="Home" component={Home}  options={{ headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home"  color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Explore" component={Explore}  options={{ headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="StoreStackScreen" component={StoreStackScreen}  options={{headerShown: false,
          tabBarLabel: 'Store',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" color={color} size={size} />
          ),
        }}/>
         {/* <Tab.Screen name="Login" component={Login}  options={{headerShown: false,
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" color={color} size={size} />
          ),
        }} /> */}
        <Tab.Screen name="ProjectStackScreen" component={ProjectStackScreen}  options={{headerShown: false,
          tabBarLabel: 'Projects',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="design-services" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="DashboardStackScreen" component={DashboardStackScreen}  options={{headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
        }} />
          {/* <Tab.Screen name="ProductDetailView" component={ProductDetailView}  options={{tabBarVisible: false,headerShown: false,
          tabBarLabel: 'ProductDetailView',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="ProductDetailView" color={color} size={size} />
          ),
        }} /> */}
        
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
