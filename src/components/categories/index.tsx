import './styles.scss';
import { FC } from 'react';
import { Category } from '../../types';

type Props = {
  data: Category[];
  loading: boolean;
};

export const Categories: FC<Props> = props => {
  const { data, loading } = props;
  return (
    <div className="CategoriesContainer">
      {loading ? (
        <div className="LoadingContainer">
          <img
            height={'50%'}
            src={'https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif'}
          />
        </div>
      ) : (
        data.map(item => {
          const { image, bgColor, name, id } = item;
          return (
            <div className="Category" key={id}>
              <div className="CategoryImageWrapper" style={{ background: bgColor }}>
                <img src={image} height={144} width={144} />
              </div>
              <div className="CategoryLabelWrapper">
                <span>{name}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
