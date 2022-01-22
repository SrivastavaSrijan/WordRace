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
} from './state/wordStackSlice';
import {
  recieveAppStatus,
  selectStatus,
} from '../../containers/WordRaceApp/state/wordRaceAppSlice';

function WordStack() {
  const currentWord = useAppSelector(selectCurrentWord);
  const charIndex = useAppSelector(selectCharIndex);
  const currentStatus = useAppSelector(selectStatus);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWord());
    return () => {
      dispatch(recieveAppStatus('IDLE'));
    };
  }, [dispatch]);
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
            {currentStatus === 'IDLE'
              ? 'Press Enter to start!'
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
        </div>
      )}
    </div>
  );
}
export default WordStack;
