import React, {Component} from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Dimensions,
    ScrollView, Modal, ActivityIndicator
} from 'react-native';
import * as Actions from '../Redux/Actions/LogInAction';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import firebase from 'react-native-firebase';
import {TextInputWithLabel} from "../CustomComponents/TextInputWithLabel";
import {HeaderCard} from "../CustomComponents/HeaderCard";
import {PasswordInput} from "../CustomComponents/PasswordInput";

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

class PhoneAuthTest extends Component {
    static navigationOptions = {
        header: (props) => (
            <View style={styles.header}>
                <View>
                    <TouchableOpacity style={styles.headerLeftBtn} onPress={() => {
                        props.navigation.goBack(null), StatusBar.setBarStyle('light-content');
                    }}>
                        <Image style={{width: 25, height: 25}} source={require('../image-res/BACK_WHITE.png')}
                               resizeMethod='resize'/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>ĐĂNG KÝ</Text>
                </View>
            </View>
        ),
        tabBarVisible: true
    };

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+84',
            confirmResult: null,
            active: false,
        };
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user.toJSON()});
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+84',
                    confirmResult: null,
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    sendCode = () => {
        const {phoneNumber} = this.state;
        this.setState({message: 'Sending code ...'});

        var formatPhone = phoneNumber;
        if(phoneNumber.charAt(0) == '0') {
            if(phoneNumber.length == 10)
                formatPhone = `${phoneNumber.substr(1,9)}`
            if(phoneNumber.length == 11)
                formatPhone = `${phoneNumber.substr(1,10)}`
        }

        firebase.auth().signInWithPhoneNumber(formatPhone)
            .then(confirmResult => {
                this.setState({confirmResult: confirmResult, message: 'Code has been sent!'});
            })
            .catch(error => this.setState({message: `Sign In With Phone Number Error: ${error.message}`}));
    };

    async confirmCode(callback) {
        const {codeInput, confirmResult} = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({message: 'Code Confirmed!'});
                    //alert(this.state.phoneNumber);
                    this.props.retrieveUserPhone(this.state.phoneNumber);
                    firebase.database().ref(`OnlineUsers/${this.state.phoneNumber}`).set({
                        status: 'online'
                    })
                    callback();
                    return true;
                })
                .catch(error => {
                    this.setState({message: `Code Confirm Error: ${error.message}`});
                    return false
                });
        }
    };

    getPhone = ({text}) => {
        this.setState({ phoneNumber: text });
    }

    getCode = code => {
        this.setState({ codeInput: code });
    }

    renderPhoneInput() {
        if (this.state.phoneNumber === '') this.state.active = false
        else this.state.active = true
        return (
            <ScrollView style={styles.container}>
                <HeaderCard
                    link={require('../image-res/THANK_YOU.png')}
                >
                    <Text style={styles.textHeaderStyle}>
                        Chúng tôi sẽ gửi một mã code đến điện thoại của bạn để xác nhận cho việc đăng ký
                    </Text>
                </HeaderCard>

                <View style={styles.footer}>
                    <TextInputWithLabel
                        inputStyle={{marginBottom: 20}}
                        inputContainer={{
                            borderColor: '#D5D9DE', borderWidth: 1, borderRadius: 6, shadowColor: '#AAC1C5',
                            shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.36
                        }}
                        inputStyleLabel={{color: '#757575'}}
                        typeName={'Số điện thoại'}
                        placeholder={'Số điện thoại'}
                        keyboardType='phone-pad'
                        setValue={this.getPhone}
                        disabledError={false}
                        autoFocus={true}
                    />
                    <View style={styles.proceedBtnWrap}>

                        <TouchableOpacity style={[styles.proceedBtn, this.state.active == true && styles.proceedBtnOn]}
                                          onPress={() => this.sendCode()}>
                            <Text
                                style={[styles.proceedBtnTitle, this.state.active == true && styles.proceedBtnTitleOn]}>Tiếp
                                theo</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    renderMessage() {
        const {message} = this.state;

        if (!message.length) return null;

        return (
            <Text style={{padding: 5, backgroundColor: '#000', color: '#fff'}}>{message}</Text>
        );
    }

    handleResendCode = () => {}

    renderCodeInput = navigate => {
        return (
            <ScrollView style={styles.container}>
                <HeaderCard
                    link={require('../image-res/EMAIL.png')}
                >
                    <Text style={styles.textHeaderStyle}>
                        {'Vui lòng nhập mã code mà chúng tôi đã gửi đến điện thoại của bạn'}
                    </Text>
                </HeaderCard>

                <View style={styles.footer}>
                    <PasswordInput
                        inputStyle={{ marginBottom: 20 }}
                        inputContainer={{
                            borderColor: '#D5D9DE', borderWidth: 1, borderRadius: 6, shadowColor: '#AAC1C5',
                            shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.36
                        }}
                        inputStyleLabel={{ color: '#757575' }}
                        typeName={'Mã code'}
                        placeholder={'Mã code'}
                        setValue={this.getCode}
                        disabledError={false}
                        autoFocus={true}
                    />
                    <View style={styles.proceedBtnWrap}>

                        <TouchableOpacity
                            style={[styles.proceedBtn, styles.proceedBtnOn]}
                            onPress={() => this.confirmCode(() => navigate('Profile'))}>
                            <Text style={[styles.proceedBtnTitle, styles.proceedBtnTitleOn]}>{'Tiếp theo'}</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    render() {
        const {navigate} = this.props.navigation;
        const {user, confirmResult} = this.state;
        return (
            <View style={{flex: 1}}>
                {!user && !confirmResult && this.renderPhoneInput()}
                {!user && confirmResult && this.renderCodeInput(navigate)}
                {this.renderMessage()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneAuthTest);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#F0F5F6',
    },
    textHeader: {
        marginLeft: 10,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 30
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 15,
        paddingHorizontal: 30,
    },
    header: {
        paddingTop: 14,
        paddingBottom: 10,
        position: 'relative',
        height: 55,
        backgroundColor: '#2D9CDB'
    },
    headerImage: {
        backgroundColor: '#FFFFFF'
    },
    headerTitle: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 5,
        fontWeight: 'bold'
    },
    textHeaderStyle: {
        fontSize: (Dimensions.get('window').height >= 570) ? 16 : 15,
    },
    headerLeftBtn: {
        position: 'absolute',
        left: 20,
        top: 1,
        width: 25,
        height: 25,
        zIndex: 3,
        alignItems: 'center',
    },
    footer: {
        paddingTop: 30,
        paddingBottom: 15,
        paddingHorizontal: 40,
    },
    proceedBtnWrap: {
        backgroundColor: '#F0F5F6',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 7
    },
    proceedBtn: {
        height: 50,
        backgroundColor: '#ccdce9',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    proceedBtnOn: {
        backgroundColor: '#2D9CDB'

    },
    proceedBtnTitle: {
        color: '#9bbbd4'
    },
    proceedBtnTitleOn: {
        color: '#ffffff'
    },
    modal : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
