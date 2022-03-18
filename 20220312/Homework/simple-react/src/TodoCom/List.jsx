import { useEffect } from 'react';
import { ListItem } from './ListItem';

export function List(props) {
  const {
    newText,
    ListItems,
    setListItems,
    ListActivation,
    activateListItems,
    ListDisplay,
    hideListItems,
    setItemsCount,
  } = props;
  useEffect(() => {
    if (newText !== '') {
      setListItems([...ListItems, newText]);
      activateListItems([...ListActivation, 1]);
      hideListItems([...ListDisplay, 1]);
      setItemsCount(prev => prev + 1);
    }
    // setNewText(prev => '');
  }, [newText]);
  useEffect(() => {
    document.getElementById('BoxText').value = '';
  }, [ListItems]);
  return (
    <section>
      <ul className="todo-list">
        {ListItems.map((Item, Index) => {
          if (ListDisplay[Index] === 1) {
            return (
              <ListItem
                key={Index}
                Index={Index}
                ListItems={ListItems}
                setListItems={setListItems}
                ListActivation={ListActivation}
                activateListItems={activateListItems}
                ListDisplay={ListDisplay}
                hideListItems={hideListItems}
                setItemsCount={setItemsCount}
              />
            );
          } else {
            return null;
          }
        })}
      </ul>
    </section>
  );
}
