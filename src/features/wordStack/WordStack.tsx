/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import useConstant from 'use-constant';
import cx from 'classnames';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './WordStack.module.scss';
import {
  fetchWord,
  selectCharIndex,
  selectCurrentWord,
  selectIsLoading,
  selectWordStackPending,
} from './state/wordStackSlice';
import {
  recieveAppStatus,
  selectLevel,
  selectStatus,
} from '../../containers/WordRaceApp/state/wordRaceAppSlice';
import { AppStatus } from '../../containers/WordRaceApp/types/wordRaceAppTypes';

function WordStack() {
  const currentWord = useAppSelector(selectCurrentWord);
  const charIndex = useAppSelector(selectCharIndex);
  const currentStatus = useAppSelector(selectStatus);
  const isLoading = useAppSelector(selectIsLoading);
  const wordStackPending = useAppSelector(selectWordStackPending);
  const currentLevel = useAppSelector(selectLevel);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWord());
    return () => {
      dispatch(recieveAppStatus('IDLE'));
    };
  }, [dispatch]);

  useEffect(() => {
    const maxLength = Math.max(10 - currentLevel, 0);
    if (wordStackPending.length >= maxLength) {
      dispatch(recieveAppStatus('OVER'));
    }
  }, [wordStackPending]);

  const shouldRender = (status: AppStatus) => {
    switch (status) {
      case 'IDLE':
        return 'Press SPACEBAR to start!';
      case 'OVER':
        return 'Better luck next time, press SPACEBAR to restart';
      default:
        return false;
    }
  };
  return (
    <div className={cx('container', styles.container)}>
      {isLoading ? (
        <div className={cx(styles.spinnerContainer)}>
          <svg role="alert" aria-live="assertive">
            <circle cx="30" cy="30" r="20" />
          </svg>
        </div>
      ) : (
        <div className={cx(styles.wordStackContainer)}>
          <p className="frosted-glass">
            {shouldRender(currentStatus)
              ? shouldRender(currentStatus)
              : currentWord
                  .split('')
                  .map((letter, index) => (
                    <span
                      className={cx(
                        index === charIndex
                          ? styles.reqLetter
                          : styles.notLetter,
                      )}
                    >
                      {letter}
                    </span>
                  ))}
          </p>
          <div className={cx(styles.stack, 'flex-row')}>
            {wordStackPending.map((val) => (
              <p className={cx(styles.notLetter)} key={val.hash}>
                {val.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default WordStack;
