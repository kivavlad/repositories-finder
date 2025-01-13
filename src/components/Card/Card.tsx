import { formatDate } from '../../shared/utils/format-date';
import { IRepository } from '../../store/repositories/types';
import styles from './Card.module.css';

interface IProps {
    item: IRepository;
}

export const Card: React.FC<IProps> = ({ item }) => {

    return (
        <div className={styles.card__container}>
            <div className={styles.up__text_wrapper}>
                <h2 className={styles.card__text}>Name: <span>{item.full_name}</span></h2>
                <h2 className={styles.card__text}>Description: <span>{item.description}</span></h2>
                <h2 className={styles.card__text}>Created: <span>{formatDate(item.created_at)}</span></h2>
                <h2 className={styles.card__text}>Updated: <span>{formatDate(item.updated_at)}</span></h2>
            </div>
            <div className={styles.url__wrapper}>
                <a href={item.html_url} target='_blank' rel="noreferrer" className={styles.card__link}>{item.html_url}</a>
            </div>
        </div>
    )
}