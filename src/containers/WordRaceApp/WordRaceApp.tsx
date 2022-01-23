import React, { useEffect } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import logo from '../../logo.svg';
import styles from './WordRaceApp.module.scss';
import Keyboard from '../../features/keyboard/Keyboard';
import WordStack from '../../features/wordStack/WordStack';
import { useAppSelector } from '../../app/hooks';
import {
  incrementScore,
  recieveAppStatus,
  recieveCorrect,
  selectBaseScore,
  selectLevel,
  selectRecieveCorrect,
  selectScore,
  selectStatus,
  setLevel,
} from './state/wordRaceAppSlice';
import Timer from '../../features/timer/Timer';
import {
  setKey,
  setKeyCount,
} from '../../features/keyboard/state/keyboardSlice';
import {
  changeWord,
  selectWordIndex,
  selectWordStackLength,
  setCharacter,
  setWordIndex,
  setWordStackLength,
} from '../../features/wordStack/state/wordStackSlice';
import {
  setIntervalTimer,
  shouldStopTimer,
} from '../../features/timer/state/timerSlice';

function WordRaceApp() {
  const score = useAppSelector(selectScore);
  const baseScore = useAppSelector(selectBaseScore);
  const status = useAppSelector(selectStatus);
  const triggerCorrect = useAppSelector(selectRecieveCorrect);
  const wordIndexValue = useAppSelector(selectWordIndex);
  const wordStackLength = useAppSelector(selectWordStackLength);
  const currentLevel = useAppSelector(selectLevel);
  const dispatch = useDispatch();
  useEffect(() => {
    switch (status) {
      case 'OVER':
        dispatch(setKey(''));
        dispatch(setKeyCount(0));
        dispatch(setCharacter(0));
        dispatch(setWordIndex(1));
        dispatch(setWordStackLength(0));
        dispatch(shouldStopTimer(true));
        break;
      default:
        break;
    }
  }, [status]);

  useEffect(() => {
    if (triggerCorrect) {
      const nextWordCount = wordIndexValue + 1;
      dispatch(setWordIndex(nextWordCount));
      dispatch(setKey(''));
      dispatch(changeWord(nextWordCount));
      dispatch(setKeyCount(0));
      dispatch(setCharacter(0));
      const scoreToIncrement = (baseScore - wordStackLength) * wordIndexValue;
      dispatch(incrementScore(scoreToIncrement));
      switch (wordIndexValue) {
        case 5:
          dispatch(setLevel(2));
          dispatch(setIntervalTimer(3));
          break;
        case 10:
          dispatch(setLevel(3));
          dispatch(setIntervalTimer(2));
          break;
        case 11:
          dispatch(recieveAppStatus('FINISHED'));
          break;
        default:
          break;
      }
    }
    return () => {
      dispatch(recieveCorrect(false));
    };
  }, [triggerCorrect]);

  return (
    <div className="flex-column">
      <main className={cx(styles.main)}>
        <div className={cx(styles.header, 'frosted-glass', 'flex-row')}>
          <Timer />
          <h1>
            Word Race!
            <img src={logo} className={cx(styles.logo)} alt="logo" />
          </h1>
          <div className="flex-column">
            <p>{score}</p>
            <p className="bold">SCORE</p>
          </div>
          <div className="flex-column">
            <p>{currentLevel}</p>
            <p className="bold">LEVEL</p>
          </div>
        </div>

        <WordStack />
        <Keyboard />
      </main>
    </div>
  );
}

export default WordRaceApp;
