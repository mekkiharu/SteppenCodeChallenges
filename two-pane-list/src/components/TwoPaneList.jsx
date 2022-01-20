/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';

import './TwoPaneList.css';

export const TwoPaneList = ({ data }) => {
  const [selectedTitle, setSelectedTitle] = useState(null);

  const _renderTitleList = (items, index) => {
    const isSelected = selectedTitle?.title === items.title;

    return (
      <li key={index}>
        <a
          className={isSelected ? 'is-active' : ''}
          onClick={() => {
            setSelectedTitle({
              title: items.title,
              content: items.content,
            });
          }}>
          {items.title}
        </a>
      </li>
    );
  };

  const _renderContent = () => {
    if (!selectedTitle) {
      return (
        <>
          <h1 className='title'>Welcome!</h1>

          <p>Select a title from the list to get started.</p>
        </>
      );
    }

    return (
      <>
        <h1 className='title'>{selectedTitle.title}</h1>

        {selectedTitle.content.map((details, index) => (
          <p key={index}>{details}</p>
        ))}
      </>
    );
  };

  return (
    <div className='twoPaneListWrapper box columns'>
      <aside className='menu column is-one-quarter '>
        <p className='menu-label'>Titles</p>

        <ul className='menu-list'>{data.map(_renderTitleList)}</ul>
      </aside>

      <div className='content column has-background-green-ish'>
        {_renderContent()}
      </div>
    </div>
  );
};
