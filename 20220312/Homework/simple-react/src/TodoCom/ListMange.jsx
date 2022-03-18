import { useState } from 'react';
import { ListClearCompleted } from './ListClearCompleted';

function className(IsSelect, number) {
  if (IsSelect === number) {
    return 'selected';
  } else {
    return 'button';
  }
}

function FiltersButton(props) {
  const { setDisplayMode, Option, Content, IsSelect, setSelect, number } =
    props;
  return (
    <button
      type="button"
      className={className(IsSelect, number)}
      onClick={() => {
        setDisplayMode(Option);
        setSelect(number);
      }}>
      {Content}
    </button>
  );
}
export function ListManage(props) {
  const {
    ListItems,
    ItemsCount,
    ListActivation,
    ListDisplay,
    hideListItems,
    setDisplayMode,
  } = props;
  const [IsSelect, setSelect] = useState(1);
  return (
    <footer className="footer">
      <span className="todo-count"> {ItemsCount} items left</span>
      <ul className="filters">
        <li>
          <FiltersButton
            setDisplayMode={setDisplayMode}
            Option={[0, 1]}
            Content="All"
            IsSelect={IsSelect}
            setSelect={setSelect}
            number={1}
          />
        </li>
        <li>
          <FiltersButton
            setDisplayMode={setDisplayMode}
            Option={[1, 1]}
            Content="Active"
            IsSelect={IsSelect}
            setSelect={setSelect}
            number={2}
          />
        </li>
        <li>
          <FiltersButton
            setDisplayMode={setDisplayMode}
            Option={[0, 0]}
            Content="Completed"
            IsSelect={IsSelect}
            setSelect={setSelect}
            number={3}
          />
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
