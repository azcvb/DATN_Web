import classNames from 'classnames/bind';
import style from './Menu.module.scss'
import { IconHome } from '~/components/icon';
import { Link } from 'react-router-dom';
import { listTrademark } from '~/assets';
import { useRef, useState } from 'react';
import TippyMenu from '~/components/PopperTippy/TippyMenu';
import { listClock, listOther, listStrap, listWatch } from '~/data';

const cx = classNames.bind(style)
function MainMenu() {
    const [isVisible, setIsVisible] = useState(false)
    const [contentMenu, setContentMenu] = useState()
    const tooltipRef = useRef(null);
    const triggerRef = useRef(null);

    const handleMouseEnter = (value, isValue) => {
        if (isValue) {
            setContentMenu(value)
        }
        setIsVisible(true)
    }
    const handleMouseLeave = (e) => {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !(relatedTarget instanceof Node)) {
            setIsVisible(false);
            return;
        }
        if (
            !triggerRef.current?.contains(relatedTarget) &&
            !tooltipRef.current?.contains(relatedTarget)
        ) {
            setIsVisible(false);
        }
    }

    return (
        <div className={`${cx('menu')}`}>
            <div className='container'>
                <ul className={cx('ul_menu')}>
                    <li className={cx('select')}><Link to={'/'}><IconHome /></Link></li>
                    <li
                        ref={triggerRef}
                        onMouseEnter={() => handleMouseEnter(listTrademark, true)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to='/tran'>Thương hiệu</Link>

                    </li>
                    <li
                        className={cx('li-hover')}
                        ref={triggerRef}
                        onMouseEnter={() => handleMouseEnter(listWatch, true)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link>Đồng hồ nam</Link>
                    </li>
                    <li
                        ref={triggerRef}
                        onMouseEnter={() => handleMouseEnter(listWatch, true)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link>Đồng hồ nữ</Link>
                    </li>
                    <li
                        ref={triggerRef}
                        onMouseEnter={() => handleMouseEnter(listWatch, true)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link>Đồng hồ đôi</Link>
                    </li>
                    <li
                        ref={triggerRef}
                        onMouseEnter={() => handleMouseEnter(listClock, true)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link>Đồng hồ treo tường</Link>
                    </li>
                    <li
                        ref={triggerRef}
                        onMouseEnter={() => handleMouseEnter(listStrap, true)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link>Dây đồng hồ</Link>
                    </li>
                    <li
                        ref={triggerRef}
                        onMouseEnter={() => handleMouseEnter(listOther, true)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link>Sản phẩm khác</Link>
                    </li>
                    <li>
                        <Link>Sửa đồng hồ</Link>
                    </li>
                    {isVisible ? (
                        <TippyMenu
                            content={contentMenu}
                            ref={tooltipRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />) : null}

                </ul>
            </div>

        </div>
    );
}

export default MainMenu;