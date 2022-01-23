/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import useConstant from 'use-constant';
import cx from 'classnames';
import { useTimer } from 'use-timer';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Timer.module.scss';
import {
  selectInterval,
  selectShouldStart,
  selectShouldStop,
  shouldStartTimer,
  shouldStopTimer,
} from './state/timerSlice';
import {
  selectWordStackLength,
  setWordStackLength,
} from '../wordStack/state/wordStackSlice';
import { recieveAppStatus } from '../../containers/WordRaceApp/state/wordRaceAppSlice';

function WordStack() {
  const shouldStart = useAppSelector(selectShouldStart);
  const shouldStop = useAppSelector(selectShouldStop);
  const interval = useAppSelector(selectInterval);
  const wordStackLength = useAppSelector(selectWordStackLength);
  const dispatch = useAppDispatch();
  const onTimeUpdate = (time: number) => {
    if (time !== 0 && time % interval === 0) {
      dispatch(setWordStackLength(wordStackLength + 1));
    }
  };
  const { time, start, pause, reset, status } = useTimer({
    onTimeUpdate,
  });

  useEffect(() => {
    if (shouldStart) {
      reset();
      start();
    }
    return () => {
      dispatch(shouldStartTimer(false));
    };
  }, [shouldStart]);

  useEffect(() => {
    if (shouldStop) {
      pause();
    }
    return () => {
      dispatch(shouldStopTimer(false));
    };
  }, [shouldStop]);

  return (
    <div className="flex-column">
      <p>{time}</p>
      <p className="bold">TIME</p>
    </div>
  );
}
export default WordStack;
