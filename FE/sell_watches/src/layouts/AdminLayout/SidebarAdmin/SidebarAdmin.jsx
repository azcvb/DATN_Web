import classNames from 'classnames/bind';
import style from './SidebarAdmin.module.scss';
import {
    IconBrush,
    IconCart,
    IconChartPie,
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
                    <Link to="/admin/thong-ke">
                        <IconChartPie />
                        <span>Thống kê</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/san-pham">
                        <IconStore />
                        <span>Sản phẩm</span>
                    </Link>
                    {/* <ul className={cx('chidrent')}>
                        <li>
                            <Link to="/admin/danh-gia">
                                <IconStart />
                                <span>Đánh giá</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/khieu-nai">
                                <IconFlag />
                                <span>Khiếu nại</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/khuyen-mai">
                                <IconTag />
                                <span>Khuyến mãi</span>
                            </Link>
                        </li>
                    </ul> */}
                </li>
                <li>
                    <Link to="/admin/thanh-toan">
                        <IconCreditCard />
                        <span>Thanh toán</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/don-hang">
                        <IconTruck />
                        <span>Đơn hàng</span>
                    </Link>
                </li>
                {/* <li>
                    <Link to="/admin/van-chuyen">
                        <IconCart />
                        <span>Vận chuyển</span>
                    </Link>
                </li> */}
                {/* <li>
                    <Link to="/admin/kho-hang">
                        <IconWarehouse />
                        <span>Kho hàng</span>
                    </Link>
                </li> */}
                {/* <li>
                    <Link to="/admin/nhan-vien">
                        <IconUser />
                        <span>Nhân viên</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/khach-hang">
                        <IconUser />
                        <span>Khách hàng</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/tuy-chinh-trang">
                        <IconBrush />
                        <span>Tùy chỉnh trang</span>
                    </Link>
                </li> */}
            </ul>
        </div>
    );
}

export default SidebarAdmin;
