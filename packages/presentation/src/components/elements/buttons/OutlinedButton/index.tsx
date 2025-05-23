import React from 'react';
import { Button, styled } from 'tamagui';

const StyledButton = styled(Button, {
  borderRadius: '$16',
  borderColor: '$subtle',
  hoverStyle: {
    borderColor: '$subtle',
  },
  pressStyle: {
    borderColor: '$subtle',
  },
  focusStyle: {
    borderColor: '$subtle',
  },
});

type Props = React.PropsWithChildren<React.ComponentProps<typeof Button>>;

export const OutlinedButton: React.FC<Props> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
