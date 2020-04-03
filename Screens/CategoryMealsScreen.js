import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useSelector} from 'react-redux';
import CategoryMealsComponent from './../Components/CategoryMeals';

const CategoryMealsScreen = props => {
    
    const categoriesData = props.navigation.getParam("categoriesData");
    const CategoryMealsData = useSelector(state => state.MealState.filteredMeals)

    var meals = CategoryMealsData.filter((el) => {
        return el.categoryIds.includes(props.navigation.getParam("categoryID"))
    })

    if(!meals.length){
        return (
            <View style={styles.fallBackWrapper}>
                <Text style={styles.fallBackText}>Oops! No items in this category. Try searching in others...</Text>
            </View>
        )
    }


    return (<View style={styles.wrapper}>
        <CategoryMealsComponent meals = {meals} nav = {props.navigation}></CategoryMealsComponent>
    </View>)
}

CategoryMealsScreen.navigationOptions = (navigationData) => {

    const categoriesData = navigationData.navigation.getParam("categoriesData");

    const title = categoriesData.find((el)=>{
       return el.id === navigationData.navigation.getParam("categoryID");  
    }) 
    return {
        headerTitle : title.title
    };
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallBackWrapper : {
        flex : 1,
        justifyContent : "center"
    },
    fallBackText: {
        textAlign : "center",
        fontFamily : "pacifico",
        color : "#c0392b"
    }

})

export default CategoryMealsScreen;