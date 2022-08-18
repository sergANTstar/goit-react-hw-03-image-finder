
import s from "./Button.module.css"
import PropTypes from 'prop-types';



export default function Button({ onLoadMoreClick }) {
    return (
        <button className={s.Button} type="button" onClick={onLoadMoreClick}>
            Load more
        </button>
    );
}
Button.propTypes = {
    onLoadMoreClick: PropTypes.func,
};