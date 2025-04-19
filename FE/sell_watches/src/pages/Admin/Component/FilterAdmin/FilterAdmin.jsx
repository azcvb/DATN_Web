import classNames from 'classnames/bind';
import style from './FilterAdmin.module.scss';
import { IconSearch, IconSortDown } from '~/components/icon';
import { useEffect, useState } from 'react';
import Menu from '~/components/PopperTippy/Popper/Menu';

const cx = classNames.bind(style);
function FilterAdmin({ items, handlerFilter }) {
    const [valueInput, setValueInput] = useState('');
    const handlerInput = (e) => {
        setValueInput(e);
    };
    useEffect(() => {
        if (valueInput === '') {
            handlerFilter(null, valueInput);
        }
    }, [valueInput]);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handlerFilter(null, valueInput);
        }
    };
    const [filterTag, setFilterTag] = useState([]);
    const handlerItemFill = (value, index) => {
        if (value.item === 'price') {
            return (
                <Menu key={index} type={value.item} handlerAdd={handlerFilter}>
                    <li>
                        <span>Giá</span>
                        <IconSortDown />
                    </li>
                </Menu>
            );
        }
        if (value.item === 'calender') {
            return (
                <Menu key={index} type={value.item} handlerAdd={handlerFilter}>
                    <li>
                        <span>{value.name}</span>
                        <IconSortDown />
                    </li>
                </Menu>
            );
        }
        return (
            <Menu items={value.item} key={index} handlerAdd={handlerFilter} nameTag={value.name}>
                <li>
                    <span>{value.name}</span>
                    <IconSortDown />
                </li>
            </Menu>
        );
    };
    useEffect(() => {
        handlerFilter((prev) => ({
            ...prev,
        }));
    }, [filterTag]);
    return (
        <div className={cx('filterAdmin')}>
            <div className={cx('title')}>Tất cả sản phẩm</div>
            <div className={cx('content')}>
                <div className={cx('filter')}>
                    <div className={cx('search')}>
                        <input
                            onChange={(e) => {
                                handlerInput(e.target.value);
                            }}
                            value={valueInput || ''}
                            placeholder="Bạn muốn tìm gì..."
                            onKeyDown={handleKeyDown}
                        />
                        <div className={cx('iconSearch')}>
                            <IconSearch />
                        </div>
                    </div>
                    <div className={cx('type-filter')}>
                        <ul>{items.map((value, index) => handlerItemFill(value, index))}</ul>
                    </div>
                </div>
                <div className={cx('filter-tag')}>
                    {filterTag.length > 0 ? (
                        <ul>
                            {filterTag.map((value, index) => {
                                return <li key={index}>{value}</li>;
                            })}
                            <li className={cx('delete-all')}>Xóa hết</li>
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default FilterAdmin;
