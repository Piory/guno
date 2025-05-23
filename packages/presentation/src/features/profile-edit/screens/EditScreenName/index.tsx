import { X } from '@tamagui/lucide-icons';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { Input, Text, YStack } from 'tamagui';
import { FillButton } from '../../../../components/elements/buttons/FillButton';
import { Header } from '../../../../components/layouts/headers/Header';
import { useAuth } from '../../../../contexts/AuthContext';
import { useUserStore } from '../../../../stores/userStore';

export const EditScreenName: React.FC = () => {
    const { t } = useTranslation();
    const { back } = useRouter();
    const { userId } = useAuth();
    const vUserDetail = useUserStore(state => (userId ? state.userMap[userId]?.data?.vUserDetail : undefined));
    const inputRef = useRef<Input>(null);

    useEffect(() => {
        // コンポーネントマウント時にキーボードを表示
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <YStack flex={1}>
            <Header title={t('USERNAME')} leading={<X onPress={back} />} />
            <YStack flex={1} paddingHorizontal='$4' paddingVertical='$8' gap='$4'>
                <Input ref={inputRef} width='100%' defaultValue={vUserDetail?.screen_name ?? undefined} placeholder={t('USERNAME')} />
                <FillButton width='100%'>
                    <Text>{t('DONE')}</Text>
                </FillButton>
            </YStack>
        </YStack>
    );
};
