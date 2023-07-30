import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {LikesProvider} from './src/context/LikeContext';
import {PaginationProvider} from './src/context/PaginationContext';
import {SearchProvider} from './src/context/SearchContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen/DetailsScreen';
import {useSearch} from './src/hooks/useSearch';

const Stack = createStackNavigator();

const App = () => {
  const {images, isLoading, error, searchImages} = useSearch();

  return (
    <SearchProvider>
      <PaginationProvider>
        <LikesProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  children={props => (
                    <HomeScreen
                      {...props}
                      images={images}
                      isLoading={isLoading}
                      error={error}
                      searchImages={searchImages}
                    />
                  )}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Details"
                  component={DetailsScreen}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </LikesProvider>
      </PaginationProvider>
    </SearchProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
