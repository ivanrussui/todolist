import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [ title, setTitle ] = useState('');
  const [ error, setError ] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim())
      // props.addTask(title.trim(), props.todolistId)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }


  return (
      <div>
        <input onChange={onChangeHandler}
               value={title}
               onKeyDown={onKeyDownHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addItemHandler}>+</button>
        {error && <div className={'errorMessage'}>{error}</div>}
      </div>
  );
};
