import { useState } from 'react';
import * as S from './TodoStyle';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            handleAddTodo(); 
        }
    };    

    const handleAddTodo = () => {
        if (inputValue.length > 0) { 
            setTodos(todos => [...todos, inputValue]);
            setInputValue('');
        }
    }

    const onDelete = (todo) => {
        setTodos(prevTodos => prevTodos.filter(t => t !== todo));
    }

    const handleComplete = (todo) => {
        setCompletedTodos([...completedTodos, todo]);
        onDelete(todo);
    }

    const onDeleteComplete = (todo) => {
        setCompletedTodos(prevCompleted => prevCompleted.filter(t => t !== todo));
    }

    return (
        <>
            <S.StyledDiv>
                <S.Title>UMC STUDY PLAN</S.Title>
                <S.Line />
                <S.StyledInput 
                    type="text" 
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown} 
                    value={inputValue} 
                    placeholder='스터디 계획을 작성해 보세요!' 
                />
                <S.SeparDiv>
                    <div className="section">
                        <h5>해야 할 일</h5>
                        {todos.map((todo) => (
                            <S.ListDiv key={todo}>
                                {todo} 
                                <button className='complete' onClick={() => handleComplete(todo)}>완료</button>
                            </S.ListDiv>
                        ))}
                    </div>

                    {/* 해낸 일 섹션 */}
                    <div className="section">
                        <h5>해낸 일</h5>
                        {completedTodos.map((complete) => (
                            <S.ListDiv key={complete}>
                                {complete} 
                                <button className='delete' onClick={() => onDeleteComplete(complete)}>삭제</button>
                            </S.ListDiv>
                        ))}
                    </div>
                </S.SeparDiv>
            </S.StyledDiv>
        </>
    );
}

export default Todo;
