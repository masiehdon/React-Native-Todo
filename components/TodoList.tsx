import React, { SetStateAction, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; 
import { FlatList, View, Text, StyleSheet } from 'react-native';
import CheckboxComponent from './CheckboxComponent';
import DeleteIcon from './DeleteIcon';
import { Task, TodoListProps } from '../types/TypeDeclarations';

const TodoList: React.FC<TodoListProps> = ({ task, done, setDone }) => {
  const [todos, setTodos] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('*');

        if (error) {
          throw error;
        }

        setTodos(data || []);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [task, done]); 

  const handleDeleteItem = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
  
      if (error) {
        throw error;
      }
  
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  
      console.log(`Deleted todo with id: ${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleFinishTask = async (id: string, done: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ done })
        .eq('id', id);
      
      console.log('Task  handleFinishTask updated with: ', done)
      if (error) 
      throw error;
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.wrapper}>
      <CheckboxComponent
        task={[item]} 
        id={item.id}
        done={done}
        setDone={setDone}
        handleFinishTask={() => handleFinishTask(item.id, item.done)} 
       />
      <Text>{item.task}</Text>
      <DeleteIcon 
        handleDeleteItem={() => handleDeleteItem(item.id)}
        id={item.id}
      />
    </View>
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item.id} 
    />
    );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
    marginLeft: 2,
  }
});

export default TodoList;



