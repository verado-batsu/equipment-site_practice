import { SignUpForm } from 'components/SignUpForm/SignUpForm';

import styles from './SignUpPage.module.scss';
const { signUpSection } = styles;

export function SignUpPage() {
    return (
        <section className={signUpSection}>
            <SignUpForm />
        </section>
    );
}
