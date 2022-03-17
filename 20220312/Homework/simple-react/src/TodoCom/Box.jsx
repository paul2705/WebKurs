import { useState } from 'react';
import { BoxButton } from './BoxButton';
import { List } from './List';

export function Box() {
  const [newText, setNewText] = useState('');
  const [ListItems, setListItems] = useState([]);
  const [ListActivation, activateListItems] = useState([]);
  return (
    <div>
      <div>
        <BoxButton
          onClick={() => {
            const Tmp = ListActivation;
            for (let Index = 0; Index < ListActivation.length; Index++) {
              Tmp[Index] = 0;
              const TmpThis = document.getElementById(`button${Index}`);
              TmpThis.style.backgroundColor = 'green';
            }
            activateListItems(Tmp);
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
        ListActivation={ListActivation}
        activateListItems={activateListItems}
      />
    </div>
  );
}
