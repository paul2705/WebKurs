import { useState } from 'react';
import { MyContext } from '../context/comm';

export function Grandpa() {
  const [someMoneyForMe] = useState(100);
  const [someMoneyForDaddy] = useState(1);
  return <Daddy money={someMoneyForDaddy} moneyForMe={someMoneyForMe} />;
}

function Daddy(props) {
  const { money, moneyForSon } = props;
  return (
    <div className="Daddy">
      <h2> This is Daddy, received ${money}</h2>
      <Me money={moneyForSon} />
    </div>
  );
}

function Me(props) {
  const { money } = props;
  return (
    <div className="Me">
      <h3> This is Me, received ${money}</h3>
    </div>
  );
}
