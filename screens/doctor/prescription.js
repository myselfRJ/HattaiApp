import { View } from 'react-native';
import {DataTable} from 'react-native-paper';
import AppointTck from '../../components/apntck';
const Prescription=()=>{

    return(

        <View>
            <AppointTck id='prescr'/>
            <DataTable>

       
        <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell numeric>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>
      </DataTable>

        </View>
    )

}
export default Prescription;