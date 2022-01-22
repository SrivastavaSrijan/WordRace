/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import useConstant from 'use-constant';
import { useAppSelector, useAppDispatch, getLetter } from '../../app/hooks';
import {
  keyCount,
  selectKeyCount,
  selectKeyPressed,
  setKey,
} from './state/keyboardSlice';
import styles from './Keyboard.module.scss';
import {
  wordIndex,
  selectCharIndex,
  selectCurrentWord,
  selectWordIndex,
  setCharacter,
  changeWord,
} from '../wordStack/state/wordStackSlice';
import {
  decrementScore,
  incrementScore,
  recieveAppStatus,
  selectStatus,
} from '../../containers/WordRaceApp/state/wordRaceAppSlice';

function Keyboard() {
  const charIndex = useAppSelector(selectCharIndex);
  const keyCountValue = useAppSelector(selectKeyCount);
  const lasKeyPressed = useAppSelector(selectKeyPressed);
  const currentWord = useAppSelector(selectCurrentWord);
  const wordIndexValue = useAppSelector(selectWordIndex);
  const status = useAppSelector(selectStatus);
  const [isCorrect, setIsCorrect] = useState(true);
  const dispatch = useAppDispatch();
  const getKey = (code: string, kb: HTMLElement) =>
    kb.querySelector(`[data-char="${code}"]`) as HTMLElement;
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (status === 'IDLE') {
        return;
      }
      event.stopPropagation();
      const kb = event.target as HTMLElement;
      const code = event.key.toUpperCase();
      const key = getKey(code, kb);
      key?.setAttribute('data-pressed', 'on');
    },
    [status],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();
      const kb = event.target as HTMLElement;
      const code = event.key.toUpperCase();
      const key = getKey(code, kb);
      if (code === 'ENTER' && status === 'IDLE') {
        dispatch(recieveAppStatus('STARTED'));
        return;
      }
      if (status === 'IDLE') {
        return;
      }
      key?.setAttribute('data-pressed', 'off');
      setTimeout(() => key?.removeAttribute('data-pressed'), 200);
      dispatch(setKey(code));
      const characterRequested = getLetter(currentWord, charIndex);
      setIsCorrect(code === characterRequested);
      dispatch(
        code === characterRequested ? incrementScore(1) : decrementScore(1),
      );
      dispatch(keyCount(keyCountValue + 1));
      dispatch(setCharacter(keyCountValue + 1));
    },
    [charIndex, keyCountValue, status],
  );
  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);

  useEffect(() => {
    const isWordTyped = keyCountValue === currentWord.length;
    if (isWordTyped && charIndex !== -1) {
      const nextWordCount = wordIndexValue + 1;
      dispatch(wordIndex(nextWordCount));
      dispatch(setKey('ENTER'));
      dispatch(changeWord(nextWordCount));
      dispatch(keyCount(0));
      dispatch(setCharacter(0));
    }
  }, [keyCountValue]);

  const keyList = useConstant(() => [
    {
      '0': 'Q',
      '1': 'W',
      '2': 'E',
      '3': 'R',
      '4': 'T',
      '5': 'Y',
      '6': 'U',
      '7': 'I',
      '8': 'O',
      '9': 'P',
    },
    {
      '0': 'A',
      '1': 'S',
      '2': 'D',
      '3': 'F',
      '4': 'G',
      '5': 'H',
      '6': 'J',
      '7': 'K',
      '8': 'L',
    },
    { '0': 'Z', '1': 'X', '2': 'C', '3': 'V', '4': 'B', '5': 'N', '6': 'M' },
  ]);

  const shouldHighlight = (key: string) => {
    if (key === lasKeyPressed) {
      if (isCorrect) {
        return styles.isGreen;
      }
      return styles.isRed;
    }
    return '';
  };

  return (
    <div className={cx('container')}>
      <div className={cx(styles.keyboard)}>
        {keyList.map((row, rowIndex) => (
          <div key={`row_${rowIndex.toFixed()}`} className={cx(styles.row)}>
            {Object.values(row).map((key, keyIndex) => (
              <div
                key={key}
                className={cx(styles.letter, shouldHighlight(key))}
                data-char={key}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
        <div className={cx(styles.row, styles.spaceRow)}>
          {' '}
          <div
            className={cx(styles.letter, styles.space)}
            data-key="32"
            data-char=" "
          >
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
export default Keyboard;
