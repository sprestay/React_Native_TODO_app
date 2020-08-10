import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export const Search = ({ response }) => {
    const [value, setValue] = useState("");
    
    return (
        <View style={styles.block}>
            <TextInput 
            style={styles.input}
            onChangeText={setValue}
            value={value}
            placeholder="Что ищем?"
            autoCorrect={false}
            autoCapitalize='none'
            onSubmitEditing={() => response(value.trim())}
            />
   
                {value != '' ? <Icon 
                                    name='times'
                                    type='font-awesome'
                                    color='grey'
                                    onPress={() => {setValue("");
                                                    response('')}}
                                    size={30}/> : <Text></Text>}

                <Icon
                    name='search'
                    type='font-awesome'
                    color='#0059ff'
                    onPress={() => response(value.trim())}
                    size={30} />
    
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: "#3949ab",
        paddingTop: 10,
        paddingHorizontal: 5,
        paddingBottom: 2,
    },
    input: {
        width: '80%',
        flexDirection: 'row',
        fontSize: 20,
        color: '#111212',
    },
})