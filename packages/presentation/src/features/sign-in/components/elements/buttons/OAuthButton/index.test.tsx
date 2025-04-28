import { fireEvent, render, screen } from '@testing-library/react-native';
import { SignInUseCase } from '@core/usecase';
import { UseCaseProvider } from '../../../../../../contexts/UseCaseContainer';
import { OAuthButton } from './index.tsx';

describe('OAuthButton', () => {
  const executeMock = jest.fn();
  const SignInUseCaseMock = SignInUseCase as jest.Mock;
  SignInUseCaseMock.mockImplementation(() => {
    return {
      execute: executeMock,
    };
  });

  const setup = () => {
    return render(
      <UseCaseProvider container={new SignInUseCaseMock()}>
        <OAuthButton type='google' icon={<div />} backgroundColor='#FFF' borderColor='#FFF' text='Sign in with Google' textColor='#000' />
      </UseCaseProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('スナップショットが一致すること', () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('ボタンをタップした場合は、SignInUseCase#execute が呼ばれていること', () => {
    setup();
    const button = screen.getByText('Sign in with Google');
    expect(button).toBeInTheDocument();
    expect(executeMock).not.toHaveBeenCalled();
    fireEvent.press(button);
    expect(executeMock).toHaveBeenCalledTimes(1);
  });
});
