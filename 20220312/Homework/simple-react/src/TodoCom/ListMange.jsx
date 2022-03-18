import { ListClearCompleted } from './ListClearCompleted';

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
      <ListClearCompleted
        ListItems={ListItems}
        ListActivation={ListActivation}
        ListDisplay={ListDisplay}
        hideListItems={hideListItems}
      />
    </footer>
  );
}
