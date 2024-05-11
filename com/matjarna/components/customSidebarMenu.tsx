import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import ChevronLeftIcon from '../assets/icons/chevronLeftIcon';
import IconButton from '../sharedComponents/iconButton';
import {useTranslation} from 'react-i18next';
import UserInfo from './userInfo';

const CustomSidebarMenu = (props: any) => {
  const {state, descriptors, navigation} = props;
  let lastGroupName = '';
  let newGroup = true;
  const {t} = useTranslation();

  function SideMenuHeader() {
    return (
      <View style={styles.sideMenuHeader}>
        <View style={styles.headerSides}>
          <IconButton
            icon={<ChevronLeftIcon />}
            onPress={() => navigation.closeDrawer()}
          />
        </View>
        <Text style={styles.sideMenuHeaderText}>{t('sideMenu.profile')}</Text>
        <View style={styles.headerSides}></View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerSection}>
        <SideMenuHeader />
        <UserInfo />
      </View>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route: any, index: any) => {
          const {drawerLabel, activeTintColor, groupName} =
            descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else {
            newGroup = false;
          }
          return (
            <React.Fragment key={index}>
              {newGroup ? (
                <View style={styles.sectionContainer}>
                  <Text key={groupName} style={styles.sectionLabel}>
                    {groupName}
                  </Text>
                </View>
              ) : null}
              <DrawerItem
                style={
                  route.name == 'home'
                    ? styles.hidden
                    : styles.drawerItem
                }
                key={route.key}
                label={() => (
                  <Text style={styles.draweItemLabel}>{drawerLabel}</Text>
                )}
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </React.Fragment>
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  headerSection: {
    paddingBottom: 32,
    display: 'flex',
    rowGap: 35,
    paddingTop: 11,
    paddingHorizontal: 24,
    borderBottomWidth: 0.2,
    borderBottomColor: '#7F7F7F',
  },
  sideMenuHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideMenuHeaderText: {
    fontFamily: 'DMSansBold',
  },
  headerSides: {
    width: 25,
  },
  drawerItem: {
    marginHorizontal: 0,
    marginVertical: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#0000001A',
    paddingHorizontal: 8,
  },
  hidden: {
    display: 'none',
  },
  draweItemLabel: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'DMSansRegular',
  },
  sectionLabel: {
    marginLeft: 16,
    fontSize: 13,
  },
});

export default CustomSidebarMenu;
