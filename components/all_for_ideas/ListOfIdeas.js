import React, { useState } from 'react';
import { StyleSheet, FlatList, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';
import { AddCategory } from './AddCategoryModal';
import { RenderIdea } from './RenderIdea';




//Redux Block
import { useSelector } from 'react-redux';
//Redux End

export const ListOfIdeas = (props) => {

    const ideas = useSelector(state => state.ideas.ideas);

    return (
        <SafeAreaView style={styles.container}>
 
                <Header open={() => {props.navigation.openDrawer()}} title={props.route.params ? props.route.params.cat_id : undefined}/>
    
                <FlatList
                data={(props.route.params && props.route.params.cat_id) ? ideas.filter(item => item.cat_id == props.route.params.cat_id) : ideas}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{paddingBottom: 150}}
                style={styles.flatlist}
                renderItem = {({item}) => <RenderIdea title={item.title} id={item.id} status={item.status} />}
                />
    
                <AddCategory type={"idea"} id={props.route.params ? props.route.params.cat_id : undefined} /> 

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    },

    flatlist: {
        height: Dimensions.get('window').height * 0.82,
        marginTop: 30,
    }
})