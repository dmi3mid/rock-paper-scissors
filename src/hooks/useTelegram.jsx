const tg = window?.Telegram?.WebApp;

export default function useTelegram() {
    const onClose = () => {
        tg.close()
    }

    return {
        onClose,
        tg,
        user: tg?.initDataUnsafe?.user,
        // user: tg?.initData,
        WebAppMainButton: tg?.MainButton,
    }
}