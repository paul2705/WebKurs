import { useState } from 'react';

function classNames(props) {
  const { editing, completed } = props;
  if (editing) {
    return 'editing';
  } else if (completed) {
    return 'completed';
  } else {
    return 'view';
  }
}

export function ListItem(props) {
  const {
    Index,
    ListItems,
    setListItems,
    ListActivation,
    activateListItems,
    ListDisplay,
    hideListItems,
    setItemsCount,
  } = props;
  const [IsEditing, setEditing] = useState(false);

  return (
    <li
      key={Index}
      className={classNames({
        editing: IsEditing,
        completed: ListActivation[Index] === 1 ? 0 : 1,
      })}
      id={`ListItem${Index}`}>
      <div className="view">
        <input
          type="checkbox"
          id={`button${Index}`}
          className="toggle"
          onClick={() => {
            const Tmp = ListActivation;
            Tmp[Index] = Tmp[Index] === 0 ? 1 : 0;
            activateListItems(Tmp);
            const TmpThis = document.getElementById(`button${Index}`);
            if (Tmp[Index] === 0) {
              TmpThis.checked = true;
              setItemsCount(prev => prev - 1);
            } else {
              TmpThis.checked = false;
              setItemsCount(prev => prev + 1);
            }
          }}></input>
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}>
          {ListItems[Index]}
        </label>
        <button
          className="destroy"
          type="button"
          onClick={() => {
            const Tmp = ListDisplay;
            Tmp[Index] = 0;
            hideListItems(Tmp);
            const TmpThis = document.getElementById(`ListItem${Index}`);
            TmpThis.style.display = 'none';
            setItemsCount(prev => prev - ListActivation[Index]);
          }}></button>
      </div>
      <input
        className="edit"
        id={`edit${Index}`}
        onBlur={() => {
          const Tmp = ListItems;
          Tmp[Index] = String(document.getElementById(`edit${Index}`).value);
          if (Tmp[Index] === '') {
            return;
          }
          setListItems(Tmp);
          setEditing(false);
        }}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            const Tmp = ListItems;
            Tmp[Index] = String(document.getElementById(`edit${Index}`).value);
            if (Tmp[Index] === '') {
              return;
            }
            setListItems(Tmp);
            setEditing(false);
          }
        }}></input>
    </li>
  );
}
