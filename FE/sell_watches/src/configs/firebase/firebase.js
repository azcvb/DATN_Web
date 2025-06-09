import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBFloqB3dUq3BWyasFqEhTpqD2lD5EfP7I",
    authDomain: "sellwatches-dd805.firebaseapp.com",
    projectId: "sellwatches-dd805",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Gắn reCAPTCHA (giả lập trong dev mode)
export const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebaseConfig.auth(
            'recaptcha-container',
            { size: 'invisible' },
            auth
        );
    }
    if (window.recaptchaVerifier) {
        window.recaptchaVerifier.appVerificationDisabledForTesting = true;
    }
};

