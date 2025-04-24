import { fireEvent, render, screen } from '@testing-library/react-native';
import { SignInUseCase } from '@core/usecase';
import { OAuthButton } from './index.tsx';

describe('OAuthButton', () => {
  const executeMock = jest.fn();
  (SignInUseCase as jest.Mock).mockImplementation(() => {
    return {
      execute: executeMock,
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('スナップショットが一致すること', () => {
    const { toJSON } = render(<OAuthButton type='google' icon={<div />} backgroundColor='#FFF' borderColor='#FFF' text='Sign in with Google' textColor='#000' />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('ボタンをタップした場合は、SignInUseCase#execute が呼ばれていること', () => {
    render(<OAuthButton type='google' icon={<div />} backgroundColor='#FFF' borderColor='#FFF' text='Sign in with Google' textColor='#000' />);
    const button = screen.getByText('Sign in with Google');
    expect(button).toBeInTheDocument();
    expect(executeMock).not.toHaveBeenCalled();
    fireEvent.press(button);
    expect(executeMock).toHaveBeenCalledTimes(1);
  });
});
