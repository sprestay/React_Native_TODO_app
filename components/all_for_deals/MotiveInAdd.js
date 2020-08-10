import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const MotiveInAdd = ({ name, id, remover }) => {
    const [show, setShow] = useState(false);

    return (
        <TouchableOpacity 
        style={styles.motive_obj}
        onLongPress={() => remover(id)}
        onPress= {() => setShow(!show)}
        >
            <Text
            style={styles.motive_text}
            numberOfLines={show ? null : 1}
            >{name}</Text>
        </TouchableOpacity>
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
    },

    motive_text: {
        padding: 3,
        fontSize: 15, 
        fontStyle: 'italic',
    }
})