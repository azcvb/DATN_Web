import classNames from 'classnames/bind';
import style from './Pay.module.scss'
import { Link, useLocation } from 'react-router-dom';
import Navigation from '~/layouts/Component/Navigation';
import { useEffect, useState } from 'react';
import { formatNumber } from '~/components/format';

const cx = classNames.bind(style)
function Pay() {
    const location = useLocation().pathname;
    const [products, setProducts] = useState()
    const [infor, setInfor] = useState()
    const [sum, setSum] = useState(0)
    useEffect(() => {
        window.scroll(0, 0)
        if (sessionStorage.getItem('myInfor') && sessionStorage.getItem('cart')) {
            try {
                const infor = JSON.parse(sessionStorage.getItem('myInfor'))
                const cart = JSON.parse(sessionStorage.getItem('cart'))
                setInfor(infor)
                setProducts(cart)
            } catch (err) {
                console.log(err)
            }
        }
    }, [])
    useEffect(() => {
        if (products && products.length > 0) {
            const total = products.reduce((acc, value) => acc + value.so_luong * value.gia, 0);
            setSum(total);
        }
    }, [products]);
    return (
        <div className='container'>
            <Navigation
                path={location}
            />
            <div className={cx('content-container')}>
                <div className={cx('left')}>
                    <div className={cx('title')}>
                        Thông tin đặt hàng
                    </div>
                    <form>
                        <input className="form-control" type="text" value={infor?.ten || ""} placeholder="Họ tên người mua" required disabled />
                        <div className={cx('check-input')}>
                            <div className="form-check">
                                <input disabled className="form-check-input" type="radio" checked={infor?.kieu === "Mua sử dụng"} name="flexRadioDefault" id="flexRadioDefault3" onChange={() => { }} />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    Mua sử dụng
                                </label>
                            </div>
                            <div className="form-check">
                                <input disabled className="form-check-input" type="radio" checked={infor?.kieu === "Mua tặng"} name="flexRadioDefault" id="flexRadioDefault4" onChange={() => { }} />
                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                    Mua tặng
                                </label>
                            </div>
                        </div>
                        <input disabled value={infor?.sdt || ""} className="form-control" type="text" placeholder="Số điện thoại" required />
                        <input disabled value={infor?.dia_chi || ""} className="form-control" type="text" placeholder="Địa chỉ" required />
                        <input disabled value={infor?.email || ""} className="form-control" type="email" placeholder="Email" required />
                        <input disabled value={infor?.ngay_sinh || ""} className="form-control" type="text" placeholder="Sinh nhât (Nhập: ngày/tháng/năm)" required />
                        <input disabled value={infor?.khac || ""} className="form-control" type="text" placeholder="Ghi chú (yêu cầu khác hoặc thông tin người được tặng trong trường hợp mua sản phẩm đi tặng)" required />
                    </form>
                    <div className={cx('products')}>
                        <ul>
                            {products
                                ? products.map((value) =>
                                (<li key={value.id}>
                                    <div className={cx('name-product')}>
                                        <div className={cx('name')}>
                                            <span >
                                                {value.loai}
                                            </span>
                                            <span>{value.ten_san_pham}</span>
                                        </div>
                                        <div className={cx('code-product')}>{value.ma_san_pham}</div>
                                    </div>

                                    <div className={cx('price')}>
                                        <input type="text" disabled value={value.so_luong} className={cx('sl')} onChange={() => { }} />
                                        <div>
                                            <span>{formatNumber(value.gia)}</span>
                                            <span>₫</span>
                                        </div>
                                    </div>
                                </li>))
                                : null}

                        </ul>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('payment')}>
                        <span className={cx('title')}>
                            Thanh toán
                        </span>
                        <div className={cx('code-promotion')}>
                            <input placeholder="Mã khuyến mãi" />
                            <button>Áp dụng</button>
                        </div>
                        <div className={cx('sum-price')}>
                            <div className={cx('title')}>Tổng cộng</div>
                            <div>
                                <span>
                                    {formatNumber(sum)}
                                </span>
                                <span>VNĐ</span>
                            </div>
                        </div>
                        <div className={`mb-30 ${cx('check-input')}`}>
                            <div className={`form-check ${cx('radio')}`}>
                                <input checked className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={() => { }} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Thanh toán khi nhận hàng
                                </label>
                            </div>
                            <div className={`form-check ${cx('radio')}`}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => { }} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Thanh toán bằng mã QR
                                </label>
                            </div>
                        </div>
                        <div className={cx('btn')}>
                            <Link to='/gio-hang'>{`< Quay về giỏ hàng`}</Link>
                            <button className={cx('order')}>Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}



export default Pay;