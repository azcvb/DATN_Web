import classNames from 'classnames/bind';
import style from './HeaderAdmin.module.scss';
import Search from '~/components/Search';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
function HeaderAdmin() {
    return (
        <div className={cx('header')}>
            <img src="https://donghoduyanh.com/images/config/logo-da_1726290561.png.webp" alt="logo" />
            {/* <div className={cx('search')}>
                <Search />
            </div> */}

            <div className={cx('user')}>
                <Link to={'/'}>Xem webside</Link>
                <div>
                    <img src="" alt="" />
                    <span>admin</span>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;
