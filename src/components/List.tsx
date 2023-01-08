import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks/redux';
import {getList} from '../redux/asyncReducers/asyncReducers';
import ListItem from './ListItem';
import ErrorComponent from './ErrorComponent';

const List = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const {error, persons} = useAppSelector(store => store.reducerList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getList(currentPage));
  }, [currentPage]);

  const renderItem = useCallback(
    ({item}: any) => {
      const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#fafafa';
      const color = item.id === selectedId ? 'white' : 'black';

      return (
        <ListItem
          key={item.id}
          name={item.name}
          id={item.id}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{backgroundColor}}
          textColor={{color}}
        />
      );
    },
    [selectedId],
  );

  const renderLoader = () => {
    return isLoading ? <ActivityIndicator size="large" /> : null;
  };

  const loadMoreItem = () => {
    if (currentPage <= 8) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!error ? (
        <FlatList
          data={persons}
          renderItem={renderItem}
          extraData={selectedId}
          keyExtractor={item => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      ) : (
        <ErrorComponent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default List;
