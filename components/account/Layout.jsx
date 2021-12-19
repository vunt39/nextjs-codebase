import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from 'services';

export { Layout };

function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="login-container">
            <div className="content-login">
                <div className="image-container">
                    <img src='/landmark2.jpg' alt='Image background' className="image-login"></img>
                </div>
                <div className="loginForm">
                    <div className="login-form-container">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}