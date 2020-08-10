import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';


export const Header = ({ open, title }) => {

    const header_text = useSelector(state => state.categories.filter(item => item.id == title));
    const real_text = header_text[0] ? header_text[0].title : "LIST OF YOUR IDEAS";
    const len = real_text.length;

    const [lines, setLines] = useState(1);

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={open}>
                <Icon 
                name='bars'
                type='font-awesome'
                size={30}
                color={'white'}
                style={{borderWidth: 2, borderColor: 'white', paddingHorizontal: 5, borderRadius: 5, paddingVertical: 2,}}
                />
            </TouchableOpacity>
            <Text 
            onPress={() => {lines ? setLines(null) : setLines(1)}}
            style={[styles.text,  len < 30 || lines ? {} : {fontSize: 15}]}
            numberOfLines={lines}>{real_text}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    navbar: {
        minHeight: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0059ff",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginLeft: 40,
        marginRight: 40,
        overflow: 'hidden',
    },
})