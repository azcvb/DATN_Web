import Search from '~/components/Search';
import style from './Header.module.scss'
import classNames from 'classnames/bind';
import { IconAddress, IconCart, IconPhoneHeader, IconUser } from '~/components/icon/icon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(style)
function Header() {
    const [cart, setCart] = useState({});
    const [cookies] = useCookies();
    useEffect(() => {
        setCart(cookies.cart)
    }, [cookies.cart])

    return (
        <div className={cx('header')}>
            <div className={`container ${cx('header_')}`}>
                <div className={cx("logo")}><img src='https://donghoduyanh.com/images/config/logo-da_1726290561.png.webp' alt=''></img></div>
                <div className={cx('rightHeader')}>
                    <div className={cx('search')}>
                        <Search />
                    </div>
                    <div className={cx('shop')}>
                        <div className={cx('phone')}>
                            <div className={cx('iconPhone')}>
                                <IconPhoneHeader />
                            </div>
                            <div>
                                <div>Gọi ngay</div>
                                <Link>036.7860.614</Link>
                            </div>
                        </div>
                        <Link className={cx('address')}>
                            <IconAddress />
                        </Link>
                        <Link to={'/gio-hang'} className={cx('cart')}>
                            <IconCart />
                            <div className={cx('quantity')}>{cart ? cart.length : "0"}</div>
                        </Link>
                        <div className={`hiden ${cx('user')}`}>
                            <IconUser />
                            <span>datcongh43</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;