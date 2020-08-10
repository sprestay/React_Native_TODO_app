import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AskForDelete } from './AskForDelete';

export const RenderComment = ({ comment,  remover }) => {
    
    const [modalVisible, setModalVisible] = useState(false);

    const response = () => {
        remover(comment.id);
        setModalVisible(!modalVisible);
    }

    return (
        <TouchableOpacity 
        style={styles.comment_obj}
        onLongPress={() => setModalVisible(!modalVisible)}
        >
            <Text
            style={styles.comment_text}
            >{comment.comment}</Text>
        <AskForDelete visible={modalVisible} setMV={setModalVisible}  callback={response} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    comment_obj: {
        minHeight: 30,
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginVertical: 5,
        marginHorizontal: 5,
    },

    comment_text: {
        padding: 3,
        fontSize: 15, 
        fontStyle: 'italic',
    }
})