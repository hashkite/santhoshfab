import { useState } from 'react';
import { Button } from '../../../components/elements';
import { getHirePopup } from '../../../shared/api';
import { Modal } from '../../../shared/ui';
import HirePopup from './index';

const HireButton = () => {
  const { data: hireData } = getHirePopup();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openHirePopup = () => {
    setIsModalOpen(true);
  };

  const closeHirePopup = () => {
    setIsModalOpen(false);
  };

  if (!hireData) return null;

  return (
    <>
      <Button onClick={openHirePopup} className="btn btn-secondary" fake={true}>
        <span>{hireData?.button?.value || 'Hire'}</span>
      </Button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeHirePopup}
        type="hire-popup-modal"
      >
        {hireData && <HirePopup {...hireData} />}
      </Modal>
    </>
  );
};

export default HireButton;
