import React, { useEffect } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import useSound from 'use-sound';

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
  selectMaxWordStackLength,
  selectWordIndex,
  selectWordStackLength,
  setCharacter,
  setMaxWordStackLength,
  setWordIndex,
  setWordStackLength,
} from '../../features/wordStack/state/wordStackSlice';
import {
  setIntervalTimer,
  shouldStopTimer,
} from '../../features/timer/state/timerSlice';

const warningSound = require('../../assets/sounds/warning.mp3');
const failedSound = require('../../assets/sounds/failed.mp3');

function WordRaceApp() {
  const score = useAppSelector(selectScore);
  const baseScore = useAppSelector(selectBaseScore);
  const status = useAppSelector(selectStatus);
  const triggerCorrect = useAppSelector(selectRecieveCorrect);
  const wordIndexValue = useAppSelector(selectWordIndex);
  const wordStackLength = useAppSelector(selectWordStackLength);
  const maxWordStackLength = useAppSelector(selectMaxWordStackLength);
  const currentLevel = useAppSelector(selectLevel);

  const dispatch = useDispatch();

  const [playFailed] = useSound(failedSound, {
    volume: 0.75,
  });
  const [playWarning, { pause }] = useSound(warningSound, {
    volume: 0.75,
    interrupt: true,
  });

  useEffect(() => {
    switch (status) {
      case 'OVER':
        dispatch(setKey(''));
        dispatch(setKeyCount(0));
        dispatch(setCharacter(0));
        dispatch(setWordIndex(1));
        dispatch(setWordStackLength(0));
        dispatch(shouldStopTimer(true));
        dispatch(setMaxWordStackLength(0));
        pause();
        playFailed();
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
          dispatch(setIntervalTimer(5));
          break;
        case 10:
          dispatch(setLevel(3));
          dispatch(setIntervalTimer(3));
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

  useEffect(() => {
    if (maxWordStackLength === 3 || maxWordStackLength === 2) {
      playWarning();
    }
  }, [maxWordStackLength]);

  return (
    <div className="flex-column">
      <main className={cx(styles.main)}>
        <div className={cx(styles.header, 'frosted-glass', 'flex-row')}>
          {maxWordStackLength < 4 ? (
            <div className={cx(styles.wordsLeft, 'flex-column')}>
              <p>{maxWordStackLength} left</p>
              <p className="bold">HURRY!</p>
            </div>
          ) : (
            ''
          )}
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
