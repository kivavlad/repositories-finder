import { memo } from 'react';
import { formatDate } from '../../shared/utils/format-date';
import { IRepository } from '../../store/repositories/types';
import cls from './style.module.css';

interface IProps {
    item: IRepository;
}

export const Card: React.FC<IProps> = memo(({ item }) => {

    return (
        <div className={cls.card__container}>
            <div className={cls.up__text_wrapper}>
                <h2 className={cls.card__text}>Name: <span>{item.full_name}</span></h2>
                <h2 className={cls.card__text}>Description: <span>{item.description}</span></h2>
                <h2 className={cls.card__text}>Created: <span>{formatDate(item.created_at)}</span></h2>
                <h2 className={cls.card__text}>Updated: <span>{formatDate(item.updated_at)}</span></h2>
            </div>
            <div className={cls.url__wrapper}>
                <a href={item.html_url} target='_blank' rel="noreferrer" className={cls.card__link}>{item.html_url}</a>
            </div>
        </div>
    )
})