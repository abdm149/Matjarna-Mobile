import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useRoute,
} from '@react-navigation/native';
import IconButton from '../sharedComponents/iconButton';
import ShoppingCartIcon from '../assets/icons/shoppingCartIcon';
import ChevronLeftIcon from '../assets/icons/chevronLeftIcon';
import EmptyBoxIcon from '../assets/icons/emptyBoxIcon';
import ErrorIcon from '../assets/icons/errorIcon';
import AlertMessage from '../sharedComponents/alertMessage';
import {Product, productMapper, fakeProducts} from './product';
import {fetchProductsData} from './api';
import Card from './card';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

type ProductsScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Products = ({navigation}: ProductsScreenProps) => {
  const {t, i18n} = useTranslation();
  const [data, setData] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute();
  const parentCategory = (route.params as {parentCategory?: any})
    ?.parentCategory;
  const countryCode = useSelector((state: any) => state.location.countryCode);

  useEffect(() => {
    setIsEmpty(false);
    setIsErrorOccured(false);
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const response: any = await fetchProductsData(
        page,
        i18n.language,
        countryCode,
      );
      if (response.totalNumber > 0) {
        const transformedData: Product[] = response.results.map(productMapper);
        const filteredProducts = transformedData.filter(
          newProduct => !data.find(product => product.id === newProduct.id),
        );
        setData(prevData => [...prevData, ...filteredProducts]);
        setTotalPages(Math.ceil(response.totalNumber / 10));
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      setData([]);
      setIsErrorOccured(true);
    }
  };

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => handleCardPress(item)}>
      <View style={{width: '100%', height: '100%'}}>
        <Card
          title={item.title}
          price={item.price}
          imageUri={item.imageUrl}
          loading={loading}
        />
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleCardPress = (product: Product) => {
    console.log('press');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'dark-content'} backgroundColor="transparent" />
      <View style={styles.topBar}>
        <IconButton icon={<ChevronLeftIcon />} onPress={handleBackPress} />
        <IconButton icon={<ShoppingCartIcon />} />
      </View>
      <Text style={styles.categoryName}>{parentCategory}</Text>
      <View style={styles.productsView}>
        {isEmpty && !loading && (
          <View style={styles.alertMessage}>
            <AlertMessage
              icon={<EmptyBoxIcon />}
              message={t('products.noProducts')}
            />
          </View>
        )}
        {isErrorOccured && !loading && (
          <View style={styles.alertMessage}>
            <AlertMessage icon={<ErrorIcon />} message={t('global.error')} />
          </View>
        )}
        <FlatList
          data={loading ? fakeProducts() : data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          style={styles.cardContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryName: {
    paddingHorizontal: 24,
    paddingTop: 18,
    fontFamily: 'DMSansBold',
    fontSize: 24,
    lineHeight: 32,
    color: '#000000',
    letterSpacing: 0.2,
  },
  productsView: {
    flex: 1,
    marginTop: 32,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: '#F6F6F6',
  },
  cardItem: {
    flex: 1,
    width: '50%',
    maxWidth: '50%',
    aspectRatio: 0.7,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 28,
  },
  cardContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  alertMessage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Products;
