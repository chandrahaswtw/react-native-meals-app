import { categoriesData, CategoryMealsData } from './../data/dummy-data';

const initialState = {
    mealCategories: categoriesData,
    allMeals: CategoryMealsData,
    filteredMeals: CategoryMealsData,
    favouriteIDs: ["m1", "m3"]
}

const MealReducer = (state = initialState, action) => {
    switch (action.type) {
        case "fav":
            const favouriteIDsClone = [...state.favouriteIDs];
            if (favouriteIDsClone.includes(action.id)) {
                const index = favouriteIDsClone.indexOf(action.id);
                if (index > -1) {
                    favouriteIDsClone.splice(index, 1);
                }
            }
            else {
                favouriteIDsClone.push(action.id)
            }
            return { ...state, favouriteIDs: favouriteIDsClone };
            break;

        case "filter":
            const { isGlutenFree, isLactoseFree, isVegan, isVegetarian } = action.value;
            const allMealsClone = [...state.allMeals];
            const filteredMealsNew = allMealsClone.filter((el) => {
                var x = (isGlutenFree ? el.isGlutenFree === isGlutenFree : 1) &&
                    (isLactoseFree ? el.isLactoseFree === isLactoseFree : 1) &&
                    (isVegan ? el.isVegan === isVegan : 1) &&
                    (isVegetarian ? el.isVegetarian === isVegetarian : 1)

                return x;
            })
            return { ...state, filteredMeals: filteredMealsNew };

        default:
            return state;
    }

}

export default MealReducer;