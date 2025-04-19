import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { paymentReturn } from '~/apiServices/Payment/paymentReturn';
import { IconError, IconSuccess, IconWarning } from '~/components/icon';
import style from './PaymentCheck.module.scss';
import { Link } from 'react-router-dom';
import { formatNumber } from '~/components/format';
import { order } from '~/apiServices/Order/order';
import { Cookies, useCookies } from 'react-cookie';

const cx = classNames.bind(style);
function PaymentCheck() {
    const queryString = window.location.search;
    const [result, setResult] = useState({
        status: '',
        message: '',
        ma_giao_dich: '',
        tong_tien: '',
        kieu_thanh_toan: '',
    });
    const [dataPayment, setDataPayment] = useState();
    const [cookies, setCookie, removeCookie] = useCookies();
    useEffect(() => {
        if (sessionStorage.getItem('payment')) {
            setDataPayment(JSON.parse(sessionStorage.getItem('payment')));
        }
    }, []);
    useEffect(() => {
        if (paymentReturn) {
            async function fetch() {
                try {
                    if (dataPayment && dataPayment.kieu_thanh_toan === 'Thanh toán khi nhận hàng') {
                        setResult({
                            status: 'success',
                            message: 'Đặt đơn hàng thành công',
                            ma_giao_dich: '',
                            tong_tien: dataPayment.tong_tien * 100,
                            kieu_thanh_toan: dataPayment.kieu_thanh_toan,
                        });
                    } else if (dataPayment) {
                        const res = await paymentReturn(queryString);
                        setResult({
                            status: res.result.status,
                            message: res.result.message,
                            ma_giao_dich: res.result.orderId,
                            tong_tien: res.result.amount,
                            kieu_thanh_toan: res.result.typePay,
                        });
                        if (res.result.message === 'Giao dịch thất bại!') {
                            setResult({
                                status: 'error',
                                message: res.result.message,
                                ma_giao_dich: '',
                                tong_tien: '',
                                kieu_thanh_toan: '',
                            });
                        }
                        if (res.result.status === 'error') {
                            setResult({
                                status: 'warning',
                                message: res.result.message,
                                ma_giao_dich: '',
                                tong_tien: '',
                                kieu_thanh_toan: '',
                            });
                        }
                        if (res.result.status && res.result.status === 'success') {
                            await order(dataPayment);
                        }
                    }
                    sessionStorage.removeItem('myInfor');
                    sessionStorage.removeItem('payment');
                    sessionStorage.removeItem('cart');
                    removeCookie('cart', { path: '/' });
                } catch (err) {
                    console.log(err);
                }
            }
            fetch();
        }
    }, [dataPayment, queryString, removeCookie]);
    return (
        <div className={cx('container')}>
            <div className={cx(result.status)}>
                {result.status === 'success' ? (
                    <div>
                        <IconSuccess />
                    </div>
                ) : result.message !== 'Chữ ký không hợp lệ' ? (
                    <IconError />
                ) : (
                    <IconWarning />
                )}
                <div className={cx('title')}>{result.message}</div>
                <div>
                    <ul>
                        {result.ma_giao_dich !== '' ? (
                            <li>
                                <span className={cx('left')}>Mã giao dịch:</span>
                                <span>{result.ma_giao_dich}</span>
                            </li>
                        ) : null}
                        {result.tong_tien !== '' ? (
                            <li>
                                <span className={cx('left')}>Tổng tiền:</span>
                                <span>
                                    <span>{formatNumber(Number(result.tong_tien) / 100)}</span>
                                    <span>VND</span>
                                </span>
                            </li>
                        ) : null}
                        {result.kieu_thanh_toan !== '' ? (
                            <li>
                                <span className={cx('left')}>Kiểu thanh toán:</span>
                                <span>{result.kieu_thanh_toan}</span>
                            </li>
                        ) : null}
                    </ul>
                    <Link to="/">{`< Quay về trang chủ`}</Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentCheck;
