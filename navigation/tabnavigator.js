import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookingApp from "../screens/doctor/appointment";
import Dashboard from "../screens/doctor/dashboard";
import Prescription from "../screens/doctor/prescription";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import '../screens/globlevariable'
import SearchPatient from "../screens/doctor/searchpatient";
import PrAccount from "../screens/doctor/account";

const Tab =createBottomTabNavigator()

const Tabs=() =>{
    return (
      <Tab.Navigator
      
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'view-dashboard'
              : "view-dashboard-outline";
          } else if (route.name === 'Search') {
            iconName = focused ? 'account-search' : 'account-search-outline';
          }
        else if (route.name === 'BookApp') {
          iconName = focused ? 'calendar-edit' : 'calendar-month';
        }
        else if (route.name === 'Account') {
          iconName = focused ? 'account-cog' : 'account-cog-outline';
        }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: global.themecolor,
        tabBarInactiveTintColor: 'gray',
      })}
      
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="BookApp" component={BookingApp} />
        <Tab.Screen name="Search" component={SearchPatient} />
        <Tab.Screen name="Account" component={PrAccount} />
      </Tab.Navigator>
    );
  }


export default Tabs;