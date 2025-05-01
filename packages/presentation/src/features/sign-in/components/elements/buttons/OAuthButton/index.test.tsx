import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { TamaguiProvider } from 'tamagui';
import { SignInUseCase } from '@core/usecase';
import { AuthRepository } from '@core/domain';
import config from '../../../../../../../tamagui.config.ts';
import { UseCaseProvider } from '../../../../../../contexts/UseCaseContainer';

jest.mock('solito/router', () => {
  // モックファクトリ内で直接作る
  const replaceMock = jest.fn();
  return {
    __esModule: true,
    useRouter: jest.fn().mockImplementation(() => ({
      replace: replaceMock,
    })),
    // 必要ならテスト内で import して使えるようエクスポート
    replaceMock: replaceMock,
  };
});

jest.mock('@core/usecase', () => {
  const executeMock = jest.fn<Promise<void>, [string]>();
  return {
    __esModule: true,
    SignInUseCase: jest.fn().mockImplementation(() => ({
      execute: executeMock,
    })),
    executeMock: executeMock,
  };
});

const executeMock = require('@core/usecase').executeMock;

jest.mock('../../../../../../composition', () => ({
  useCaseContainer: {},
}));

const replaceMock = require('solito/router').replaceMock;

const OAuthButton = require('./index.tsx').OAuthButton;

describe('<OAuthButton />', () => {
  const setup = () => {
    return render(
      <UseCaseProvider
        container={{
          signInUseCase: new SignInUseCase({} as AuthRepository),
        }}
      >
        <TamaguiProvider config={config} defaultTheme='light'>
          <OAuthButton type='google' icon={<div />} backgroundColor='#FFF' borderColor='#FFF' text='Sign in with Google' textColor='#000' />
        </TamaguiProvider>
      </UseCaseProvider>,
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
    expect(executeMock).not.toHaveBeenCalled();
    expect(replaceMock).not.toHaveBeenCalled();
    await act(async () => {
      fireEvent.click(button);
    });
    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toHaveBeenCalledWith('google');
    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith('/home');
  });
});
