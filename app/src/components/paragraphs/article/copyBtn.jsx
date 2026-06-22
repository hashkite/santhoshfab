import React from 'react';

import { Button } from '../../elements';
import { Icon } from '../../elements/svg';

const CopyButton = () => {
  const urlToCopy = window.location.href;

  const copyUrl = () => {
    navigator.clipboard.writeText(urlToCopy);
  };

  return (
    <Button 
      className="share__button share__button-copy"
      onClick={copyUrl}
    >
      <Icon 
        icon="copy"
        height="20px"
        width="27px"
        color="#5C00DB"
      />
    </Button>
  );
};

export default CopyButton;