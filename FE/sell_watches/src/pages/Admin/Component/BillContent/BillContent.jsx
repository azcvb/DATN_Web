import React from 'react';
import style from './BillContent.module.scss';
import classNames from 'classnames/bind';
import { formatNumber } from '~/components/format';

const cx = classNames.bind(style);
const BillContent = React.forwardRef(({ item }, ref) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const dd = day < 10 ? `0${day}` : day;
    const mm = month < 10 ? `0${month}` : month;
    const totalBill = () => {
        const total = item.orderDetailResponseList.reduce(
            (acc, curr) => (acc += Number(curr.gia) * Number(curr.soLuong)),
            0,
        );
        return formatNumber(total);
    };
    return (
        <div ref={ref} style={{ padding: '20px' }}>
            <div>
                <h2>HÓA ĐƠN BÁN HÀNG</h2>
                <div className={cx('date')}>{`Ngày ${dd} Tháng ${mm} Năm ${year}`}</div>
            </div>
            <p>
                <strong>Mã hóa đơn: </strong>
                {item.maDonHang}
            </p>
            <p>
                <strong>Khách hàng: </strong>
                {item.tenKhachHang}
            </p>
            <p>
                <strong>Số điện thoại: </strong>
                {item.soDienThoai}
            </p>
            <p>
                <strong>Địa chỉ: </strong>
                {item.diaChi}
            </p>
            <p>
                <strong>Ngày: </strong>
                {item.ngay}
            </p>
            <p>
                <strong>Loại thanh toán: </strong>
                {item.loaiThanhToan}
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã sản phẩm</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Loại sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá</th>
                    </tr>
                </thead>
                <tbody>
                    {item.orderDetailResponseList && item.orderDetailResponseList.length > 0
                        ? item.orderDetailResponseList.map((value, index) => (
                              <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{value.maSanPham}</td>
                                  <td>{value.tenSanPham}</td>
                                  <td>{value.loaiSanPham}</td>
                                  <td>{value.soLuong}</td>
                                  <td>{formatNumber(value.gia)}</td>
                              </tr>
                          ))
                        : null}
                    {item.orderDetailResponseList && item.orderDetailResponseList.length > 0 ? (
                        <tr>
                            <td colSpan="5">Tổng tiền:</td>
                            <td>{totalBill()}</td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    );
});

export default BillContent;
