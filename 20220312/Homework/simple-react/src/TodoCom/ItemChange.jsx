export function ItemChange(props) {
  const { Index, ListItems, setListItems, setEditing } = props;
  return (
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
  );
}
