import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from '../../shared/hooks/use-app-dispatch';
import { useAppSelector } from '../../shared/hooks/use-app-selector';
import { fetchRepositories } from '../../store/repositories/services';
import { repositoriesActions } from '../../store/repositories/slice';
import { Form } from '../../components/form';
import { Total } from '../../components/total';
import { List } from '../../components/list';
import { Card } from '../../components/card';
import { IRepository } from '../../store/repositories/types';
import cls from './style.module.css';

export const Search: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error, items, total_count } = useAppSelector((state) => state.repositories);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim()) {
            setPage(1);
            dispatch(repositoriesActions.resetResults());
            setIsFetching(true);
        }
    }

    const loadMoreItems = useCallback(() => {
        if (loading) return;
        setPage(page + 1);
        setIsFetching(true);
    }, [loading, page])

    const renders = {
        item: useCallback((item: IRepository) => {
            return <Card item={item} />
        }, [])
    }

    useEffect(() => {
        if (isFetching) {
            dispatch(fetchRepositories({ name, page, per_page: 10 }));
            setIsFetching(false);
        }
    }, [isFetching, dispatch, name, page])

    return (
        <main className={cls.main}>
            <Form
                value={name}
                error={error}
                disabled={loading}
                setValue={setName}
                onSubmit={handleSubmit}
            />

            {(items.length > 0 && !error) &&
                <div className={cls.results__wrapper}>
                    <Total totalCount={total_count} />
                    <List
                        list={items}
                        loading={loading}
                        rendersItem={renders.item}
                        loadMore={loadMoreItems}
                    />
                </div>
            }
        </main>
    )
}