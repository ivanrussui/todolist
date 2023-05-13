import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from '@mui/material/Button/Button';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [ title, setTitle ] = useState('');
  const [ error, setError ] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim())
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
        <Button variant="contained" color={'primary'}
                style={{maxHeight: '30px', minWidth: '30px', marginLeft: '3px'}}
                size="small" onClick={addItemHandler}>+</Button>
        {error && <div className={'errorMessage'}>{error}</div>}
      </div>
  );
};
