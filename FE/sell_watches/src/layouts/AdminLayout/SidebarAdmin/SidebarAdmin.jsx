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

const cx = classNames.bind(style);
function SidebarAdmin() {
    return (
        <div className={cx('sidebar')}>
            <ul>
                <li>
                    <div>
                        <IconHome />
                        <span>Trang chủ</span>
                    </div>
                </li>
                <li>
                    <div>
                        <IconStore />
                        <span>Sản phẩm</span>
                    </div>
                    <ul className={cx('chidrent')}>
                        <li>
                            <div>
                                <IconStart />
                                <span>Đánh giá</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <IconFlag />
                                <span>Khiếu nại</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <IconTag />
                                <span>Khuyến mãi</span>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div>
                        <IconCreditCard />
                        <span>Thanh toán</span>
                    </div>
                </li>
                <li>
                    <div>
                        <IconTruck />
                        <span>Đơn hàng</span>
                    </div>
                </li>
                <li>
                    <div>
                        <IconCart />
                        <span>Vận chuyển</span>
                    </div>
                </li>
                <li>
                    <div>
                        <IconWarehouse />
                        <span>Kho hàng</span>
                    </div>
                </li>
                <li>
                    <div>
                        <IconUser />
                        <span>Nhân viên</span>
                    </div>
                </li>
                <li>
                    <div>
                        <IconUser />
                        <span>Khách hàng</span>
                    </div>
                </li>
                <li>
                    <div>
                        <IconBrush />
                        <span>Tùy chỉnh trang</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default SidebarAdmin;
