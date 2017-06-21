import React, { PropTypes } from 'react';
import {
    Animated,
    TextInput,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const LABEL_HEIGHT = 18;
const PADDING = 16;

export default class Sae extends BaseInput {

    static propTypes = {
        height: PropTypes.number,

        iconColor: PropTypes.string,
    };

    static defaultProps = {
        iconColor: 'lightgray',
        height: 48,
        animationDuration: 300
    };

    render() {
        const {
            iconColor,
            label,
            style: containerStyle,
            height: inputHeight,
            inputStyle,
            labelStyle,
        } = this.props;
        const {
            width,
            focusedAnim,
            value,
        } = this.state;

        return (
            <View
                style={[styles.container, containerStyle, {
                    height: inputHeight + PADDING,
                }]}
                onLayout={this._onLayout}
            >
                <TouchableWithoutFeedback onPress={this.focus}>
                    <Animated.View style={{
                        position: 'absolute',
                        bottom: focusedAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, LABEL_HEIGHT + PADDING],
                        }),
                    }}>
                        <Animated.Text style={[styles.label, labelStyle, {
                            fontSize: focusedAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [18, 12],
                            }),
                        }]}>
                            {label}
                        </Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TextInput
                    ref="input"
                    {...this.props}
                    style={[styles.textInput, inputStyle, {
                        width,
                        height: inputHeight,
                    }]}
                    value={value}
                    onBlur={this._onBlur}
                    onChange={this._onChange}
                    onFocus={this._onFocus}
                    underlineColorAndroid={'transparent'}
                />
                {/* bottom border */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: width/10,
                        height: 1,
                        width: focusedAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, width],
                        }),
                        backgroundColor: iconColor,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        left: 14
    },
    label: {
        backgroundColor: 'transparent',
        fontFamily: 'Avenir',
        fontWeight: '400',
        color: 'gray',
    },
    textInput: {
        position: 'absolute',
        fontWeight: '600',
        bottom: 0,
        left: 0,
        paddingTop: PADDING / 2,
        paddingLeft: 0,
        color: 'black',
        fontSize: 18,
    },
});
