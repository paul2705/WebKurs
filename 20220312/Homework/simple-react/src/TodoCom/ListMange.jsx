export function ListManage(props) {
  const { ListItems } = props;
  let Count = 0;
  const TmpItems = document.getElementsByClassName('ListItem');
  const TmpCheck = document.getElementsByClassName('toggle');
  console.log(TmpItems.length);
  console.log(TmpCheck);
  for (let Index = 0; Index <= TmpItems.length; Index++) {
    if (TmpItems[Index] == null) {
      if (Index === TmpItems.length && ListItems.length > 0) {
        Count += 1;
      }
      continue;
    }
    console.log('Item:', TmpCheck[Index]);
    const Hidden =
      TmpItems[Index].getAttribute('style') === 'display: none;' ? 0 : 1;
    const Completed = TmpCheck[Index].checked === 1 ? 0 : 1;
    console.log(Hidden, Completed);
    Count += Hidden + Completed <= 1 ? 0 : 1;
  }

  return (
    <footer className="footer">
      <span className="todo-count"> {Count} items left</span>
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
    </footer>
  );
}
