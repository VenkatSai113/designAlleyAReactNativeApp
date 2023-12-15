// TabbedScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

const TabbedScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Tab 1' },
    { key: 'second', title: 'Tab 2' },
    { key: 'third', title: 'Tab 3' },
    { key: 'fourth', title: 'Tab 4' },
    
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <View style={styles.tabContent}><Text>Content for Tab 1</Text></View>;
      case 'second':
        return <View style={styles.tabContent}><Text>Content for Tab 2</Text></View>;
      case 'third':
        return <View style={styles.tabContent}><Text>Content for Tab 3</Text></View>;
      case 'fourth':
        return <View style={styles.tabContent}><Text>Content for Tab 4</Text></View>;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#2196F3',
  },
  indicator: {
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TabbedScreen;
