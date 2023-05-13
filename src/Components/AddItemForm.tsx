import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import AddBox from '@mui/icons-material/AddBox';

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

  const muiStyles = {
    width: '35px',
    height: '35px',
  }

  return (
      <div>
        <TextField onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   value={title}
                   variant="outlined"
                   error={!!error}
                   label={'Enter text'}
                   helperText={error}
        />
        <IconButton aria-label="fingerprint" color="primary" onClick={addItemHandler}>
          <Fingerprint style={muiStyles} />
        </IconButton>
        {/*<IconButton color={'primary'} onClick={addItemHandler}>*/}
        {/*  <AddBox/>*/}
        {/*</IconButton>*/}
      </div>
  );
};
