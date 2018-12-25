// Import react libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

class HeaderCard extends Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.headerBackground} />
                <View style={styles.headerContent}>
                    <Image
                        style={styles.headerIcon}
                        source={this.props.link}
                        resizeMethod='resize'
                    />
                    <View style={styles.headerContentText}>
                        {
                            this.props.children
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    header: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        maxHeight: (height >= 570) ? 130 : 90
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        shadowColor: '#AAC1C5',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.36,
        zIndex: 0
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'transparent'
    },
    headerIcon: {
        flex: 2.5,
        width: 70,
        height: 70
    },
    headerContentText: {
        flex: 7.5,
        paddingLeft: 15,
    },

});
export { HeaderCard };
