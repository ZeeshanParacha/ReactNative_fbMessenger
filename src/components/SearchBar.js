import React, { Component } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AppStyles from '../config/styles';

import { Appbar, Searchbar } from 'react-native-paper';

export default class SearchHeader extends Component {
    state = {
        searchQuery: '',
        isFocused: false
    };

    onFocus = () => {
        this.setState(
            {
                isFocused: true
            },
            () => {
                this.props.navigation.navigate('SearchScreen');
                setTimeout(() => {
                    this.searchTextInput.focus();
                }, 240);
            }
        );
    };

    onBlur = () => {
        this.setState({
            isFocused: false
        });
    };

    onPress = () => {
        if (this.state.isFocused) {
            this.setState({
                isFocused: false
            });
            this.props.navigation.pop();
        } else {
            this.onFocus();
        }
    };

    render() {
        const activeScreen = this.props.navigation.state.routes[
            this.props.navigation.state.index
        ].routeName;

        return (
            <View style={{marginTop: Platform.OS === 'ios' ? 0 : - 24 , borderBottomColor : '#E5E5E5' , borderBottomWidth : 1}}>
                
                {this.state.isFocused ? (
                    <Appbar.Header style={styles.toolbar}>
                        <Searchbar
                            ref={input => {
                                this.searchTextInput = input;
                            }}
                            style={styles.searchbar}
                            placeholder="Search"
                            icon={
                                Platform.OS === 'ios'
                                    ? 'keyboard-arrow-left'
                                    : 'keyboard-arrow-left'
                            }
                            onIconPress={this.onPress}
                            onChangeText={query => {
                                this.setState({ searchQuery: query });
                            }}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            value={this.state.searchQuery}
                        />
                    </Appbar.Header>
                ) : (
                    <Appbar.Header style={styles.toolbar}>
                        <Appbar.Action icon="search" onPress={this.onPress} />
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.onPress}
                        >
                            <Text style={styles.btnText}>Search</Text>
                        </TouchableOpacity>
                        <Appbar.Action icon="face" onPress={this._onSearch} />
                    </Appbar.Header>
                )}
            </View>
        );
    }
}






const styles = StyleSheet.create({
    searchbar: {
        backgroundColor: AppStyles.colors.white,
        elevation: 0,
        borderColor : '#ccc'
        
    },
    appBarHeight: {
        padding:0
       
      },
    toolbar: {
        backgroundColor: AppStyles.colors.white,
        borderColor : '#ccc'
       
    },
    search: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    input: {
        width: '90%',
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
     
    },
    btn: {
        width: '75%',
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    btnText: {
        fontSize: 16,
      
        color: '#7f8c8d'
    }
});

