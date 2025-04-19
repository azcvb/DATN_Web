import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/PopperTippy/Popper';
import styles from './Menu.module.scss';
import Calendar from '~/pages/Admin/Component/Calendar';
import { useState } from 'react';
import { formatNumber } from '~/components/format';

const cx = classNames.bind(styles);

function Menu({ children, items = [], type = 'normal', handlerAdd, nameTag }) {
    const [inputPriceMin, setInputPriceMin] = useState(0);
    const [inputPriceMax, setInputPriceMax] = useState(0);
    const handlerChangeInputPrice = (e, type) => {
        const price = formatNumber(e);
        if (type === 'min') {
            setInputPriceMin(price);
        }
        if (type === 'max') {
            setInputPriceMax(price);
        }
    };
    const handlerHidenTippy = () => {
        // handlerAdd()
    };
    const handlerClickItem = (key, value) => {
        handlerAdd(key, value);
    };
    const renderResult = (attrs) => {
        if (type === 'price') {
            return (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        <div className={cx('menu-body')}>
                            <div className={cx('price')}>
                                <input
                                    placeholder="Giá khoảng..."
                                    value={formatNumber(inputPriceMin)}
                                    onChange={(e) => handlerChangeInputPrice(e.currentTarget.value, 'min')}
                                />
                                <span>đến</span>
                                <input
                                    placeholder="Giá khoảng..."
                                    value={formatNumber(inputPriceMax)}
                                    onChange={(e) => handlerChangeInputPrice(e.currentTarget.value, 'max')}
                                />
                            </div>
                        </div>
                    </PopperWrapper>
                </div>
            );
        }
        if (type === 'calender') {
            return (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        <div className={cx('menu-body')}>
                            <div className={cx('calender')}>
                                <Calendar />
                            </div>
                        </div>
                    </PopperWrapper>
                </div>
            );
        }
        return items.length > 0 ? (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('menu-popper')}>
                    <div className={cx('menu-body')}>
                        {items.map((value, index) => (
                            <div
                                className={cx('menu-item')}
                                key={index}
                                onClick={(e) => handlerClickItem(nameTag, e.currentTarget.textContent)}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </PopperWrapper>
            </div>
        ) : null;
    };

    return (
        <Tippy
            interactive={true}
            delay={[0, 50]}
            offset={[0, 8]}
            hideOnClick={true}
            placement="bottom"
            render={renderResult}
            onHidden={handlerHidenTippy}
            appendTo={() => document.body}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
