// Import libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            showPass: true,
            error: false,
        }
    }
    render() {
        return (
            <View style={[styles.container, this.props.inputStyle]}>
                  <Text style={[styles.label, this.props.inputStyleLabel]}>{this.props.typeName}</Text>
                  <View style={[styles.inputContainer, this.props.inputContainer]}>
                    <TextInput
                        style={[styles.input, { paddingRight: 70 }]}
                        onChangeText={(text) => {
                            this.setState({ text });
                            this.props.setValue(text);

                        }}
                        value={this.state.text}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='#757575'
                        secureTextEntry={!this.state.showPass}
                        autoFocus={this.props.autoFocus}
                        underlineColorAndroid='transparent'
                        keyboardType = {this.props.keyboardType}
                    />
                </View>
            </View>
        );
    }
}

PasswordInput.defaultProps = {
    inputStyle: {},
    typeName: 'Input',
    placeholder: 'Enter text',
    setValue: (text) => { },
    disabledError: false,
    autoFocus: false,
    keyboardType : 'phone-pad'
};

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    label: {
        marginBottom: 5,
        color: '#FFFFFF',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',
        zIndex: 1
    },
    button: {
        position: 'absolute',
        right: 15
    },
    buttonText: {
        color: '#00528F',
        fontSize: 12
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: '#000000',
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 6
    },
});

export {PasswordInput}
