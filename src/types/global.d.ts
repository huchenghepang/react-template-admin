declare global {
    interface Window {
        turnstile: {
            [x: string]: any;
            render: (
                element: HTMLElement | null,
                options: {
                    sitekey: string;
                    callback: (token: string) => void;
                }
            ) => void;
        };
        handleTurnstileSuccess: (token) => void
    }
}

export { };  