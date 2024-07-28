import { LogInForm } from 'components/LogInForm/LogInForm';

import styles from './LogInPage.module.scss';
const { loginSection } = styles;

export function LogInPage() {
    return (
        <section className={loginSection}>
            <div className="container">
                <LogInForm />
            </div>
        </section>
    );
}
