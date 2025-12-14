import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { QrScan } from './qr-scan';
import Button from '@/components/ui/button/button';
import { ContentLayout } from '@/components/layouts/content-layout';
import { MdCancel } from 'react-icons/md';

import Logo from '@/assets/ecc-dungeon-logo.webp';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // React Modalのアクセシビリティ設定
    Modal.setAppElement('#root');
  }, []);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <ContentLayout>
      <div className="h-screen bg-[radial-gradient(circle_at_center,_#323232cc_0%,_#323232ff_100%)]">
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <div>
            <img src={Logo} alt="ECCダンジョンメインロゴ" />
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
            <div>
              <button onClick={closeModal}>
                <MdCancel />
              </button>
              <QrScan onSuccess={onSuccess} />
            </div>
          </Modal>
        </div>
      </div>
    </ContentLayout>
  );
};
