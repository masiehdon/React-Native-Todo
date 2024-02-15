import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { supabase } from './lib/supabase';
import CustomInput from './components/CustomInput';
import Auth from './components/auth/Auth';
import { Session } from '@supabase/supabase-js';
import { Task } from './types/TypeDeclarations'
import TodoList from './components/TodoList';


export default function App() {
  const [textInput, setTextInput] = useState<string>('')
  const [task, setTask] = useState<Task[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [done, setDone] = useState<boolean>(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


   const handleAddTask = async () => {
    try {
      if (textInput.trim() !== '') {
        const { data, error } = await supabase
          .from('todos')
          .insert([{ task: textInput, done: false, user_id: session?.user.id}]);
        
        if (error) {
          throw error;
        }
        setTask(prevTasks => [
          ...prevTasks,
          {
            id: '',
            task: textInput,
            done: false,
            data: '',
            is_complete: false, 
          },
        ]);
      }
      console.log('task:', task);
      setTextInput('')
      
    } catch (error) {
      console.log('Error: ', error);
    }
  };


  useEffect(() => {
    const fetchUpdatedTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('*');
        if (error) {
          throw error;
        }
         setTask(data || []);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchUpdatedTasks();
  }, [task, done]); 

  function handleTaskClick(id: string): void {
    throw new Error('Function handleTaskClick not implemented.');
  }



  return (
    
    <SafeAreaView style={styles.container}>
      {session ? 
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Task List</Text>
          <CustomInput
            textInput={textInput}
            setTextInput={setTextInput} 
            handleAddTask={handleAddTask}          
            />
          <TodoList 
            task={task}
            done={done}
            setDone={setDone}
            onTaskClick={handleTaskClick}
          />  
            <Button 
            title="Sign Out" 
            onPress={() => supabase.auth.signOut()} 
          />
        </View>
      : 
        <Auth />
      }
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginHorizontal: 25,
    marginVertical: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%'
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
