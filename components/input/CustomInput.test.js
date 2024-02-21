import { render, fireEvent } from '@testing-library/react-native';
import CustomInput from './CustomInput';

describe('CustomInput', () => {
  it('renders without crashing', () => {
    const setTextInput = jest.fn();
    const handleAddTask = jest.fn();
    const textInput = 'Test Task';

    render(<CustomInput textInput={textInput} setTextInput={setTextInput} handleAddTask={handleAddTask} />);
  });

  it('calls setTextInput when text is entered', () => {
    const setTextInput = jest.fn();
    const handleAddTask = jest.fn();
    const textInput = '';

    const { getByPlaceholderText } = render(<CustomInput textInput={textInput} setTextInput={setTextInput} handleAddTask={handleAddTask} />);
    const input = getByPlaceholderText('Add a task');

    fireEvent.changeText(input, 'Test Task');

    expect(setTextInput).toHaveBeenCalledWith('Test Task');
  });

  it('calls handleAddTask when button is pressed', () => {
    const setTextInput = jest.fn();
    const handleAddTask = jest.fn();
    const textInput = 'Test Task';

    const { getByText } = render(<CustomInput textInput={textInput} setTextInput={setTextInput} handleAddTask={handleAddTask} />);
    const button = getByText('Add Task');

    fireEvent.press(button);

    expect(handleAddTask).toHaveBeenCalled();
  });
});

