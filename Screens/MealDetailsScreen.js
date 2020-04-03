import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView } from 'react-native';
import CustomHeaderButton from './../Components/CustomHeaderButton';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

const MealDetailsScreen = props => {

    const dispatch = useDispatch();
    const favouritesList = useSelector(state => state.MealState.favouriteIDs);
    const isFavourite = favouritesList.includes(props.navigation.getParam("mealID"))

    const toggleFavourites = (id) => {
        dispatch({ type: "fav", id })
    }

    useEffect(() => {
        props.navigation.setParams({ isFavourite })
    }, [isFavourite])

    useEffect(() => {
        props.navigation.setParams({ toggleFavourites });
    }, [])


    const CategoryMealsData = useSelector(state => state.MealState.filteredMeals);
    const theMeal = CategoryMealsData.find((el) => el.id === props.navigation.getParam("mealID"))

    const IngredientList = (type) => {
        let parameterContent = type === "step" ? theMeal.steps : theMeal.ingredients;
        return parameterContent.map((el, index) => {
            return (
                <View key={index} style={styles.ingredientIndividualWrapper}>
                    <View style={styles.styleIcon}>
                        <AntDesign name={type === "step" ? "check" : "caretright"} ></AntDesign>
                    </View>
                    <Text style={styles.ingredientIndividualText}>{el}</Text>
                </View>
            )
        })
    }

    return (
        <ScrollView style={styles.mainWrapper}>
            <View style={styles.imageWrapper}>
                <ImageBackground source={{ uri: theMeal.imageUrl }} style={styles.imageStyles}>
                    <View style={styles.imageTextWrapper}>
                        <Text style={styles.imageText}>{theMeal.title.toUpperCase()}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.ingredientsOuter}>
                <Text style={styles.ingredientsText}>Ingredients</Text>
                {IngredientList()}
            </View>
            <View style={styles.ingredientsOuter}>
                <Text style={styles.ingredientsText}>Steps to prepare</Text>
                {IngredientList("step")}
            </View>
        </ScrollView>)
}

MealDetailsScreen.navigationOptions = (navigationData) => {
    const isFavourite = navigationData.navigation.getParam("isFavourite");
    const toggleFavourites = navigationData.navigation.getParam("toggleFavourites");
    return {
        headerTitle: navigationData.navigation.getParam("title"),
        headerRight: () => {
            return (
                <CustomHeaderButton title="Favourite" iconName={isFavourite ? "heart" : "hearto"} pressHandler={() => {
                    toggleFavourites(navigationData.navigation.getParam("mealID"))
                }}></CustomHeaderButton>
            )
        }
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding: 10,
    },
    imageWrapper: {
        width: "100%",
        height: 200,
        overflow: "hidden",
        borderRadius: 5
    },
    imageStyles: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    imageTextWrapper: {
        flex: 1,
        justifyContent: "flex-end"
    },
    imageText: {
        fontFamily: "open_sans_extra_bold",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.4)"
    },
    ingredientsOuter: {
        padding: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10
    },
    ingredientsText: {
        fontFamily: "pacifico",
        backgroundColor: "#e67e22",
        textAlign: "center"
    },
    styleIcon: {
        width: 20,
        backgroundColor: "#2ecc71",
        borderRadius: 2,
        padding: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    ingredientIndividualWrapper: {
        flexDirection: "row",
        marginVertical: 4
    },
    ingredientIndividualText: {
        marginLeft: 4,
        fontFamily: "pacifico"
    }
})

export default MealDetailsScreen;