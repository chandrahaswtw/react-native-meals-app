import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CategoryMealsData } from './../data/dummy-data';
import CategoryMealsComponent from './../Components/CategoryMeals';
import {useSelector} from 'react-redux';

const Favourites = props => {
    const mealIDs = useSelector(state => state.MealState.favouriteIDs);

    const meals = CategoryMealsData.filter((el) => {
        return mealIDs.includes(el.id)
    })

    if(!meals.length){
        return (
            <View style={styles.fallBackWrapper}>
                <Text style={styles.fallBackText}>Oops! There are no favourites yet. Try adding more here</Text>
            </View>
        )
    }


    return (
        <View style={styles.wrapper}>
            <CategoryMealsComponent meals={meals} nav={props.navigation}></CategoryMealsComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        flex : 1,
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

export default Favourites