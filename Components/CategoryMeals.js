import React from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { CategoryMealsData } from './../data/dummy-data';
import {useSelector} from 'react-redux'

const CategoryMeals = props => {

    const favouritesList = useSelector(state => state.MealState.favouriteIDs);

    var renderItems = (item) => {
        return (
            <TouchableOpacity style={styles.imageWrapper} activeOpacity={0.7} onPress={()=>{
                props.nav.navigate({routeName : "MealDetails",
                 params:  {
                     mealID : item.id, 
                     title : item.title,
                     isFavourite : favouritesList.includes(item.id)
                    }})
            }}>
                <ImageBackground style={styles.theImage} source={{ uri: item.imageUrl }}>
                    <View style={styles.imageOverLayTitleWrapper}>
                        <Text style={styles.textStyles} numberOfLines={1}>{item.title.toUpperCase()}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.bottomSpecs}>
                    <Text style={styles.bottomSpecsText}>{item.duration} min</Text>
                    <Text style={styles.bottomSpecsText}>{item.complexity}</Text>
                    <Text style={styles.bottomSpecsText}>{item.affordability}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList style={styles.flatStyles} data={props.meals} renderItem={(dataItem) => { return renderItems(dataItem.item) }}>
        </FlatList>)
}

const styles = StyleSheet.create({
    flatStyles: {
        flex: 1,
        width: "100%",
        padding: 10
    },
    imageWrapper: {
        height: 200,
        marginBottom: 20,
        borderRadius: 5,
        overflow: "hidden"
    },
    theImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        flex: 6
    },
    imageOverLayTitleWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    textStyles: {
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.6)",
        fontFamily: "open_sans_extra_bold"
    },
    bottomSpecs: {
        flex: 1,
        backgroundColor: "#4b4b4b",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    bottomSpecsText: {
        color: "#fff",
        fontFamily : "pacifico"
    }

})

export default CategoryMeals;