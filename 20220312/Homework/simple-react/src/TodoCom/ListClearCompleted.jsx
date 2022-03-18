export function ListClearCompleted(props) {
  const { ListItems, ListActivation, ListDisplay, hideListItems } = props;
  return (
    <button
      className="clear-completed"
      type="button"
      onClick={() => {
        const TmpDisplay = ListDisplay;
        for (let Index = 0; Index < ListItems.length; Index++) {
          const TmpItem = document.getElementById(`ListItem${Index}`);
          if (TmpItem == null) {
            continue;
          }
          if (ListActivation[Index] === 0) {
            TmpItem.style.display = 'none';
            TmpDisplay[Index] = 0;
          }
        }
        hideListItems(TmpDisplay);
      }}>
      Clear Completed
    </button>
  );
}
