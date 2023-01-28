import { ScrollView, View,Text } from 'react-native';
import { Searchbar } from 'react-native-paper';


const DrugsName=(props)=>{

    return(
        <View>
            <Text>
                Choose Medicine
            </Text>
            <Searchbar/>
            <ScrollView>
                <Text>
                    Paracetmol
                </Text>
                <Text>
                    Paracetmol
                </Text>
                <Text>
                    Paracetmol
                </Text>
            </ScrollView>
        </View>
    )
}
export default DrugsName;