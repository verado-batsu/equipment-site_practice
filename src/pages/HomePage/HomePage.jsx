import { NavLink } from 'react-router-dom';

import styles from './Home.module.scss';
const { home, homeTitle, homeDescription, homeLinkWrapper, homeLink } = styles;

export function HomePage() {
    return (
        <section className={home}>
            <div className="container">
                <h1 className={homeTitle}>
                    Ласкаво просимо у каталог обладнання для обробки тиском
                </h1>
                <p className={homeDescription}>
                    На сайті ви можете подивитись каталог всіх доданих
                    обладнань, а також знайти одне конкретне за допомогою
                    фільтру по категорії обладнання або за допомогою пошуку по
                    назві.
                </p>
                <div className={homeLinkWrapper}>
                    <NavLink className={homeLink} to="equipments">
                        До обладання
                    </NavLink>
                </div>
            </div>
        </section>
    );
}
