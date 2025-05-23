import React from 'react';
import { Button, styled } from 'tamagui';

const StyledButton = styled(Button, {
  borderRadius: '$16',
});

type Props = React.PropsWithChildren<React.ComponentProps<typeof Button>>;

export const FillButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledButton backgroundColor='$primary' borderColor='$primary' {...props}>
      {children}
    </StyledButton>
  );
};
