import { Dispatch, SetStateAction } from "react";
import { GestureResponderEvent } from "react-native";


export interface Task {
    id: string; 
    task: string;
    data: string;
    done: boolean;
    is_complete: boolean;
     }
  
  export type TaskProps = {
    task: Task[];
    error: string;
  }


  export interface InputProps {
    handleAddTask: ((event: GestureResponderEvent) => void) | undefined;
   textInput: string;
    setTextInput: (text: string) => void;
    }
  


export interface CheckboxComponentProps {
  task: Task[];
  id: string;
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
  handleFinishTask: (id: string, done: boolean) => void;
}



export interface TodoListProps {
  task: Task[];
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
 }
 

  export interface DeleteIconProps {
    handleDeleteItem: (id: string) => void;
    id: string;
    };
