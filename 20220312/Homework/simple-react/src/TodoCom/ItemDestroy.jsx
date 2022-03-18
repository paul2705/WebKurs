export function ItemDestroy(props) {
  const { Index, ListActivation, ListDisplay, hideListItems, setItemsCount } =
    props;
  return (
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
  );
}
