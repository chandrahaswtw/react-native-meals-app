import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Text, StyleSheet, Platform } from 'react-native';
import {useSelector} from 'react-redux';
const Categories = props => {

    const categoriesData  = useSelector(state => state.MealState.mealCategories);
    const categoryItem = () => {
        return (
            <View style={{ ...styles.colorWrapper, backgroundColor: props.item.color }}>
                <Text style={styles.textStyles}>{props.item.title.toUpperCase()}</Text>
            </View>
        )
    }

    let WrapperView = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

    return (
        <View style={styles.gridItems}>
            <WrapperView style={{flex: 1}}
                onPress={() => {
                    props.nav.navigate(
                        {
                            routeName: "CategoryMeals",
                            params: {
                                categoryID: props.item.id,
                                categoriesData
                            }
                        })
                }}>
                {categoryItem()}
            </WrapperView>
        </View>)
}


const styles = StyleSheet.create({
    gridItems: {
        flex: 1,
        height: 150
    },
    textStyles: {
        fontFamily: "open_sans",
        padding: 5,
        textAlign: "right"
    },
    colorWrapper: {
        flex: 1,
        margin: 10,
        borderRadius: 5,
        justifyContent: "flex-end",
        elevation: 3
    },
})

export default Categories;