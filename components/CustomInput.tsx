import { TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { InputProps } from '../types/TypeDeclarations';


const Input = (props: InputProps) => {
  const { textInput, setTextInput } = props;

  const handleTextChange = (text: string) => {
    setTextInput(text)
    console.log('text: ', text)
};

return (
    <SafeAreaView>
      <TextInput
      style={styles.input}
        placeholder="Add a task"
        onChangeText={handleTextChange} 
        value={textInput}
      />
      <Button 
      title="Add Task" 
      onPress={props.handleAddTask} 
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    marginTop: 30
  }
})

export default Input;
function setTask(arg0: never[]) {
  throw new Error('Function not implemented.');
}

