import cls from './style.module.css';

export const Header: React.FC = () => {
    return (
        <header className={cls.header}>
            <div className={cls.logo}>
                <h2>repositories finder</h2>
            </div>
        </header>
    )
}