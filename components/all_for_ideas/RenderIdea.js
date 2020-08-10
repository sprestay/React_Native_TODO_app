import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ResultPicker } from './ResultPickerModal';
import { useDispatch } from 'react-redux';
import { changeResult, deleteIdea } from '../../redux/ActionCreators';
import { AskForDelete } from '../all_for_deals/AskForDelete';

var moment = require('moment');

export const RenderIdea = ({title, status, id}) => {

    const [selectedValue, setSelectedValue] = useState(status);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const dispatch = useDispatch();

    var color = 'lightgrey';
    if (selectedValue == 'bl')
        color = '#ff2b2b'
    else if (selectedValue == 'bp')
        color = '#00de29'
    else if (selectedValue == 'ir')
        color = '#ffd91a'

    const result_changer = (type) => {
        dispatch(changeResult(id, type));
        setModalVisible(!modalVisible);
        setSelectedValue(type);
    }

    const remover = () => {
        dispatch(deleteIdea(id));
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onLongPress={() => setDeleteVisible(!deleteVisible)}>
                <View style={[styles.column, {width: '85%'}]}>
                    <Text style={styles.idea}>{title}</Text>
                    <Text style={styles.date}>created {moment(id).format("DD MMM YYYY, in HH:mm")}</Text>
                </View>

                <TouchableOpacity style={[styles.column, {justifyContent: 'center'}]} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={[styles.result, {backgroundColor: color}]}></View>
                </TouchableOpacity>
                <ResultPicker visible={modalVisible} setMV={setModalVisible} previous={status} callback={result_changer}/>
            </TouchableOpacity>

            <AskForDelete visible={deleteVisible} setMV={setDeleteVisible} callback={remover}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: 'grey',
        paddingTop: 7,
    },

    column: {
        flexDirection: 'column',
        paddingLeft: 10,
    },

    idea: {
        fontSize: 19,   
    },

    date: {
        fontSize: 13,
        color: 'grey',
        fontStyle: 'italic',
        marginTop: 5,
    },

    result: {
        height: 30,
        width: 30,
        borderRadius: 50,
        // marginHorizontal: 0,
        borderWidth: 2, 
        borderColor: '#0059ff',
    }
})