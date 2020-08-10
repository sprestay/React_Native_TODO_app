import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addCategory, addIdea } from '../../redux/ActionCreators';
import { Icon } from 'react-native-elements';

export const AddCategory = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const submiter = () => {
        if (content.trim()) {
            dispatch(addCategory(Date.now(), content));
            setContent("");
            setModalVisible(!modalVisible);
        }
    }

    const add_Idea = () => {
        if (content.trim()) {
            dispatch(addIdea({id: Date.now(), title: content, cat_id: props.id, status: undefined}));
            setContent("");
            setModalVisible(!modalVisible);
        }

    }

    return (
        <View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose = {() => {setModalVisible(!modalVisible)}}
            >

            <TouchableWithoutFeedback onPress={() => {setModalVisible(!modalVisible)}}>

                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>ADD NEW {props.type.toUpperCase()}</Text>
                            </View>

                            <ScrollView>
                                    <TextInput
                                    value={content}
                                    placeholder={"YOUR COMMENT"}
                                    placeholderTextColor={"grey"}
                                    style={{fontStyle:'italic', paddingHorizontal: 7, textAlign: 'center'}}
                                    numberOfLines={10}
                                    multiline={true}
                                    onChangeText={setContent}
                                    />
                            </ScrollView>

                            <TouchableOpacity style={[styles.save_btn, content.trim() ? {} : styles.disabled_style]} onPress={props.type == 'category' ? submiter : add_Idea}>
                                <Text style={styles.text_on_btn}>SAVE</Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </TouchableWithoutFeedback>
            </Modal>

            
            <TouchableOpacity style={props.type == 'category' ? styles.add_btn: styles.idea_btn} onPress={() => setModalVisible(!modalVisible)}>
                {props.type=="category" ? <Text style={styles.text_btn}>ADD {props.type.toUpperCase()}</Text> : <Icon
                                                                                                                    name="plus-circle"
                                                                                                                    type="font-awesome"
                                                                                                                    size={40}
                                                                                                                    color={'white'} /> }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -30,
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

    save_btn: {
        backgroundColor: '#0059ff',
        height: 30, 
        width: 60,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text_on_btn: {
        color: 'white',
    }, 

    disabled_style: {
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        borderColor: 'grey',
    },

    comment_btn: {
        flex: 1, 
        marginRight: 5,
    },
    add_btn: {
        backgroundColor: '#0059ff',
        width: 120,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },

    text_btn: {
        color: 'white',
        fontSize: 15,
    },

    idea_btn: {
        backgroundColor: '#0059ff',
        width: 50,
        borderRadius: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 60,
        bottom: 40,
    }
})