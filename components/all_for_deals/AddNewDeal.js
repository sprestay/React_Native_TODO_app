import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Redux
import { useDispatch } from 'react-redux';
import { addDeal } from '../../redux/ActionCreators';
//End Redux
import { Modifier } from './ModifierComponent';

var moment = require('moment');

function makeid()
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
export const AddNewDeal = (props) => {
    
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const submitter = (title, start_data, end_data, in_cost, out_cost, motives) => {
        if (title.trim()) {
            var new_deal = {
                id: Date.now(),
                title: title,
                date_start: start_data ? moment(start_data).valueOf() / 1000 : undefined,
                buy: in_cost ? Number(in_cost) : undefined,
                date_end: end_data ? moment(end_data).valueOf() / 1000 : undefined,
                sell: out_cost ? Number(out_cost) : undefined,
                motives: motives,
                comments: [],
            };
            dispatch(addDeal(new_deal));
            navigation.goBack();
        } else Alert.alert('Need at least TITLE!')
    }

    return (
        <Modifier title_p={""} buy_p={""} sell_p={""} start_date_p={""} end_date_p={""} motives_p={[]} response={submitter} show_header={true} />
    )
}