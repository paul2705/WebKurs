import { useEffect } from 'react';
import { ListItem } from './ListItem';

export function List(props) {
  const {
    newText,
    ListItems,
    setListItems,
    ListActivation,
    activateListItems,
  } = props;
  useEffect(() => {
    if (newText !== '') {
      setListItems([...ListItems, newText]);
      activateListItems([...ListActivation, 1]);
    }
    // setNewText(prev => '');
  }, [newText]);
  useEffect(() => {
    document.getElementById('BoxText').value = '';
  }, [ListItems]);
  return (
    <div>
      <ul>
        {ListItems.map((Item, Index) => (
          <ListItem
            key={Index}
            Index={Index}
            ListActivation={ListActivation}
            activateListItems={activateListItems}>
            {Index + 1}. {Item}{' '}
          </ListItem>
        ))}
      </ul>
    </div>
  );
}
