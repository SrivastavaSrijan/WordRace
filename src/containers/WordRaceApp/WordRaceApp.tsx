import React from 'react';
import cx from 'classnames';
import logo from '../../logo.svg';
import styles from './WordRaceApp.module.scss';
import Keyboard from '../../features/keyboard/Keyboard';
import WordStack from '../../features/wordStack/WordStack';
import { useAppSelector } from '../../app/hooks';
import { selectScore } from './state/wordRaceAppSlice';

function WordRaceApp() {
  const score = useAppSelector(selectScore);
  return (
    <div className="flex-column">
      <main className={cx(styles.main)}>
        <div className="frosted-glass flex-row">
          <h1 className={cx(styles.header)}>
            Word Race!
            <img src={logo} className={cx(styles.logo)} alt="logo" />
          </h1>

          <p>{score}</p>
        </div>
        <p className="frosted-glass">
          A fun game to test out how quick you type
        </p>
        <WordStack />
        <Keyboard />
      </main>
    </div>
  );
}

export default WordRaceApp;
