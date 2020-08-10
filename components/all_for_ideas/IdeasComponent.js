import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { ListOfIdeas } from './ListOfIdeas';
import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { AddCategory } from './AddCategoryModal';
import { Icon } from 'react-native-elements';
import { AskForDelete } from '../all_for_deals/AskForDelete';


//Redux block
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory, deleteRelatedIdeas } from '../../redux/ActionCreators';
//End block


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  const [input, setInput] = useState("");
  const [active, setActive] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories);
  const categories_list = categories.filter(item => item['title'].toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) + 1).map(item => <DrawerItem label={item.title} 
                                                                                                                                          style={[styles.item, active==item.id ? {backgroundColor: 'lightgrey'} : {}]} 
                                                                                                                                          key={item.id}
                                                                                                                                          onPress={() => {
                                                                                                                                            setActive(item.id);
                                                                                                                                            props.navigation.navigate("All ideas", {cat_id: item.id})}} 
                                                                                                                                          />);

  const remover = (checked) => {
    dispatch(deleteCategory(active));
    if (checked)
      dispatch(deleteRelatedIdeas(active));
    setModalVisible(!modalVisible);
    setActive(undefined);
  }


  return (
      <DrawerContentScrollView>
          
            <View style={styles.draw_header} >
              <Text style={styles.text_header}>LIST OF CATEGORIES</Text>
              <View style={styles.search_block}>
                <TextInput 
                value={input}
                style={styles.input_style}
                placeholder={"Find category"}
                placeholderTextColor={'white'}
                onChangeText={setInput}
                />

                <TouchableOpacity style={[styles.find_btn, input ? {} : {display: 'none'}]} onPress={() => setInput("")}>
                  <Text style={styles.find_text}>CLEAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          
              <DrawerContentScrollView {...props} style={styles.list_of_categories}>
                  <DrawerItem 
                  label={"ALL IDEAS"} 
                  key={'-666'} 
                  labelStyle={{fontStyle: 'italic', fontSize: 15}}
                  style={[styles.all_ideas, active ? {} : styles.main_idea]} 
                  onPress={() => {
                    setActive(undefined);
                    props.navigation.navigate("All ideas", {cat_id: undefined})}}
                  icon={() => <Icon color={'#0059ff'} size={20} name={'refresh'} type={'font-awesome'}/>} />
                  <View style={{marginTop: 40}}>{categories_list}</View>
              </DrawerContentScrollView> 

              <View style={styles.buttons_container}>
                <AddCategory type={'category'}/>

                  <TouchableOpacity style={[styles.trash_block, active ? {} : {display: 'none'}]} onPress={() => setModalVisible(!modalVisible)}>
                    <Icon name={'trash'} type={'font-awesome'} size={40} color={'red'} />
                  </TouchableOpacity>
                  
                  <AskForDelete visible={modalVisible} setMV={setModalVisible} callback={remover} from_ideas={true}/>
              </View>
        

      </DrawerContentScrollView>
  );
}

export const DrawerComponent = () => {
  return (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
  drawerStyle={styles.navigator}
  edgeWidth={1000}
  >
      <Drawer.Screen name="All ideas" component={ListOfIdeas} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  navigator: {
    paddingBottom: 10,
    borderColor: 'blue',
  },

  item: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },

  draw_header: {
    flex: 1,
    backgroundColor: '#0059ff',

  },

  text_header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    fontStyle: 'italic',
  },

  list_of_categories: {
    height: Dimensions.get('window').height * 0.7,
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

  input_style: {
    backgroundColor: '#00aaff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 30,
    paddingVertical: 5, 
    marginBottom: 5,
    flex: 4,
  },

  find_btn: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    flex: 1.2,
    height: 30,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  search_block: {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

  find_text: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 2,
  },

  all_ideas: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    // marginBottom: 20,
    position: 'absolute',

  },

  main_idea: {
    borderWidth: 3,
    borderBottomWidth: 3,
    borderBottomColor:'#0059ff',
    borderColor: '#0059ff',
    height: 40,
    justifyContent: 'center',
  },

  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: "28%",
  },

  trash_block: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
  }

})