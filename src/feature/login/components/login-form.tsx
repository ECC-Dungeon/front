import { useState } from 'react';
import Modal from 'react-modal';
import { QrScan } from './qr-scan';
import Button from '@/components/ui/button/button';

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
        <img src="/ecc-dungeon-logo.webp" alt="ECCダンジョンメインロゴ" />{' '}
      </div>
      <Button onClick={openModal} children="認証QRコードを読み取る" />
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
