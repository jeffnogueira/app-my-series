import React from 'react'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import CategoryScreen from './screens/CategoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import ViewSerie from './screens/ViewSerieScreen'
import ViewCategory from './screens/ViewCategoryScreen'
import Login from './screens/Login'

const TabNavigator = createBottomTabNavigator({
  "Home": {
      screen: HomeScreen,
  },
  "Pesquisa": {
      screen: SearchScreen,
  },
  "Categoria": {
      screen: CategoryScreen,
  },
  "Perfil": {
    screen: ProfileScreen,
  },
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
         iconName = "ios-filing";
      }
      if (routeName === 'Pesquisa') {
         iconName = "ios-search";
      }
      if (routeName === 'Categoria') {
         iconName = "ios-list";
      }
      if (routeName === 'Perfil') {
         iconName = "ios-person";
      }

      return <IconComponent name={iconName} size={25} />;
    }
  })
});


const Navigator = createStackNavigator({
  Menu: TabNavigator,
  ViewSerie: {
    screen: ViewSerie,
  },
  ViewCategory: {
    screen: ViewCategory,
  },
  Login: {
    screen: Login,
  }
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
});

export default createAppContainer(Navigator);
