import classNames from 'classnames/bind';
import style from './PageAdmin.module.scss';
import HeaderAdmin from '~/layouts/AdminLayout/HeaderAdmin/HeaderAdmin';
import SidebarAdmin from '~/layouts/AdminLayout/SidebarAdmin';

const cx = classNames.bind(style);
function PageAdmin({ children }) {
    return (
        <div className={cx('pageAdmin')}>
            <HeaderAdmin />
            <div className={cx('body')}>
                <SidebarAdmin />
                <div className={cx('children')}>{children}</div>
            </div>
        </div>
    );
}

export default PageAdmin;
