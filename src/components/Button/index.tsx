import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  showArrow?: boolean;
  style?: object;
  textStyle?: object;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  showArrow = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      {showArrow && (
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>→</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#141428',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  arrowContainer: {
    marginLeft: 10,
  },
  arrow: {
    color: 'white',
    fontSize: 18,
  },
});

export default Button;
