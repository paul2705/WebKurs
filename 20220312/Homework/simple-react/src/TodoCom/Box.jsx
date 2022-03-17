import { useState } from 'react';
import { BoxButton } from './BoxButton';
import { List } from './List';

export function Box() {
  const [newText, setNewText] = useState('');
  const [ListItems, setListItems] = useState([]);
  return (
    <div>
      <div>
        <BoxButton
          onClick={() => {
            // setInputText(prev => `${prev}+`);
            console.log(document.getElementById('BoxText').value);
          }}
        />
        <input
          type="text"
          id="BoxText"
          onBlur={() => {
            setNewText(document.getElementById('BoxText').value);
          }}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              setNewText(document.getElementById('BoxText').value);
            }
          }}></input>
      </div>
      <List
        newText={newText}
        ListItems={ListItems}
        setListItems={setListItems}
      />
    </div>
  );
}
