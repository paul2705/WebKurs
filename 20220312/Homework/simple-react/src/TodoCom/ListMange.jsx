export function ListManage(props) {
  const { ListItems, ItemsCount, ListActivation, ListDisplay, hideListItems } =
    props;
  return (
    <footer className="footer">
      <span className="todo-count"> {ItemsCount} items left</span>
      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>
        <li>
          <a href="#/Active" className="selected">
            Active
          </a>
        </li>
        <li>
          <a href="#/Completed" className="selected">
            Completed
          </a>
        </li>
      </ul>
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
    </footer>
  );
}
