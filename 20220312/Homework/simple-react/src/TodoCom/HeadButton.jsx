export function HeadButton(props) {
  const { ListActivation, activateListItems, ListDisplay, setItemsCount } =
    props;
  return (
    <span>
      <input
        className="toggle-all"
        id="toggle-all"
        type="checkbox"
        onClick={() => {
          const Tmp = ListActivation;
          let Cnt = 0;
          for (let Index = 0; Index < ListActivation.length; Index++) {
            Cnt += Tmp[Index] + ListDisplay[Index] <= 1 ? 0 : 1;
          }
          if (Cnt > 0) {
            for (let Index = 0; Index < ListActivation.length; Index++) {
              Tmp[Index] = 0;
              const TmpThis = document.getElementById(`button${Index}`);
              if (TmpThis != null) {
                TmpThis.checked = true;
              }
            }
            setItemsCount(0);
          } else {
            for (let Index = 0; Index < ListActivation.length; Index++) {
              Tmp[Index] = 1;
              const TmpThis = document.getElementById(`button${Index}`);
              if (TmpThis != null) {
                TmpThis.checked = false;
              }
              Cnt += Tmp[Index] + ListDisplay[Index] <= 1 ? 0 : 1;
            }
            setItemsCount(Cnt);
          }
          activateListItems(Tmp);
        }}
      />
      <label htmlFor="toggle-all">::before</label>
    </span>
  );
}
