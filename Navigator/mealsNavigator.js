import React from 'react';
import { Platform, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import CategoriesScreen from './../Screens/CategoriesScreen';
import CategoryMealsScreen from './../Screens/CategoryMealsScreen';
import FavouritesScreen from './../Screens/FavouritesScreen';
import FiltersScreen from './../Screens/FiltersScreen';
import MealDetailsScreen from './../Screens/MealDetailsScreen';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

const stackNavigatorDefaultConfiguration = {
    mode: "modal",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#222f3e',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontFamily: "pacifico"
        }
    }
}

// CATEGORIES SCREEN STACK NAVIGATOR
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: "Categories"
        }
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetails: MealDetailsScreen,
}, { initialRouteName: "Categories", ...stackNavigatorDefaultConfiguration })

// FAVOURITE SCREEN STACK NAVIGATOR

const filterStackNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetails: MealDetailsScreen
}, { initialRouteName: "Favourites", ...stackNavigatorDefaultConfiguration })

// TAB NAVIGATOR ROOT CONFIGURATION

const tabNavigatorCommonConfiguration = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: <Text style={{ fontFamily: "open_sans_extra_bold", textAlign: "center" }}>Meals</Text>,
            tabBarIcon: (tabInfo) => {
                return (<MaterialCommunityIcons name="food-fork-drink" size={23}
                    color={tabInfo.tintColor}></MaterialCommunityIcons>)
            },
            tabBarColor: "#222f3e"
        }
    },
    Favourites: {
        screen: filterStackNavigator,
        navigationOptions: {
            tabBarLabel: <Text style={{ fontFamily: "open_sans_extra_bold", textAlign: "center" }}>Favourites</Text>,
            tabBarIcon: (tabInfo) => <MaterialCommunityIcons name="heart" size={23}
                color={tabInfo.tintColor}></MaterialCommunityIcons>,
            tabBarColor: "#c0392b"
        }
    }
};


// TAB NAVIGATOR DIFFERENT FOR IOS AND ANDROID
const BottomTabs = Platform.OS === "android" ?

    createMaterialBottomTabNavigator(tabNavigatorCommonConfiguration, {
        activeColor: "#fff",
        inactiveColor: "#fff",
        shifting: true
    })

    : createBottomTabNavigator(tabNavigatorCommonConfiguration, {
        tabBarOptions: {
            activeTintColor: "#c0392b",
            inactiveTintColor: "#95a5a6",
            labelStyle: {
                fontFamily: "pacifico"
            }
        }
    })



// FILTERS NAVIGATOR
const filtersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, stackNavigatorDefaultConfiguration)


// DRAWER NAVIGATOR

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: BottomTabs, navigationOptions: {
            drawerLabel: "Home"
        }
    },
    Filters: {
        screen: filtersNavigator, navigationOptions: {
            drawerLabel: "Filters"
        }
    }
}, {
    initialRouteName : "Home",
    contentOptions: {
        activeTintColor: "#e67e22",
        labelStyle: {
            fontFamily: "pacifico",
            fontWeight: "200"
        }
    }
})

export default createAppContainer(DrawerNavigator);