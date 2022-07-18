import { useRef, useEffect } from 'react';

export const usePreviousValue = val => {
  const preRef = useRef();
  useEffect(() => {
    preRef.current = val;
  });
  return preRef.current;
};
