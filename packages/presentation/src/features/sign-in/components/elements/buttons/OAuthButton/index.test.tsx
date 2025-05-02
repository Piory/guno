import { defaultConfig } from '@tamagui/config/v4';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { TamaguiProvider, createTamagui } from 'tamagui';
import { OAuthButton } from './index.tsx';

jest.mock('../../../../../../contexts', () => {
  // モックファクトリ内で直接作る
  const mockSignIn = jest.fn();
  return {
    __esModule: true,
    useAuth: jest.fn().mockImplementation(() => ({
      signIn: mockSignIn,
    })),
    mockSignIn: mockSignIn,
  };
});

const mockSignIn = require('../../../../../../contexts').mockSignIn;

describe('<OAuthButton />', () => {
  const config = createTamagui(defaultConfig);
  const setup = () => {
    return render(
      <TamaguiProvider config={config}>
        <OAuthButton type='google' icon={<div />} backgroundColor='#FFF' borderColor='#FFF' text='Sign in with Google' textColor='#000' />
      </TamaguiProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('スナップショットが一致すること', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('ボタンをタップした場合は、SignInUseCase#execute が呼ばれていること', async () => {
    setup();
    const button = screen.getByText('Sign in with Google');
    expect(button).toBeInTheDocument();
    expect(mockSignIn).not.toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(button);
    });
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith('google');
  });
});
