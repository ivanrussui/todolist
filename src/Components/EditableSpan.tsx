import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [ newValue, setNewValue ] = useState(props.value)
  const [ editMode, setEditMode ] = useState(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.currentTarget.value)
  }

  const renameTask = () => {
    props.onChange(newValue.trim())

  }

  const editHandler = () => {
    setEditMode(!editMode)
    if (editMode) renameTask()
  }

  return (
    editMode
      ? <TextField onChange={onChangeHandler}
                   value={newValue}
                   onBlur={editHandler}
                   variant="outlined"
                   autoFocus />
      : <span onDoubleClick={editHandler}>{props.value}</span>
  );
};

