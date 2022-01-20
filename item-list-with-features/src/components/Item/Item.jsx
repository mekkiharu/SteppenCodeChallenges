import { useState, useRef, useEffect } from 'react';
import './Item.css';

export const Item = ({ data, index, onSaveEdit, onRemoveItem }) => {
  const [showHover, setIsHover] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');

  const editInputRef = useRef(null);

  const _toggleHover = () => setIsHover(!showHover);
  const _toggleEditmode = () => setEditMode(!isEditMode);

  const _handleEdit = () => {
    _toggleEditmode();
    setEditText(data);
  };

  const _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      _handleSave();
    }

    e.stopPropagation();
  };

  const _handleOnChange = (e) => setEditText(e.target.value);

  const _handleSave = () => {
    onSaveEdit(editText, index);
    _toggleEditmode();
  };

  const _renderControls = () => {
    return (
      <>
        <button className='button is-primary ml-auto' onClick={_handleEdit}>
          Edit
        </button>
        <button
          className='button ml-1 is-danger is-outlined'
          onClick={() => onRemoveItem(index)}>
          Remove Item
        </button>
      </>
    );
  };

  useEffect(() => {
    if (isEditMode) {
      editInputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div
      className={'item p-3'}
      key={index}
      onMouseEnter={_toggleHover}
      onMouseLeave={_toggleHover}>
      {isEditMode ? (
        <>
          <input
            ref={editInputRef}
            id={`item-${index}`}
            type='text'
            className='input is-primary'
            value={editText}
            onChange={_handleOnChange}
            onKeyPress={_handleKeyPress}
          />

          <button className='button is-primary ml-1' onClick={_handleSave}>
            Save
          </button>
          <button className='button ml-1' onClick={_toggleEditmode}>
            Cancel
          </button>
        </>
      ) : (
        <p>{data}</p>
      )}

      {showHover && !isEditMode && _renderControls()}
    </div>
  );
};
