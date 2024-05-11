import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Card from './card';
import SideMenuIcon from '../assets/icons/sideMenuIcon';
import ShoppingCartIcon from '../assets/icons/shoppingCartIcon';
import LogoIcon from '../assets/icons/logoIcon';
import ChevronLeftIcon from '../assets/icons/chevronLeftIcon';
import EmptyBoxIcon from '../assets/icons/emptyBoxIcon';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import {fetchCategoryData} from './api';
import {Category, categoryMapper, fakeCategories} from './category';
import IconButton from '../sharedComponents/iconButton';
import ErrorIcon from '../assets/icons/errorIcon';
import AlertMessage from '../sharedComponents/alertMessage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const HomePage = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const [data, setData] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<{
    category: Category | undefined;
    page: number;
  }>({
    category: undefined,
    page: 0,
  });
  const [categoryStack, setCategoryStack] = useState<Category[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsEmpty(false);
    setIsErrorOccured(false);
    fetchCategories();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    if (selectedCategory.page == 0) {
      setLoading(true);
      if (data.length > 0) {
        flatListRef.current?.scrollToIndex({
          index: 0,
        });
      }
      setData([]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    try {
      const response: any = await fetchCategoryData(
        selectedCategory.page,
        selectedCategory.category
          ? parseInt(selectedCategory.category.id)
          : null,
        i18n.language,
      );
      if (response.totalNumber > 0) {
        const transformedData: Category[] =
          response.results.map(categoryMapper);
        const filteredCategories = transformedData.filter(
          newCategory => !data.find(category => category.id === newCategory.id),
        );
        setData(prevData => [...prevData, ...filteredCategories]);
        setTotalPages(Math.ceil(response.totalNumber / 10));
      } else {
        if (selectedCategory.page == 0) {
          setIsEmpty(true);
        }
      }
    } catch (error) {
      setData([]);
      setIsErrorOccured(true);
    }
  };

  const renderItem = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => handleCardPress(item)}>
      <View style={{width: '100%', height: '100%'}}>
        <Card title={item.title} imageUri={item.imageUrl} loading={loading} />
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (selectedCategory.page < totalPages - 1) {
      setSelectedCategory(prevState => ({
        ...prevState,
        page: selectedCategory.page + 1,
      }));
    }
  };

  const handleCardPress = (category: Category) => {
    if (category.numberOfProducts > 0) {
      navigation.navigate('products', {parentCategory: category.title});
    } else {
      resetView(category);
      setCategoryStack(prevStack => [...prevStack, category]);
    }
  };

  const handleBackPress = () => {
    let previousCategory = undefined;
    if (categoryStack.length > 0) {
      categoryStack.pop();
      previousCategory = categoryStack.slice(-1)[0];
    }
    resetView(previousCategory);
  };

  const resetView = (previousCategory: Category | undefined) => {
    setTotalPages(0);
    setSelectedCategory({
      category: previousCategory,
      page: 0,
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'dark-content'} backgroundColor="transparent" />
      <View style={styles.topBar}>
        <IconButton
          icon={<SideMenuIcon />}
          onPress={() => navigation.openDrawer()}
        />
        <View
          style={[
            styles.logo,
            I18nManager.isRTL
              ? {flexDirection: 'row-reverse'}
              : {flexDirection: 'row'},
          ]}>
          <LogoIcon />
          <Text style={styles.logoName}>Audio</Text>
        </View>
        <IconButton icon={<ShoppingCartIcon />} />
      </View>
      <Text style={styles.helloMessage}>{t('homePage.helloMessage')}</Text>
      <Text style={styles.question}>{t('homePage.question')}</Text>
      <View style={styles.categoriesView}>
        <View style={styles.categoriesLabelContainer}>
          {selectedCategory.category ? (
            <>
              <IconButton
                icon={<ChevronLeftIcon />}
                onPress={handleBackPress}
              />
              <Text style={styles.categoriesLabel}>
                {selectedCategory.category.title}
              </Text>
            </>
          ) : (
            <Text style={styles.categoriesLabel}>
              {t('homePage.categories')}
            </Text>
          )}
        </View>
        {isEmpty && !loading && (
          <View style={styles.alertMessage}>
            <AlertMessage
              icon={<EmptyBoxIcon />}
              message={t('homePage.emptyCategory')}
            />
          </View>
        )}
        {isErrorOccured && !loading && (
          <View style={styles.alertMessage}>
            <AlertMessage icon={<ErrorIcon />} message={t('global.error')} />
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={loading ? fakeCategories() : data}
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
  logo: {
    alignItems: 'center',
  },
  logoName: {
    paddingStart: 4,
    fontFamily: 'DMSansBold',
    fontSize: 19.05,
    lineHeight: 24.8,
    color: '#000000',
    letterSpacing: 0.24,
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helloMessage: {
    paddingHorizontal: 24,
    paddingTop: 12,
    fontFamily: 'DMSansRegular',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
    letterSpacing: 0.2,
  },
  question: {
    paddingHorizontal: 24,
    paddingTop: 12,
    fontFamily: 'DMSansBold',
    fontSize: 24,
    lineHeight: 32,
    color: '#000000',
    letterSpacing: 0.2,
  },
  categoriesView: {
    flex: 1,
    marginTop: 32,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: '#F6F6F6',
  },
  categoriesLabel: {
    fontFamily: 'DMSansMedium',
    fontSize: 16,
    lineHeight: 20.83,
    color: '#000000',
    letterSpacing: 0.2,
  },
  categoriesLabelContainer: {
    paddingTop: 24,
    paddingBottom: 12,
    paddingStart: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: 24,
  },
  cardItem: {
    flex: 1,
    width: '50%',
    maxWidth: '50%',
    aspectRatio: 0.895,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  alertMessage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default HomePage;
