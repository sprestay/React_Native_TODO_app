import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Alert, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { MotiveInAdd } from './MotiveInAdd';

var moment = require('moment');


function makeid() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export const Modifier = ({title_p, buy_p, sell_p, start_date_p, end_date_p, motives_p, response, show_header}) => {
    
    const [in_cost, setInCost] = useState(buy_p);
    const [out_cost, setOutCost] = useState(sell_p);
    const [start_data, setStartDate] = useState(start_date_p);
    const [end_data, setEndDate] = useState(end_date_p);
    const [motives, setMotives] = useState(motives_p);
    const [motive_input, setMotiveInput] = useState("");

    const date_set = (date, to) => {
        if (to == 'start') setStartDate(moment(date).format('YYYY-MM-DD HH:mm'));
        else setEndDate(moment(date).format('YYYY-MM-DD HH:mm'));
    }

    const cost_checker = (value, type) => {
        var data = value.replace(/,/gi, '.');
        if (type == 'in_cost') {
            if (!isNaN(data)) setInCost(data);
            else Alert.alert("Only numbers for stock price");
        } else if (type='out_cost') {
            if (!isNaN(data)) setOutCost(data);
            else Alert.alert("Only numbers for stock price");
        }
    }

    const add_new_motive = () => {
        if (motive_input.trim()) {
            setMotives((prev) => [...prev, {id: makeid(), name: motive_input, status: undefined}]);
            setMotiveInput('');
        }
    }

    const motive_remover = (id) => {
        setMotives(prev => prev.filter(motive => motive.id !== id));
    }

    const submiter = () => {
        response(start_data, end_data, in_cost, out_cost, motives);
    }

    return (
        <ScrollView>

            <View style={styles.cost_block}>
                <View style={styles.cost_column}>
                    <Text style={[styles.header, {textAlign: 'left'}]}>Purchase price</Text>
                    <TextInput
                    style={styles.cost}
                    value={in_cost}
                    placeholder={'Buy cost'}
                    keyboardType={'phone-pad'}
                    placeholderTextColor={'grey'}
                    onChangeText={(value) => cost_checker(value, 'in_cost')}
                    />
                </View>

                <View style={styles.cost_column}>
                    <Text style={[styles.header, {textAlign: 'right'}]}>Selling price</Text>
                    <TextInput
                    style={[styles.cost]}
                    value={out_cost}
                    placeholder={'Sell cost'}
                    keyboardType={'phone-pad'}
                    placeholderTextColor={'grey'}
                    onChangeText={(value) => cost_checker(value, 'out_cost')}
                    />
                </View>
            </View>

            <View style={styles.cost_block}>
                <View style={styles.cost_column}>
                    <Text style={[styles.header, {textAlign: 'left'}]}>Date of purchase</Text>
                    <View style={styles.date_frame}>
                        <DatePicker
                        date={start_data ? start_data : null}
                        style={styles.date_block}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        mode={'datetime'}
                        showIcon={false}
                        maxDate={end_data ? end_data : undefined}
                        placeholder={'When did you buy?'}
                        onDateChange={(value) => {date_set(value, 'start')}}
                        />
                    </View>
                </View>

                <View style={styles.cost_column}>
                    <Text style={[styles.header, {textAlign: 'right'}]}>Date of sale</Text>
                    <View style={styles.date_frame}>
                        <DatePicker
                        date={end_data ? end_data : null}
                        style={styles.date_block}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        mode={'datetime'}
                        showIcon={false}
                        disabled={start_data ? false : true}
                        minDate={start_data ? start_data : null} 
                        onOpenModal={!start_data ? () => {Alert.alert("You should determine date of purchase first")}: null}
                        placeholder={'When did you sell?'}
                        onDateChange={(value) => {date_set(value, 'end')}}
                        />
                    </View>
                </View>
            </View>

            <View style={[styles.cost_block, {justifyContent: 'center'}]}>
                <Text style={styles.motives_to_buy}>MOTIVES TO BUY</Text>
            </View>

            <View style={styles.add_motive}>
                <TextInput
                style={styles.motive_input}
                placeholder={'Why did you buy it'}
                placeholderTextColor={'grey'}
                onChangeText={setMotiveInput}
                value={motive_input}
                onSubmitEditing={add_new_motive}
                />
                <TouchableOpacity style={styles.add_button} onPress={add_new_motive}>
                    <Text style={{color: 'white'}}>ADD</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.motive_block, show_header ? {} : {height: 230}]}>
                <View style={[styles.motive_list]}>
                    <FlatList
                     data={motives}
                     keyExtractor={item => item.id.toString()}
                     renderItem={({item}) => <MotiveInAdd name={item.name} id={item.id} remover={motive_remover}/>}
                    />
                </View>

                <TouchableOpacity style={[styles.save_button, title_p.trim() ? {} : styles.disabled_save_btn]} disabled={title_p ? false : true} 
                onPress={submiter}>
                    <Text style={styles.saveb_text}>SAVE</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    title_input: {
        flexDirection: "column",
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        fontSize: 25,
        paddingHorizontal: 10,
    },
    cost_block: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
        marginBottom: 5,
        marginTop: 10,
    },
    cost: {
        backgroundColor: 'lightgrey',
        height: 35,
        marginTop: 5,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        width: 140,
        borderTopColor: 'black',
        borderTopWidth: 2,
    },

    cost_column: {
        flexDirection: 'column',
    },

    header: {
        fontSize: 17,
        fontWeight: 'bold',
    },

    date_block: {
        backgroundColor: 'white',
    },

    date_frame: {
        width: 140, 
        height: 35,
        borderRadius: 5, 
        overflow: "hidden", 
        borderColor: 'black',
        borderWidth: 2,
    },

    motives_to_buy: {
        fontSize: 25,
        color: 'grey',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginTop: 15,
    }, 

    save_button: {
        backgroundColor: '#0059ff',
        borderRadius: 10, 
        alignSelf: 'center',
        flex: 1.5,
        width: 150,
    },

    saveb_text: {
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },

    motive_block: { 
        display: 'flex',
        height: 265,
        position: 'relative',
    },

    motive_list: {
        flex: 9,
        marginBottom: 5,
    },

    add_motive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    motive_input: {
        height: 35,
        width: '75%',
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },

    add_button: {
        backgroundColor: '#0059ff',
        width: '20%',
        borderRadius: 5,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },

    disabled_save_btn: {
        backgroundColor: 'lightgrey', 
        borderColor: 'grey',
        borderWidth: 1
    }
});
