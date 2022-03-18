export function ItemCheckbox(props) {
  const { Index, ListActivation, activateListItems, setItemsCount } = props;
  return (
    <input
      type="checkbox"
      id={`button${Index}`}
      className="toggle"
      checked={ListActivation[Index] === 0 ? 1 : 0}
      onChange={() => {
        const TmpThis = document.getElementById(`button${Index}`);
        if (ListActivation[Index] === 0) {
          TmpThis.checked = true;
          setItemsCount(prev => prev - 1);
        } else {
          TmpThis.checked = false;
          setItemsCount(prev => prev + 1);
        }
      }}
      onClick={() => {
        const Tmp = ListActivation;
        Tmp[Index] = Tmp[Index] === 0 ? 1 : 0;
        activateListItems(Tmp);
      }}></input>
  );
}
