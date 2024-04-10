import React, { useEffect, useState } from 'react';
import './App.scss';
import { Menu, Categories } from './components';
import { Category } from './types';
import axios from 'axios';

const getCategories = async () => {
  try {
    const { data } = await axios.get('https://logiclike.com/docs/courses.json');
    return data;
  } catch (error) {
    console.error('error', error);
  }
};

export const App = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const menuLabels: string[] = [
    'Все темы',
    ...Object.keys(
      data.reduce(
        (acc, item) => {
          item.tags.forEach(tag => (acc[tag] = tag));
          return acc;
        },
        {} as Record<string, string>
      )
    )
  ];

  const [active, setActive] = useState(menuLabels[0]);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(data => {
        if (data) {
          setData(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (active === menuLabels[0]) {
      setItems(data);
    } else {
      setItems(data.filter(item => item.tags.includes(active)));
    }
  }, [active, data]);

  return (
    <div className="App">
      <Menu data={menuLabels} active={active} setActive={setActive} />
      <Categories data={items} loading={loading} />
    </div>
  );
};
