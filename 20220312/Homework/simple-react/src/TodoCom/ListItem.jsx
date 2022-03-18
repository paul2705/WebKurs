export function ListItem(props) {
  const {
    Index,
    ListActivation,
    activateListItems,
    ListDisplay,
    hideListItems,
    setItemsCount,
    children,
  } = props;
  return (
    <li key={Index} className="ListItem" id={`ListItem${Index}`}>
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
        <label>{children}</label>
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
    </li>
  );
}
