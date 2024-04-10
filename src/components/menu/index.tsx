import './styles.scss';
import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  data: string[];
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
};

export const Menu: FC<Props> = props => {
  const { data, active, setActive } = props;

  return (
    <div className="MenuContainer">
      {data.map(item => {
        const isActive = active === item;
        return (
          <div
            key={item}
            className={`MenuRow ${isActive && 'ActiveRow'}`}
            onClick={() => setActive(item)}>
            <span className={`RowLabel ${isActive && 'ActiveRowLabel'}`}>{item}</span>
          </div>
        );
      })}
    </div>
  );
};
