import classNames from 'classnames/bind';
import style from './SidebarAdmin.module.scss';
import {
    IconBrush,
    IconCart,
    IconCreditCard,
    IconFlag,
    IconHome,
    IconStart,
    IconStore,
    IconTag,
    IconTruck,
    IconUser,
    IconWarehouse,
} from '~/components/icon';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function SidebarAdmin() {
    return (
        <div className={cx('sidebar')}>
            <ul>
                <li>
                    <Link to="/admin/trang-chu">
                        <IconHome />
                        <span>Trang chủ</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/san-pham">
                        <IconStore />
                        <span>Sản phẩm</span>
                    </Link>
                    <ul className={cx('chidrent')}>
                        <li>
                            <Link to="/admin/">
                                <IconStart />
                                <span>Đánh giá</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/">
                                <IconFlag />
                                <span>Khiếu nại</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/">
                                <IconTag />
                                <span>Khuyến mãi</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/admin/">
                        <IconCreditCard />
                        <span>Thanh toán</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/">
                        <IconTruck />
                        <span>Đơn hàng</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/">
                        <IconCart />
                        <span>Vận chuyển</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/">
                        <IconWarehouse />
                        <span>Kho hàng</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/">
                        <IconUser />
                        <span>Nhân viên</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/">
                        <IconUser />
                        <span>Khách hàng</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/">
                        <IconBrush />
                        <span>Tùy chỉnh trang</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarAdmin;
