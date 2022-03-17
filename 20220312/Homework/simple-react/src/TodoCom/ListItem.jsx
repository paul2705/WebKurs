export function ListItem(props) {
  const { Index, ListActivation, activateListItems, children } = props;
  return (
    <li key={Index}>
      <button
        type="button"
        id={`button${Index}`}
        className="ListButton"
        onClick={() => {
          const Tmp = ListActivation;
          Tmp[Index] = Tmp[Index] === 0 ? 1 : 0;
          activateListItems(Tmp);
          const TmpThis = document.getElementById(`button${Index}`);
          if (Tmp[Index] === 0) {
            TmpThis.style.backgroundColor = 'green';
          } else {
            TmpThis.style.backgroundColor = '';
          }
        }}></button>
      {children}
    </li>
  );
}
