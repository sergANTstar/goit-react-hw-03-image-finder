import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={css.loader}>
            <Bars
                color="#00BFFF"
                height={40}
                width={40} 
            />
        </div>
    );
};