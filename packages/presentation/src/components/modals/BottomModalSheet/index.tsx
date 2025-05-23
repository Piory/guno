import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sheet, View, styled } from 'tamagui';

const ModalView = styled(View, {
  height: '100%',
  backgroundColor: '$background',
  borderRadius: '$9',
  padding: '$5',
  marginHorizontal: '$4',
});

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snapPoints?: number[];
} & React.PropsWithChildren;

export const BottomModalSheet: React.FC<Props> = ({ open, onOpenChange, snapPoints, children }) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange} native snapPoints={snapPoints} moveOnKeyboardChange disableDrag>
        <Sheet.Overlay backgroundColor='$overlayBackground' />
        <Sheet.Frame paddingVertical='$6' backgroundColor='transparent'>
          <SafeAreaView>
            <ModalView>
              {/*<Sheet.Handle backgroundColor='$overlayBackground' height={6} />*/}
              {children}
            </ModalView>
          </SafeAreaView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
