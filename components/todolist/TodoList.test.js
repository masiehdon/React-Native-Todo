import { render } from '@testing-library/react-native';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('renders without crashing', () => {
    const task = 'Test Task';
    const done = false;
    const setDone = jest.fn();

    render(<TodoList task={task} done={done} setDone={setDone} />);
  });
});


jest.mock('../../lib/supabase', () => ({
    supabase: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      delete: jest.fn().mockResolvedValue({ data: [], error: null }),
    },
  }));
  