import { defaultConfig } from '@tamagui/config/v4';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { TamaguiProvider, createTamagui } from 'tamagui';
import { SignInWithGuestButton } from './index.tsx';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

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

describe('<SignInWithGuestButton />', () => {
  const config = createTamagui(defaultConfig);
  const setup = () => {
    return render(
      <TamaguiProvider config={config}>
        <SignInWithGuestButton />
      </TamaguiProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('初期表示時のスナップショットが一致すること', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it.skip(`ボタンをタップした場合は、確認ダイアログが表示されて、「キャンセル」ボタンをタップすると signIn が呼ばれないこと`, async () => {
    setup();
    const continueWithGuestButtonText = screen.getByText('CONTINUE_WITH_GUEST');
    const guestSignInAlertTitle = screen.queryByText('GUEST_SIGN_IN_ALERT_TITLE');
    const guestSignInAlertMessage = screen.queryByText('GUEST_SIGN_IN_ALERT_MESSAGE');
    const cancelButtonText = screen.queryByText('CANCEL');
    const continueButtonText = screen.queryByText('CONTINUE');
    expect(continueWithGuestButtonText).toBeInTheDocument();
    expect(guestSignInAlertTitle).not.toBeInTheDocument();
    expect(guestSignInAlertMessage).not.toBeInTheDocument();
    expect(cancelButtonText).not.toBeInTheDocument();
    expect(continueButtonText).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(continueWithGuestButtonText);
    });
    expect(continueWithGuestButtonText).toBeInTheDocument();
    expect(guestSignInAlertTitle).toBeInTheDocument();
    expect(guestSignInAlertMessage).toBeInTheDocument();
    expect(cancelButtonText).toBeInTheDocument();
    expect(continueButtonText).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(cancelButtonText);
    });
    expect(continueWithGuestButtonText).toBeInTheDocument();
    expect(guestSignInAlertTitle).not.toBeInTheDocument();
    expect(guestSignInAlertMessage).not.toBeInTheDocument();
    expect(cancelButtonText).not.toBeInTheDocument();
    expect(continueButtonText).not.toBeInTheDocument();
    expect(mockSignIn).not.toHaveBeenCalled();
  });
});
