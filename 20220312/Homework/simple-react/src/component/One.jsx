export function One(props) {
  return <div onClick={() => props.addTwo()}>[ONE]two: {props.two}</div>;
}
