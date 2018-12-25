// Import libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

class TextInputWithLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            error: false
        }
    }
    checkTextFormat(text) {
        let error = false;

        switch (this.props.keyboardType) {
            case 'email-address':
                if (validateEmail(text) || text === '')
                    this.setState({ error });
                else {
                    error = true;
                    this.setState({ error });
                }

                break;
            case 'numeric':
                if (validatePhone(text) || text === '')
                    this.setState({ error });
                else {
                    error = true;
                    this.setState({ error });
                }

                break;
            default:
                break;
        }
        return error;

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            let min = 10;
            let max = 11;

            if (parseInt(phone.substr(0, 1)) !== 0) {
                min = 9;
                max = 10;
            }

            if (phone.length < min || phone.length > max)
                return false;

            if (isNaN(phone))
                return false;

            return true;
        }
    }
    render() {
        const inputStyle = styles.input

        const errorView = !this.props.disabledError && this.state.error ?
            <View style={styles.error}>
                <Text style={styles.errorText}>
                    {'Wrong ' + this.props.typeName.toLowerCase() + ' format'}
                </Text>
            </View>
            : null;

        return (
            <View style={[styles.container, this.props.inputStyle]}>
                <Text style={[styles.label, this.props.inputStyleLabel]}>{this.props.typeName}</Text>
                <View style={[styles.inputContainer, this.props.inputContainer]}>
                    <TextInput
                        style={inputStyle}
                        onChangeText={(text) => {
                            this.setState({ text });
                            const error = this.checkTextFormat(text);
                            this.props.setValue({ text, error });
                        }}
                        value={this.state.text}
                        placeholder={this.props.placeholder}
                        placeholderTextColor='#757575'
                        keyboardType={this.props.keyboardType}
                        autoFocus={this.props.autoFocus}
                        underlineColorAndroid='transparent'
                        secureTextEntry = {this.props.secureTextEntry}
                    />
                </View>
                {/* {errorView} */}
            </View>
        );
    }
}

TextInputWithLabel.defaultProps = {
    inputStyleLabel: {},
    inputStyle: {},
    typeName: 'Input',
    placeholder: 'Enter text',
    keyboardType: 'default',
    setValue: (text) => { },
    disabledError: true,
    autoFocus: false,
    phoneCode: '',
    secureTextEntry: false
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
    phoneCode: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#F0F5F6',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        zIndex: 1
    },
    phoneCodeText: {
        color: '#000000',
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: '#000000',
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        zIndex: 0
    },
    error: {
        marginTop: -6,
        paddingTop: 23,
        paddingBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#F55F61',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 0
    },
    errorText: {
        color: '#FFFFFF',
        fontSize: 14
    }
});

export {TextInputWithLabel}