import { useEffect } from 'react';

export function List(props) {
  const { newText, ListItems, setListItems } = props;
  useEffect(() => {
    if (newText !== '') {
      setListItems([...ListItems, newText]);
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
          <li key={Index}>
            {Index}. {Item}{' '}
          </li>
        ))}
      </ul>
    </div>
  );
}
