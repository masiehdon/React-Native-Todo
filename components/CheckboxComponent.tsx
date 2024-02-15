import React, {useEffect, useState} from 'react';
import { StyleSheet, View} from 'react-native';
import {CheckboxComponentProps} from '../types/TypeDeclarations'
import { CheckBox } from 'react-native-elements';

const CheckboxComponent = ({ id, done, setDone, handleFinishTask }: CheckboxComponentProps) => {
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    setSelection(done);
  }, [done]);

  const handlePress = async (): Promise<void> => {
    setSelection(prevState => !prevState); 
    setDone(!isSelected); 
    handleFinishTask(id, !isSelected); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isSelected}
          onPress={handlePress}
          checkedColor="green"
          uncheckedColor="red"
        />
     
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: .2,
   
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    margin: 0,
    alignItems: 'center',

  },
  checkbox: {
    alignSelf: 'center',
    alignItems: 'center',

  },
});

export default CheckboxComponent;