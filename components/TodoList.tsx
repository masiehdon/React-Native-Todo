import { useState, useEffect } from 'react';
import { Task, TodoListProps } from '../types/TypeDeclarations';
import { supabase } from '../lib/supabase';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import CheckboxComponent from './CheckboxComponent'
import DeleteIcon from './DeleteIcon';

export default function TodoList({task, done, setDone}: TodoListProps) {
    const [displayTodo, setDisplayTodo] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data, error } = await supabase
                .from('todos')
                .select('*')
                
                if(error) {
                     throw error;
                }
                setDisplayTodo(data || [])
            } catch (error) {
                console.error('Error fetching todos:', error);
                 }
           
        };
        fetchTodos()
    },[task, done])


  const handleDeleteItem= async (id: string) => {
    try {
      const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

      if(error) {
        throw error
      }
    } catch (error) {
      console.error('Error deleting item: ', error)
    }
  }

    const renderItem = ({ item }: { item: Task }) => (
        <View style={styles.item}>

            <CheckboxComponent
                task={task}
                done={done} 
                setDone={setDone}
            />

    <DeleteIcon
    handleDeleteItem={handleDeleteItem}
    />

            <Text>{item.task}</Text>
            
        </View>
    );


  return (
    <View>
    <FlatList
    data={displayTodo}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    />
    
    </View>
  )
} 

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
