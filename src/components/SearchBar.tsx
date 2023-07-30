import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {usePaginationContext} from '../context/PaginationContext';
import {useSearchContext} from '../context/SearchContext';

interface SearchBarProps {
  search: (searchQuery: string, page: number) => Promise<void>;
}

export default function SearchBar({search}: SearchBarProps) {
  const {searchQuery, setSearchQuery} = useSearchContext();
  const {resetPageCount} = usePaginationContext();

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search images and authors..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholderTextColor="white"
      />
      <TouchableOpacity
        onPress={() => {
          search(searchQuery, 1);
          resetPageCount();
        }}
        style={styles.button}
        activeOpacity={1}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    height: 35,
    flexDirection: 'row',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 30,
    paddingLeft: 8,
  },
  input: {
    color: 'white',
    width: '70%',
    paddingLeft: 10,
    fontSize: 14,
  },
  button: {
    flex: 1,
    height: '100%',
    backgroundColor: 'blue',
    marginBottom: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
