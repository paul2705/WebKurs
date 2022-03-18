import { useEffect, useMemo } from 'react';
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
  } = props;
  useEffect(() => {
    if (newText !== '') {
      setListItems([...ListItems, newText]);
      activateListItems([...ListActivation, 1]);
      hideListItems([...ListDisplay, 1]);
    }
    // setNewText(prev => '');
  }, [newText]);
  useEffect(() => {
    document.getElementById('BoxText').value = '';
  }, [ListItems]);
  let LIST = null;
  LIST = useMemo(
    () => (
      <section>
        <ul className="todo-list">
          {ListItems.map((Item, Index) => {
            if (ListDisplay[Index] === 1) {
              return (
                <ListItem
                  key={Index}
                  Index={Index}
                  ListActivation={ListActivation}
                  activateListItems={activateListItems}
                  ListDisplay={ListDisplay}
                  hideListItems={hideListItems}>
                  {Item}
                </ListItem>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </section>
    ),
    [ListItems, ListActivation, ListDisplay],
  );
  return LIST == null ? (
    <section>
      <ul className="todo-list"></ul>
    </section>
  ) : (
    LIST
  );
}
