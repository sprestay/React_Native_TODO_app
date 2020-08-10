import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AskForDelete } from './AskForDelete';
var moment = require('moment');

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

const profit_render = (buy, sell) => {
    if (buy && sell) {
        var profit = roundToTwo(((sell / buy) - 1) * 100);
        let color = profit > 0 ? "green" : "red";
        let text = profit > 0 ? "+" + profit + "%" : profit.toString() + "%";
        return <Text numberOfLines={1} style={{color: color, fontSize: 20, textAlign: 'right'}}>{text}</Text>
    } else {
        return <Text numberOfLines={1} style={{color: 'grey', fontSize: 20, textAlign: 'right'}}>{"-/-"}</Text>
    }
}

export const Deal = ({ deal, remover }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const response = () => {
        remover(deal.id);
        setModalVisible(!modalVisible);
    }

    return (
        <TouchableOpacity 
        activeOpacity={0.5}
        onPress={() => {navigation.navigate('Deal information', {id: deal.id})}}
        onLongPress={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.deal}>
                <View style={[styles.column, {flex: 3.5}]}>
                    <Text numberOfLines={1} style={styles.title}>{deal.title}</Text>
                    <Text style={styles.date}>{deal.date_start ? moment(deal.date_start * 1000).format('DD MMMM YYYY HH:mm') : '-/-'}</Text>
                </View>
                <View style={[styles.column, {flex:1}]}>
                    {profit_render(deal.buy, deal.sell)}
                    <Text style={StyleSheet.compose(styles.date, styles.just_right)}>{deal.date_end ? moment(deal.date_start * 1000).to(deal.date_end * 1000): '-/-'}</Text>
                </View>
            </View>

            <AskForDelete visible={modalVisible} setMV={setModalVisible}  callback={response} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    deal: {
        flexDirection: "row",
        alignItems: 'flex-start',
        paddingTop: 2,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#3949ab",
        marginBottom: "1%",
        justifyContent: 'space-between'
    },
    date: {
        fontSize: 12,
        color: "#727a8a",
        marginTop: 7,
    },
    title: {
        fontSize: 20,
    },
    column: {
        display: "flex",
        flexDirection: "column",
    },
    just_right: {
        textAlign: 'right',
    }
})