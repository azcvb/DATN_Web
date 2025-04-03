import classNames from "classnames/bind"
import style from "./Search.module.scss"
import { IconSearch } from "../icon/icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatSearch } from "../format";

const cx = classNames.bind(style)
function Search() {
    const navigate = useNavigate()
    const [valueInput, setValueInput] = useState("");
    const handlerInput = (e) => {
        setValueInput(e)
    }
    const handlerSearch = () => {
        const query = valueInput.replace(" ", "-")
        navigate(`/search?q=${formatSearch(query)}`)
        setValueInput('')
    }
    const handlerSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            const query = valueInput.replace(" ", "-")
            navigate(`/search?q=${formatSearch(query)}`)
            setValueInput('')
        }
    }
    return (
        <div className={cx('search')}>
            <input onKeyDown={(e) => handlerSearchKeyDown(e)} onChange={(e) => { handlerInput(e.target.value) }} value={valueInput || ''} placeholder="Bạn muốn tìm gì..." />
            <div onClick={handlerSearch} className={cx('iconSearch')}>
                <IconSearch />
            </div>

        </div>
    );
}

export default Search;