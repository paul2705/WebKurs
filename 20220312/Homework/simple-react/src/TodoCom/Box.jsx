import { useState } from 'react';
import { HeadButton } from './HeadButton';
import { HeadInput } from './HeadInput';
import { List } from './List';
import { ListManage } from './ListMange';

export function Box() {
  const [newText, setNewText] = useState('');
  const [ListItems, setListItems] = useState([]);
  const [ListActivation, activateListItems] = useState([]);
  const [ListDisplay, hideListItems] = useState([]);
  const [ItemsCount, setItemsCount] = useState(0);
  const [ListDisplayMode, setDisplayMode] = useState([0, 1]);
  return (
    <div className="todoapp">
      <h1>TODOS</h1>
      <header className="header">
        <HeadInput setNewText={setNewText} />
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
        ListDisplayMode={ListDisplayMode}
      />
      <ListManage
        ListItems={ListItems}
        ItemsCount={ItemsCount}
        ListActivation={ListActivation}
        ListDisplay={ListDisplay}
        hideListItems={hideListItems}
        setDisplayMode={setDisplayMode}
      />
    </div>
  );
}
