import styles from './Home.module.scss';
const { home } = styles;

export function HomePage() {
    return (
        <section className={home}>
            <div className="container">Home page</div>
        </section>
    );
}
