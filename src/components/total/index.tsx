import { transformWords } from "../../shared/utils/format-words";
import cls from "./style.module.css";

interface IProps {
    totalCount: number;
}

export const Total: React.FC<IProps> = ({ totalCount }) => {
    const words = ['результат', 'результата', 'результатов'];

    return (
        <h2 className={cls.count}>
            Найдено {transformWords(totalCount, words)}
        </h2>
    )
}