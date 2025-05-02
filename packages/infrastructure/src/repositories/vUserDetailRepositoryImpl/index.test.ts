// import { SupabaseClient } from '@supabase/supabase-js';
// import { mock } from 'jest-mock-extended';
// import { VUserDetailRepositoryImpl } from './index.ts';
//
// jest.mock('react-native-app-auth');
// jest.mock('@supabase/supabase-js');
// describe('VUserDetailRepositoryImpl', () => {
//   const mockSupabaseClient = mock<SupabaseClient>();
//   const repository = new VUserDetailRepositoryImpl(mockSupabaseClient);
//
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//
//   describe('#signInWithGoogle', () => {
//     describe('正常系', () => {
//       it(`react-native-app-auth の #authorize に ${OAuthConfig.GOOGLE} が渡されていること`, async () => {
//         await repository.signInWithGoogle();
//         expect(mockAuthorize).toHaveBeenCalledTimes(1);
//         expect(mockAuthorize).toHaveBeenCalledWith(OAuthConfig.GOOGLE);
//         expect(signInWithIdTokenMock).toHaveBeenCalledTimes(1);
//         expect(signInWithIdTokenMock).toHaveBeenCalledWith({
//           provider: 'google',
//           token: idToken,
//           access_token: accessToken,
//         });
//       });
//     });
//   });
//
//   describe('#signInWithX', () => {
//     describe('正常系', () => {
//       it(`react-native-app-auth の #authorize に ${OAuthConfig.X} が渡されていること`, async () => {
//         await repository.signInWithX();
//         expect(mockAuthorize).toHaveBeenCalledTimes(1);
//         expect(mockAuthorize).toHaveBeenCalledWith(OAuthConfig.X);
//         expect(signInWithIdTokenMock).toHaveBeenCalledTimes(1);
//         expect(signInWithIdTokenMock).toHaveBeenCalledWith({
//           provider: 'twitter',
//           token: idToken,
//           access_token: accessToken,
//         });
//       });
//     });
//   });
// });
