'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Menu = require('./SideBar');

var Search = require('./Search');
var QR = require('./QR');
var Camera = require('./Camera');
var Map = require('./Map');
var Profile = require('./Profile');

var {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

var {
  Icon,
  TabBarIOS,
  Spinner 
} = require('react-native-icons');

var TabBarItemIOS = TabBarIOS.Item;

var Default = React.createClass({
  getInitialState: function () {
    return {
      selectedTab: 'home',
      notifCount: 0,
      presses: 0,
      // rotation: Animated.Value(0)
    };
  },
  render: function () {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#008888'}
        barTintColor={'#d6d7da'}>


        <TabBarItemIOS
          name="home"
          iconName={'fontawesome|home'}
          title={'Home'}
          badgeValue={420}
          iconSize={18}
          accessibilityLabel="Home Tab"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          <Search/>
        </TabBarItemIOS>
        

        <TabBarItemIOS
          name="articles"
          iconName={'fontawesome|qrcode'}
          title={'QR'}
          iconSize={18}
          accessibilityLabel="Articles Tab"
          selected={this.state.selectedTab === 'articles'}
          onPress={() => {
            this.setState({
              selectedTab: 'articles',
            });
          }}>
          <QR/>
        </TabBarItemIOS>
        

        <TabBarItemIOS
          name="messages"
          iconName={'fontawesome|camera'}
          title={'Scan'}
          iconSize={18}
          accessibilityLabel="Messages Tab"
          selected={this.state.selectedTab === 'messages'}
          onPress={() => {
            this.setState({
              selectedTab: 'messages',
            });
          }}>
          <Camera/>
        </TabBarItemIOS>


        <TabBarItemIOS
          name="settings"
          iconName={'fontawesome|globe'}
          title={'Map'}
          iconSize={18}
          accessibilityLabel="Settings Tab"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          <Map/>
        </TabBarItemIOS>


        <TabBarItemIOS
          name="profile"
          iconName={'fontawesome|user'}
          title={'Profile'}
          badgeValue={69}
          iconSize={18}
          accessibilityLabel="Profile"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
          }}>
          <Profile/>
        </TabBarItemIOS>
        
      </TabBarIOS>
    );
  },
});

var styles = StyleSheet.create({

});

module.exports = Default;