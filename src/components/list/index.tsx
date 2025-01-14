import { memo, useRef, useCallback } from "react";
import { IRepository } from "../../store/repositories/types";
import cls from "./style.module.css";

interface IProps {
    list: IRepository[];
    loading: boolean;
    rendersItem: (item: IRepository) => React.ReactNode;
    loadMore: () => void;
}

export const List: React.FC<IProps> = memo(({ list, loading, rendersItem, loadMore }) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastItemRef = useCallback((node: HTMLElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        })

        if (node) observer.current.observe(node); 
    }, [loading, loadMore])

    return (
        <>
            <div className={cls.list}>
                {list?.map(item => (
                    <div key={item.node_id}>
                        {rendersItem(item)}
                    </div>
                ))}
                <div 
                    ref={lastItemRef} 
                    style={{ height: "1px" }} 
                />
            </div>

            <div className={cls.loader__wrapper}>
                {loading && <span>loading ...</span>}
            </div>
        </>
    )
})