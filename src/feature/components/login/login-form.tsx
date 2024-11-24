import { useState } from 'react';
import Modal from 'react-modal';
import { QrScan } from './qr-scan';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4">
      <div>
        {/* TODO: ロゴに差し替える */}
        <img src="" alt="" className="h-40 w-48" />
      </div>
      <button onClick={openModal}>認証QRコードを読み取る</button>
      <Modal
        isOpen={modal}
        style={{
          content: {
            height: '360px',
            padding: '0',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            border: 'none',
          },
        }}
      >
        <div className="">
          {/* closeを差し替える */}
          <button onClick={closeModal}>close</button>
          <QrScan onSuccess={onSuccess} />
        </div>
      </Modal>
    </section>
  );
};
