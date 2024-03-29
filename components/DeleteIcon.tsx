import { AntDesign } from '@expo/vector-icons';
import { DeleteIconProps } from '../types/TypeDeclarations';
import { TouchableOpacity, View } from 'react-native';

export default function DeleteIcon({ handleDeleteItem, id }: DeleteIconProps) {
  return (
    <TouchableOpacity onPress={() => handleDeleteItem(id)}>
      <View>
        <AntDesign name="delete" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}
