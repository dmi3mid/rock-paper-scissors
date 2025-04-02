const tg = window?.Telegram?.WebApp;

export default function useTelegram() {
    const onClose = () => {
        tg.close()
    }

    return {
        onClose,
        tg,
        user: tg?.initDataUnsafe?.user,
        WebAppMainButton: tg?.MainButton,
    }
}