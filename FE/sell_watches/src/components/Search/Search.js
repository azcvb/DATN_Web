import classNames from "classnames/bind"
import style from "./Search.module.scss"
import { IconSearch } from "../icon/icon";

const cx = classNames.bind(style)
function Search() {
    return (
        <div className={cx('search')}>
            <input placeholder="Bạn muốn tìm gì..." />
            <div className={cx('iconSearch')}>
                <IconSearch />
            </div>
        </div>
    );
}

export default Search;