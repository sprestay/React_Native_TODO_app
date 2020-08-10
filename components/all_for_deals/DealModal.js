import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements'

export const DealModal = ({response, current_sort}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [sortDirection, setSortDirection] = useState('up');

    const return_sort_type = (type) => {
        let sign = sortDirection == 'up' ? 1 : -1;
        response([type, sign]);
        setModalVisible(!modalVisible);
    }

    return (
            <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible} 
                        onRequestClose = {()=>{setModalVisible(!modalVisible)}}
                    >
                        <TouchableWithoutFeedback onPress={() => {setModalVisible(!modalVisible)}}>

                            <View style={styles.centeredView}>
                                <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Choose sort direction</Text>
                                        <TouchableOpacity 
                                            style={styles.directionBut}
                                            onPress={() => {sortDirection == 'up' ? setSortDirection('down') : setSortDirection('up')}}>
                                            <Text style={styles.sortD}>{sortDirection}</Text>
                                            <Icon name={sortDirection == 'up' ? 'arrow-up' : 'arrow-down'}
                                                type='font-awesome'
                                                size={12}
                                                style={{paddingTop: 5, marginLeft: 5}}
                                                color="#0059ff"/>
                                        </TouchableOpacity>
                                    </View>
            
                                    <View style={styles.modalContent}>
                                        <TouchableOpacity style={[styles.sort_item, current_sort == 'profit' ? {backgroundColor: "white"} : {backgroundColor: "#afecfa"}]} onPress={()=>{return_sort_type('profit')}}>
                                            <Text style={styles.sort_category}>by Profit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.sort_item,  current_sort == 'date' ? {backgroundColor: "white"} : {backgroundColor: "#afecfa"}]} onPress={()=>{return_sort_type('date')}}>
                                            <Text style={styles.sort_category}>by Buy date</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.sort_item,  current_sort == 'name' ? {backgroundColor: "white"} : {backgroundColor: "#afecfa"}]} onPress={()=>{return_sort_type('name')}}>
                                            <Text style={styles.sort_category}>by Name</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                </TouchableWithoutFeedback>
                             </View>
    
                         </TouchableWithoutFeedback>

                    </Modal>
                
                <View style={styles.picker_block}>
                    <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
                        <Text style={styles.text_sort}>SORTING</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },

    modalView: {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        width: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    modalTitle: {
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#0059ff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        left: 0,
    },

    modalHeader: {
        flexDirection: 'row',
    },

    modalContent: {
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 5,
    },

    directionBut: {
        marginLeft: 30,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 2, 
        borderColor: "#0059ff",
        flexDirection: 'row',
        width: 90,
        justifyContent: 'center'
    },

    sortD: {
        fontSize: 15,
        color: 'grey',
    },
    sort_item: {
        marginBottom: 5,
        backgroundColor: '#afecfa',
        padding: 10,
        paddingHorizontal: 50,
        borderWidth: 2,
        borderColor: '#0059ff',
        borderRadius: 10,
    },
    sort_category: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#0059ff',
        fontWeight: 'bold',
    },

    picker: {
        backgroundColor: '#0059ff',
        borderRadius: 5,
        marginRight: 35,
        marginTop: 5,
    },
    picker_block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },

    text_sort: {
        fontSize: 12,
        color: 'white',
        padding: 7,
        paddingHorizontal: 15,
    }
})