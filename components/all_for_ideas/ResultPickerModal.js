import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, TouchableWithoutFeedback } from 'react-native';


export const ResultPicker = ({ visible, setMV, callback, previous }) => {

    return (
        <View>
            <Modal
            animationType="fade"
            visible={visible}
            transparent={true}
            onRequestClose = {()=>{setMV(!visible)}}
            >
                <TouchableWithoutFeedback onPress={() => {setMV(!visible)}}>
                    <View style={styles.modal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <View style={styles.headerModal}>
                                    <Text style={styles.headerText}>RESULT OF THE IDEA</Text>
                                </View>
                                <View style={styles.content}>
                                    <TouchableOpacity onPress={() => callback(undefined)} style={[styles.btn, previous ? {} : styles.selected]}>
                                        <Text style={[styles.btn_text, previous ? {} : styles.selected_text]}>UNDEFINED</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => callback('bl')} style={[styles.btn, previous=='bl' ? styles.selected : {}]}>
                                        <Text style={[styles.btn_text, previous=='bl' ? styles.selected_text : {}]}>BIG LOSS</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => callback('bp')} style={[styles.btn, previous=='bp' ? styles.selected : {}]}>
                                        <Text style={[styles.btn_text, previous=='bp' ? styles.selected_text : {}]}>BIG PROFIT</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => callback('ir')} style={[styles.btn, previous=='ir' ? styles.selected : {}]}>
                                        <Text style={[styles.btn_text, previous=='ir' ? styles.selected_text : {}]}>SO-SO</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({

    modal: {
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

    content: {
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 10,

    },

    headerModal: {
        padding: 10,
        paddingHorizontal: 20,
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
        backgroundColor: "#0059ff",
        height: 50,
        width: "100%",
        alignItems: 'center'
    },

    headerText: {
        color: 'white', 
        fontSize: 18,
        fontWeight: 'bold',
    },

    btn: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginBottom: 5,
        width: 200,
        justifyContent: 'center'
    },

    btn_text: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'center',
        paddingRight: 10,
    },

    selected: {
        backgroundColor: "#00aaff",
        borderColor: '#0059ff',
    },

    selected_text: {
        color: 'white'
    }
})
