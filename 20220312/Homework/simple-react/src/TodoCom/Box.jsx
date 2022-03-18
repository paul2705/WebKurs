import { useState } from 'react';
import { HeadButton } from './HeadButton';
import { List } from './List';
import { ListManage } from './ListMange';

export function Box() {
  const [newText, setNewText] = useState('');
  const [ListItems, setListItems] = useState([]);
  const [ListActivation, activateListItems] = useState([]);
  const [ListDisplay, hideListItems] = useState([]);
  const [ItemsCount, setItemsCount] = useState(0);
  return (
    <div className="todoapp">
      <h1>TODO</h1>
      <header className="header">
        <input
          type="text"
          id="BoxText"
          className="new-todo"
          placeholder="What needs to be done?"
          onBlur={() => {
            setNewText(document.getElementById('BoxText').value);
            const TmpButton = document.getElementById('toggle-all');
            TmpButton.checked = false;
          }}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              setNewText(document.getElementById('BoxText').value);
              const TmpButton = document.getElementById('toggle-all');
              TmpButton.checked = false;
            }
          }}></input>
      </header>
      <HeadButton
        ListActivation={ListActivation}
        activateListItems={activateListItems}
        ListDisplay={ListDisplay}
        setItemsCount={setItemsCount}
      />
      <List
        newText={newText}
        ListItems={ListItems}
        setListItems={setListItems}
        ListActivation={ListActivation}
        activateListItems={activateListItems}
        ListDisplay={ListDisplay}
        hideListItems={hideListItems}
        setItemsCount={setItemsCount}
      />
      <ListManage ItemsCount={ItemsCount} />
    </div>
  );
}
