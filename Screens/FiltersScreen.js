import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SwitchComponent from './../UI/SwitchComponent';
import CustomHeaderButton from './../Components/CustomHeaderButton';
import {useDispatch, useSelector} from 'react-redux';

const FiltersScreen = props => {

    const [isGlutenFree, setGlutenFree] = useState(false);
    const [isLactoseFree, setLactoseFree] = useState(false);
    const [isVegan, setVegan] = useState(false);
    const [isVegetarian, setVegetarian] = useState(false);

    const dispatch = useDispatch();

    const filterContent = useCallback(() =>{
        dispatch({type : "filter", value : {isGlutenFree, isLactoseFree, isVegan, isVegetarian}})
    },[isGlutenFree, isLactoseFree, isVegan, isVegetarian])

    useEffect(()=>{
        props.navigation.setParams({
            filterContent
        })
    },[filterContent])

    return (
        <View style={styles.coreWrapper}>
            <View style={styles.row}>
                <Text style={styles.titleText}>Gluten free</Text>
                <SwitchComponent isEnabled={isGlutenFree} valueChangeHandler={(e) => { setGlutenFree(e) }}></SwitchComponent>
            </View>
            <View style={styles.row}>
                <Text style={styles.titleText}>Lactose free</Text>
                <SwitchComponent isEnabled={isLactoseFree} valueChangeHandler={(e) => { setLactoseFree(e) }}></SwitchComponent>
            </View>
            <View style={styles.row}>
                <Text style={styles.titleText}>Is Vegan</Text>
                <SwitchComponent isEnabled={isVegan} valueChangeHandler={(e) => { setVegan(e) }}></SwitchComponent>
            </View>
            <View style={styles.row}>
                <Text style={styles.titleText}>Is Vegetarian</Text>
                <SwitchComponent isEnabled={isVegetarian} valueChangeHandler={(e) => { setVegetarian(e) }}></SwitchComponent>
            </View>
        </View>
    )
}


FiltersScreen.navigationOptions = navInfo => {

    const filterContent = navInfo.navigation.getParam("filterContent")
    return {
        headerLeft: () => <CustomHeaderButton title="Side Drawer" iconName="menu-fold"
            pressHandler={() => { navInfo.navigation.toggleDrawer() }}
        ></CustomHeaderButton>,
        headerRight: () => <CustomHeaderButton title="Side Drawer" iconName="save"
            pressHandler={() => { filterContent() }}
        ></CustomHeaderButton>
    }
}


const styles = StyleSheet.create({
    coreWrapper: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 50
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20
    },
    titleText: {
        fontFamily: "pacifico",
        color : "#d35400"
    }
})

export default FiltersScreen;