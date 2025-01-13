import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../shared/hooks/use-app-dispatch';
import { useAppSelector } from '../../shared/hooks/use-app-selector';
import { fetchRepositories } from '../../store/repositories/services';
import { repositoriesActions } from '../../store/repositories/slice';
import { transformWords } from '../../shared/utils/format-words';
import { Card } from '../Card/Card';
import { IRepository } from '../../store/repositories/types';
import styles from './Main.module.css';
import loopImg from '../../shared/assets/icons/icon-search.svg';

export const Main: React.FC = () => {
    const { loading, error, items, total_count } = useAppSelector((state) => state.repositories);
    const [isFetching, setIsFetching] = useState(false);
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const words = ['результат', 'результата', 'результатов'];
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFetching) {
            dispatch(fetchRepositories({ name, page, per_page: 10 }));
            setIsFetching(false);
        }
    }, [isFetching, dispatch, name, page])


    const reset = () => {
        setPage(1);
        dispatch(repositoriesActions.resetResults());
    }
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim()) {
            reset();
            setIsFetching(true);
        }
    }


    useEffect(() => {
        if (error) return

        const scrollHandler = () => {
            if (total_count > items.length) {
                const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

                if (bottom) {
                    setPage(page + 1);
                    setIsFetching(true);
                }
            }
        }

        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', scrollHandler);
        return function() {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', scrollHandler);
        }
    })


    return (
        <main className={styles.main}>

            <div className={styles.form__wrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.input__container}>
                        <img src={loopImg} alt='' />

                        <input 
                            type='text'
                            autoComplete='off'
                            className={styles.input}
                            placeholder="Search GitHub repositories"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {error && 
                        <div className={styles.error__wrapper}>No results</div>
                    }

                    <button 
                        type='submit' 
                        disabled={loading}
                        className={styles.button}
                    >
                        Search
                    </button>
                </form>
            </div>

            {items.length > 0 &&
                <div className={styles.results__wrapper}>
                    <h2 className={styles.title}>Найдено {transformWords(total_count, words)}</h2>

                    <div className={styles.result__cards}>
                        {items.map((item: IRepository) => <Card key={item.id} item={item} />)}
                    </div>

                    <div className={styles.loader__wrapper}>
                        {loading && <span>loading ...</span>}
                    </div>
                </div>
            }
        </main>
    )
}