import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import {useSelector} from "react-redux";
import CategoriesComponent from './../Components/Categories';
import CustomHeaderButton from './../Components/CustomHeaderButton';

const CategoriesScreen = props => {

    let categoriesData = useSelector(state => state.MealState.mealCategories)

    return (
        <FlatList numColumns={2} data={categoriesData} renderItem={(dataItem) => {
            return (
                <CategoriesComponent item = {dataItem.item} nav={props.navigation}></CategoriesComponent>
            )
        }}>
        </FlatList>
    )
}

const styles = StyleSheet.create({

})

CategoriesScreen.navigationOptions = navInfo => {
    return {
        headerLeft : () => <CustomHeaderButton title="Side Drawer" iconName="menu-fold"
        pressHandler = { () => {navInfo.navigation.toggleDrawer()} }
        ></CustomHeaderButton>
    }
}

export default CategoriesScreen;