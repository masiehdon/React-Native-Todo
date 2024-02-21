import { useState, useEffect } from 'react';
import { Task, TodoListProps } from '../../types/TypeDeclarations';
import { supabase } from '../../lib/supabase';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import CheckboxComponent from '../checkbox/CheckboxComponent';
import DeleteIcon from '../DeleteIcon';

export default function TodoList({ task, done, setDone }: TodoListProps) {
  const [displayTodo, setDisplayTodo] = useState<Task[]>([]);

  useEffect(() => {
    
    fetchTodos();
    console.log('fetched todos. done is: ', done);
  }, [task, done]);

  const fetchTodos = async () => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('*');
          
        if (error) {
          throw error;
        }
        setDisplayTodo(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };


  const handleDeleteItem = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
  
      console.log('id DELETE: ', id);
  
      if (error) {
        throw error;
      }

      fetchTodos();

    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.item}>
      <CheckboxComponent  
        done={item.done} 
        setDone={setDone} 
        id={item.id}
      />
      <Text style={styles.taskText}>{item.task}</Text>
      <Text>dummy text</Text>
      <DeleteIcon 
      testId='test'
        handleDeleteItem={handleDeleteItem} 
        id={item.id} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayTodo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: 'black'
  },
})