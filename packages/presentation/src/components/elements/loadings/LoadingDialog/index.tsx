import React from 'react';
import { Dialog, Spinner } from 'tamagui';

type Props = {
  visible: boolean;
};

export const LoadingDialog: React.FC<Props> = ({ visible }) => {
  return (
    <>
      <Dialog open={visible}>
        <Dialog.Portal>
          <Dialog.Overlay key='overlay' backgroundColor='transparent' />
          <Dialog.Content key='content'>
            <Spinner />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
};
