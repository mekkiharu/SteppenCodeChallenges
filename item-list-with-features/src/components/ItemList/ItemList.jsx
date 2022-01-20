import { useState } from 'react';
import './ItemList.css';

import { Item } from '../Item/Item.jsx';

export const ItemList = ({ data }) => {
  const [itemList, setItemList] = useState([]);
  const [textState, setTextState] = useState('');

  const _addItem = () => {
    if (!textState) return;

    setItemList([...itemList, textState]);

    setTextState('');
  };

  const _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      _addItem();
    }

    e.stopPropagation();
  };

  const _handleOnChange = (e) => setTextState(e.target.value);

  const _handleSaveEdit = (newText, itemIndex) => {
    const newList = [...itemList];

    newList[itemIndex] = newText;

    setItemList(newList);
  };

  const _handleRemoveItem = (itemIndex) => {
    const newList = itemList.filter((item, index) => index !== itemIndex);

    setItemList(newList);
  };

  const _removeAllItems = () => setItemList([]);

  return (
    <div className='container'>
      <div className='panel is-info'>
        <p className='panel-heading'>Item List</p>
        <div className='panel-block is-block'>
          <ul className='menu-list'>
            {itemList.map((item, index) => (
              <Item
                data={item}
                key={index}
                index={index}
                onSaveEdit={_handleSaveEdit}
                onRemoveItem={_handleRemoveItem}
              />
            ))}
          </ul>
        </div>
        <div className='panel-block'>
          <input
            type='text'
            className='input is-primary'
            placeholder='Add item...'
            value={textState}
            onChange={_handleOnChange}
            onKeyPress={_handleKeyPress}
          />

          <button className='button is-primary ml-4' onClick={_addItem}>
            Add Item
          </button>
          <button
            className='button is-danger is-outlined ml-4'
            onClick={_removeAllItems}>
            Remove all items
          </button>
        </div>
      </div>
    </div>
  );
};
