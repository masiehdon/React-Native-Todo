import React, {useEffect, useState} from 'react';
import { StyleSheet, View} from 'react-native';
import {CheckboxComponentProps} from '../types/TypeDeclarations'
import { CheckBox } from 'react-native-elements';

export default function CheckboxComponent ({ done, setDone }: CheckboxComponentProps) {
  const [isSelected, setSelection] = useState(false);

const handlePressCheck = async (): Promise<void> => {
  setSelection((prev) => !prev);
  setDone((prev) => !prev);
}

return (
  <CheckBox
          checked={isSelected}
          onPress={handlePressCheck}
          checkedColor="green"
          uncheckedColor="red"
        />
)
}
     