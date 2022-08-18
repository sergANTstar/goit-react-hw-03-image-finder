import PropTypes from 'prop-types';
import axios from 'axios';

export function fetchPictures(nextInputValue, baseApi, APIkey, nextPage) {

    return axios
        .get(
            `${baseApi}?key=${APIkey}&page=${nextPage}&q=${nextInputValue}&image_type=photo&per_page=12`
        )
        .then(r => { return r.data.hits });

}
fetchPictures.PropTypes = {
    nextInputValue: PropTypes.string,
    baseApi: PropTypes.string,
    APIkey: PropTypes.string,
    page: PropTypes.string,
}