import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function profit_render(value) {
    let color = "green";
    if (isNaN(value))
        return <Text style={[styles.profit_text, {color: 'grey'}]}>-/-</Text>
    if (value < 0)
        color = '#ff2b2b';
    return <Text style={[styles.profit_text, {color: color}]}>{color == 'red' ? '-' : ''}{value}%</Text>
 }

function avg_time_calculator(value) {
    let days = Math.trunc(value / 86400);
    if (days > 0) value = value - (days * 86400);

    let hours = Math.trunc(value / 3600);
    if (hours > 0) value = value - (hours * 3600);

    let minutes = Math.trunc(value / 60);
    let output_str = days > 0 ? days + ' day, ': '';
    output_str += hours > 0 ? hours + ' hours, ': '';
    output_str += minutes + ' mins';
    return <Text style={[styles.profit_text, output_str.length > 10 ? {fontSize: 17, paddingTop: 3} : {}, output_str.length > 20 ? {fontSize: 15, paddingTop: 8} : {}]}>{output_str}</Text>
}

export const Info = props => {

    const deals = useSelector(state => state.deals.deals);
    const ideas = useSelector(state => state.ideas.ideas);

    var profit_summ = 0;
    var time_summ = 0;
    var count_time = 0;
    var profit_count = 0;

    const res_deal = deals.reduce((accum, current) => {
        var tmp = current.motives.reduce((tmp_a, tmp_c) => {
            if (tmp_c.status == 'yes')
                tmp_a.yes += 1;
            else if (tmp_c.status == 'no')
                tmp_a.no += 1;
            else tmp_a.und += 1;
            return tmp_a;
        }, {yes: 0, no: 0, und: 0});

        accum.yes += tmp.yes;
        accum.no += tmp.no;
        accum.und += tmp.und;
        
        if (current.date_start && current.date_end) {
            time_summ += current.date_end - current.date_start;
            count_time += 1;
        }

        if (current.buy && current.sell) {
            profit_summ += roundToTwo(((current.sell / current.buy) - 1) * 100);
            profit_count += 1;
        }

        return accum;
    }, {yes: 0, no: 0, und: 0})

    const res_idea = ideas.reduce((accum, current) => {
        if (current.status == 'bp')
            accum.bp += 1
        else if (current.status == 'bl')
            accum.bl += 1
        else if (current.status == 'ir')
            accum.ir += 1
        if (!current.status)
            accum.und += 1
        return accum;
    }, {bp: 0, bl: 0, ir: 0, und: 0});

    return (
        <SafeAreaView style={styles.block}>
            <View style={styles.header}>
                <Text style={styles.header_text}>YOUR DEALS STATISTICS</Text>
            </View>
            <View style={styles.profit_block}>
                <View style={[styles.profit_column, {borderRightWidth: 2}]}>
                    <Text style={[styles.profit_header]}>PROFIT per deal</Text>
                    {profit_render(roundToTwo(profit_summ / profit_count))}
                </View>

                <View style={[styles.profit_column, {borderLeftWidth: 2}]}>
                    <Text style={styles.profit_header}>AVG Time</Text>
                    {avg_time_calculator(time_summ / count_time)}
                </View>
            </View>

            <View style={styles.motive_block}>
                <View style={styles.motive}>
                    <Text style={[styles.motive_header, {color: 'grey'}]}>UNKNOWN</Text>
                    <Text style={[styles.motive_result, {color: 'grey'}]}>{res_deal.und}</Text>
                </View>
                <View style={[styles.motive, {marginRight: 15}]}>
                    <Text style={[styles.motive_header, {color: '#00de29'}]}>SUCCESS</Text>
                    <Text style={[styles.motive_result, {color: '#00de29'}]}>{res_deal.yes}</Text>
                </View>
                <View style={styles.motive}>
                    <Text style={[styles.motive_header, {color: '#ff2b2b'}]}>LOSS</Text>
                    <Text style={[styles.motive_result, {color: '#ff2b2b'}]}>{res_deal.no}</Text>
                </View>
            </View>

            <View style={styles.header}>
                <Text style={styles.header_text}>YOUR IDEAS STATISTICS</Text>
            </View>
            <View style={styles.total_block}>
                <Text style={styles.motive_header}>TOTAL</Text>
                <Text style={styles.motive_result}>{res_idea.bp + res_idea.bl + res_idea.ir + res_idea.und}</Text>
            </View>
            <View style={[styles.motive_block, {borderBottomWidth: 0}]}>
                <View style={styles.motive}>
                    <Text style={[styles.motive_header, {color: 'grey'}]}>MINOR</Text>
                    <Text style={[styles.motive_result, {color: 'grey'}]}>{res_idea.ir}</Text>
                </View>
                <View style={[styles.motive, {marginRight: 15}]}>
                    <Text style={[styles.motive_header, {color: '#00de29'}]}>SUCCESS</Text>
                    <Text style={[styles.motive_result, {color: '#00de29'}]}>{res_idea.bp}</Text>
                </View>
                <View style={styles.motive}>
                    <Text style={[styles.motive_header, {color: '#ff2b2b'}]}>LOSS</Text>
                    <Text style={[styles.motive_result, {color: '#ff2b2b'}]}>{res_idea.bl}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        justifyContent:'flex-start',
    },

    header: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        marginHorizontal: 50,
        marginTop: 15,
    },

    header_text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    profit_block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    profit_column: {
        borderColor: 'grey',
        flex: 1,
        alignItems: 'center',
    },

    profit_header: {
        fontSize: 18,
        fontStyle: 'italic',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },

    profit_text: {
        fontSize: 22,
    },

    motive_block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 25,
        paddingBottom: 30,
        borderBottomWidth: 4,
        borderBottomColor: 'grey',
    },

    motive_header: {
        fontSize: 20,
        paddingHorizontal: 10,
    },

    motive: {
        textAlign: 'center',
    },

    motive_result: {
        fontSize: 25,
        textAlign: 'center',
    },

    total: {
        fontSize: 18,
        fontStyle: 'italic',
    },

    total_block: {
        marginTop: 20,
        alignItems: 'center',
    }
})