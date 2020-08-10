import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { Deal } from './Deal';
import { Search } from './Search';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { DealModal } from './DealModal'; 


//Redux Block
import { useSelector, useDispatch } from 'react-redux';
import { deleteDeal } from '../../redux/ActionCreators';
//Redux End

export const ListOfDeals = props => {
    const [sort, setSort] = useState([undefined, undefined]);
    const [subForSearch, setSubsForSearch] = useState('');
    const [refresh, setRefresh] = useState(false);
    const deals = useSelector(state => state.deals.deals);
    const dispatch = useDispatch();

    const sort_deals = () => {
        let sign = sort[1] ? sort[1] : 1;
        if (!sort[0])
            return deals.sort((a,b) => { return sign * -1 * (a['id'] - b['id']) });
        else if (sort[0] == 'profit')
            return deals.filter(a => a['buy'] && a['sell']).sort((a,b) => { 
                    var profit_a = ((a['sell'] / a['buy']) - 1) * 100;
                    var profit_b = ((b['sell'] / b['buy']) - 1) * 100;
                    return sign * (profit_a - profit_b);
                });
        else if (sort[0] == 'date')
            return deals.filter(a => a['date_start']).sort((a,b) => { return sign * (a['date_start'] - b['date_start']) });
        else if (sort[0] == 'name')
            return deals.sort((a,b) => {    if (a['title'].toLowerCase() < b['title'].toLowerCase())
                                                return sign * -1;
                                            else return sign; });
    }

    const handleRefresh = () => {
        setRefresh(true);
        setSort([undefined, undefined]);
        setSubsForSearch("");
        setRefresh(false);
    }

    const delete_deal = (id) => {
        dispatch(deleteDeal(id));
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <ScrollView refreshControl = {<RefreshControl   refreshing={refresh}
                                                            onRefresh={handleRefresh}/>
                }>
                <Search response={setSubsForSearch}/>
                <DealModal response={setSort} current_sort={sort[0]}/>

                <FlatList
                style={styles.flatlist}
                keyExtractor={item => item.id.toString()} 
                contentContainerStyle={{paddingBottom: 150}}
                data={sort_deals().filter((item) => { return item['title'].toLocaleLowerCase().indexOf(subForSearch) + 1})}
                renderItem={({item}) => <Deal deal={item} remover={delete_deal}/>}
                />
            </ScrollView>
                <TouchableOpacity style={styles.but} onPress={() => navigation.navigate('Add new deal')}>
                    <Icon
                        name='plus'
                        type='font-awesome'
                        size={40}
                        color='white' />
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    //   paddingVertical: "5%",
    },
    flatlist: {
        zIndex: 1,
    },
    but: {
        marginHorizontal: 50,
        borderRadius: 50,
        position: "absolute",
        zIndex: 2,
        bottom: 40,
        width: 60,
        height: 60,
        right: 0,
        textAlign: 'center',
        justifyContent: "center",
        backgroundColor: "#0059ff",
        elevation: 5,
    }
});