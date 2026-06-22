import { useEffect, useState } from 'react';
import useScrollPosition from './useScrollPosition';
import { useTopMenu } from './useTopMenu';

export const useSticky = () => {
  const [isSticky, setSticky] = useState(false);
  const scrollPosition = useScrollPosition();

  const { isExist } = useTopMenu();

  useEffect(() => {
    const maxTop = isExist ? 30 : 0;
    const shouldBeSticky = scrollPosition > maxTop;
    if (isSticky !== shouldBeSticky) {
      setSticky(shouldBeSticky);
    }
  }, [scrollPosition, isSticky, isExist]);

  return isSticky;
};
