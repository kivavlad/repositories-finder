import cls from "./style.module.css";
import loop from "../../shared/assets/icons/icon-search.svg";

interface IProps {
    value: string;
    error: boolean;
    disabled: boolean;
    setValue: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const Form: React.FC<IProps> = (props) => {
    const { value, error, disabled, setValue, onSubmit } = props;

    return (
        <div className={cls.form__wrapper}>
            <form onSubmit={onSubmit} className={cls.form}>
                <div className={cls.input__container}>
                    <img src={loop} alt='' />
                    <input 
                        type='text'
                        autoComplete='off'
                        className={cls.input}
                        placeholder="Search GitHub repositories"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                {error && 
                    <div className={cls.error__wrapper}>No results</div>
                }

                <button 
                    type='submit' 
                    disabled={disabled}
                    className={cls.button}
                >
                    Search
                </button>
            </form>
        </div>
    )
}