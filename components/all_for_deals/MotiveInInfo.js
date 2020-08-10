import React, { useState } from 'react';
import { StyleSheet, Text, Picker, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeMotiveStatus } from '../../redux/ActionCreators';


const color_checker = (status) => {
    if (status == 'yes')
        return "#00f25d";
    else if (status == 'no')
        return "#e64e4e"
}

export const MotiveInInfo = ({ motive, deal_id }) => {
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState(motive.status);
    const dispatch = useDispatch();

    return (
        <View
        style={[styles.motive_obj, { backgroundColor: color_checker(selectedValue)}]}
        onLongPress={() => remover(motive.id)}
        >
            <Text
            style={[styles.motive_text, selectedValue=="no" ? {color: 'white'} : {}]}
            numberOfLines={show ? null : 1}
            onPress= {() => setShow(!show)}
            >{motive.name}</Text>

        <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue);
                                                    dispatch(changeMotiveStatus(deal_id, motive.id, itemValue));}}
            mode={'dropdown'}
        >
            <Picker.Item label="undefined" value={undefined} />
            <Picker.Item label="it worked!" value="yes" />
            <Picker.Item label="i`m looser" value="no" />
        </Picker>

        </View>
    )
}

const styles = StyleSheet.create({
    motive_obj: {
        minHeight: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    motive_text: {
        padding: 5,
        fontSize: 15, 
        fontStyle: 'italic',
        flex: 5,
        alignSelf: 'center'
    },

    picker: {
        backgroundColor: 'lightgrey',
        flex: 2,
        height: "100%",
    }
})