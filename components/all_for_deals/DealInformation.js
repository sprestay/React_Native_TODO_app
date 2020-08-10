import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import { MotiveInInfo } from './MotiveInInfo'; 
import { CommentModal } from './CommentModal';
import { RenderComment } from './RenderComment';
import { Modifier } from './ModifierComponent';
import { updateDeal, deleteComment } from '../../redux/ActionCreators'; 



var moment = require('moment');

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}


const profit_render = (buy, sell) => {
    if (buy && sell) {
        var profit = roundToTwo(((sell / buy) - 1) * 100);
        let color = profit > 0 ? "green" : "red";
        let text = profit > 0 ? "+" + profit + "%" : profit.toString() + "%";
        return <Text numberOfLines={1} style={[styles.profit_text, {color: color}]}>{text}</Text>
    } else return <Text numberOfLines={1} style={{color: 'grey'}, styles.profit_text}>{"-/-"}</Text>
}



export const DealInformation = (props) => {
    const deal = useSelector(state => state.deals.deals.filter((deal) => deal.id == props.route.params.id))[0];
    const [title, setTitle] = useState(deal.title);
    const [buy,setBuy] = useState(deal.buy);
    const [sell, setSell] = useState(deal.sell);
    const [date_start, setStartDate] = useState(deal.date_start ? moment(deal.date_start * 1000).format("YYYY-MM-DD HH:mm") : "");
    const [date_end, setEndDate] = useState(deal.date_end ? moment(deal.date_end * 1000).format("YYYY-MM-DD HH:mm") : "");
    const [edit_mode, setEditMode] = useState(false);
    const [motives, setMotives] = useState(deal.motives);
    const [comments, setComments] = useState(deal.comments);
    const dispatch = useDispatch();
  

    const submitter = (start_data_p, end_data_p, in_cost_p, out_cost_p, motives_p) => {
        if (title.trim()) {
            var updated_deal = {
                id: deal.id,
                title: title, //was title_p
                buy: in_cost_p ? Number(in_cost_p) : undefined, 
                sell: out_cost_p ? Number(out_cost_p) : undefined, 
                date_start: start_data_p ? moment(start_data_p).valueOf() / 1000 : undefined,
                date_end: end_data_p ? moment(end_data_p).valueOf() / 1000 : undefined,
                motives: motives_p,
                comments: comments
            }
            dispatch(updateDeal(updated_deal));
            setEditMode(!edit_mode);
            if (buy != updated_deal.buy)
                setBuy(updated_deal.buy);
            if (sell != updated_deal.sell)
                setSell(updated_deal.sell);
            if (title != updated_deal.title)
                setTitle(updated_deal.title);
            if (date_start != (updated_deal.date_start ? moment(updated_deal.date_start * 1000).format("YYYY-MM-DD HH:mm") : ""))
                setStartDate(updated_deal.date_start ? moment(updated_deal.date_start * 1000).format("YYYY-MM-DD HH:mm") : "")
            if (date_end != (updated_deal.date_end ? moment(updated_deal.date_end * 1000).format("YYYY-MM-DD HH:mm") : ""))
                setEndDate(updated_deal.date_end ? moment(updated_deal.date_end * 1000).format("YYYY-MM-DD HH:mm") : "")
            setMotives(motives_p);
        }
    }

    const delete_comment = (id) => {
        dispatch(deleteComment(deal.id, id));
        setComments(deal.comments);
    }

    const comment_block = comments.map((item) => <RenderComment comment={item} key={item.id.toString()} deal_id={deal.id} remover={delete_comment}/>);
    return (
        <ScrollView>
            {/* HEADER BLOCK  */}
            <View style={[styles.header]}>
                <View style={styles.title_block}>
                    
                    <TextInput
                    style={styles.title_of_the_deal}
                    value={title}
                    editable={edit_mode}
                    onChangeText={setTitle}
                    />

                </View>
                <View style={styles.navigation_block}>
                    <View style={styles.profit_block}>
                        <Text style={{color: 'grey', fontSize:18, fontStyle: 'italic'}}>PROFIT:  {profit_render(deal.buy, deal.sell)}</Text>
                    </View>
                    <TouchableOpacity style={styles.navigation_btn} onPress={() => setEditMode(!edit_mode)}>
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            size={40}
                            color='#0059ff' />
                    </TouchableOpacity>

                    <CommentModal id={deal.id}/>
                </View>
            </View>

            {/* SUMMARY BLOCK. DISPLAYS ONLY edit_mode=false */}

            <View style={[styles.deal_info, edit_mode ? {display: 'none'} : {}]}>
                <View style={styles.cost_column}>
                    <View style={styles.deal_info_line}>
                            <Text style={styles.comment_for_info_text}>buy on <Text style={styles.info_text}>{date_start ? moment(date_start).format("DD MMM YYYY, HH:mm") : "-/-"}</Text></Text>
                            <Text style={styles.comment_for_info_text}>cost: <Text style={styles.info_text}>{buy ? buy : '-/-'}</Text></Text>
                    </View>
                    <View style={[styles.deal_info_line, {borderBottomWidth: 0}]}>
                            <Text style={styles.comment_for_info_text}>sell on  <Text style={styles.info_text}>{date_end ? moment(date_end).format("DD MMM YYYY, HH:mm") : "-/-"}</Text></Text>
                            <Text style={styles.comment_for_info_text}>cost: <Text style={styles.info_text}>{sell ? sell : '-/-'}</Text></Text>
                    </View>
                </View>
            </View>

            {/* BLOCK FOR EDIT */}
            <View style={[edit_mode ? {} : {display:'none'}]}>
                <Modifier title_p={title} buy_p={buy ? buy.toString() : undefined} sell_p={sell ? sell.toString() : null} start_date_p={date_start} end_date_p={date_end} motives_p={motives} show_header={false} response={submitter}/>
            </View>

            {/* MOTIVES AND COMMENTS */}
            <View style={ edit_mode ? {display: "none"} : {}}>
                <View style={[styles.cost_block, {justifyContent: 'center'}]}>
                    <Text style={styles.motives_to_buy}>YOUR MOTIVES</Text>
                </View>
                { motives.length ? 
                <View style={[styles.motive_list, {marginBottom: 30}]}>
                    <FlatList
                    data={motives}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <MotiveInInfo motive={item} deal_id={deal.id} />}
                    />
                </View> : <Text style={{fontSize: 22, color: 'grey', textAlign: 'center'}}>-/-</Text>}
    
                
               <View>
                    <View style={[styles.cost_block, {justifyContent: 'center'}]}>
                        <Text style={styles.motives_to_buy}>YOUR COMMENTS</Text>
                    </View>
                {comments.length ? (
                    <View style={[styles.motive_list]}>
    
                        <ScrollView >
                            {comment_block}
                        </ScrollView>
    
                    </View>) : <Text style={{fontSize: 22, color: 'grey', textAlign: 'center'}}>-/-</Text>}
               </View>
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({

    header: {
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
    },

    profit_block: {
        flex: 3,
        alignSelf: 'center',
        marginLeft: 5,
    },
    profit_text: {
        fontSize: 20,
    },

    title_of_the_deal: {
        fontSize: 20,
        textAlign: 'center',
    },

    title_block: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        marginBottom: 5,
    },

    navigation_block: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },

    navigation_btn: {
        flex: 1,
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

    subtitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },

    deal_info: {
        borderRadius: 5,
        borderColor: 'grey',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginTop: 5,
    },

    deal_info_line: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'grey',
        justifyContent: 'space-between',
    },

    info_text: {
        fontSize: 20,
        fontStyle: 'normal',
        color: 'black'
    },

    comment_for_info_text: {
        fontSize: 12,
        fontStyle: 'italic',
        color: 'grey'
    },

    motives_to_buy: {
        fontSize: 25,
        color: 'grey',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginTop: 10,
    },
})