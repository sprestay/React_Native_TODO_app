import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements'


export const AskForDelete = ({ visible, setMV, callback, from_ideas }) => {

    const [checked, setChecked] = useState(false);
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
                                    <Text style={styles.headerText}>SURE YOU WANT TO DELETE?</Text>
                                </View>
                                { from_ideas ? <CheckBox
                                                center
                                                title='Delete related ideas also?'
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checked={checked}
                                                onPress={() => setChecked(!checked)}
                                                /> : null}
                                <View style={styles.content}>
                                    <TouchableOpacity onPress={from_ideas ? () => {callback(checked)} : callback} style={[styles.btn, {marginRight: 10}]}>
                                        <Text style={styles.btn_text}>YES</Text>
                                        <Icon 
                                        name='check'
                                        type='font-awesome'
                                        size={30}
                                        color='green'
                                        />
                                    </TouchableOpacity>
                    
                                    <TouchableOpacity style={[styles.btn, {marginLeft: 10}]} onPress={() => {setMV(!visible)}}>
                                        <Text style={[styles.btn_text, {paddingRight: 22}]}>NO</Text>
                                        <Icon 
                                        name='remove'
                                        type='font-awesome'
                                        size={30}
                                        color='red'
                                        />
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
        flexDirection: 'row',
        marginTop: 30,

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
        width: 80,
        justifyContent: 'space-between'
    },

    btn_text: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingRight: 10,
    }
})