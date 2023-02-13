import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookingApp from "../screens/doctor/appointment";
import Prescription from "../screens/doctor/prescription";

const Tab =createBottomTabNavigator()

const Tabs=() =>{
    return (
      <Tab.Navigator>
        <Tab.Screen name="BookApp" component={BookingApp} />
        <Tab.Screen name="Prescription" component={Prescription} />
      </Tab.Navigator>
    );
  }


export default Tabs;