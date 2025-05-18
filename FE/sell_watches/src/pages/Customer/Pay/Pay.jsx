import classNames from 'classnames/bind';
import style from './Pay.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '~/layouts/Component/Navigation';
import { useEffect, useState } from 'react';
import { formatDob, formatNumber } from '~/components/format';
import { order } from '~/apiServices/Order/order';
import { payment } from '~/apiServices/Payment/payment';
import { getProductForCart } from '~/apiServices/Product/getProductForCart';

const cx = classNames.bind(style);
function Pay() {
    const location = useLocation().pathname;
    const navigator = useNavigate();
    const [products, setProducts] = useState();
    const [infor, setInfor] = useState();
    const [sum, setSum] = useState(0);
    const [typePayment, setTypePayment] = useState('Thanh toán khi nhận hàng');
    const [dataPayment, setDataPayment] = useState();
    useEffect(() => {
        window.scroll(0, 0);
        if (sessionStorage.getItem('myInfor') && sessionStorage.getItem('cart')) {
            try {
                const productIds = [];
                const infor = JSON.parse(sessionStorage.getItem('myInfor'));
                const cart = JSON.parse(sessionStorage.getItem('cart'));
                cart.map((value) => productIds.push(value.id));
                async function fetch() {
                    try {
                        const res = await getProductForCart(productIds);
                        const mergedProducts = res.result.map((item, index) => ({
                            ...item,
                            so_luong: cart[index].so_luong,
                        }));
                        setProducts(mergedProducts);
                    } catch (err) {
                        console.log(err);
                    }
                }
                fetch();
                setInfor(infor);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);
    useEffect(() => {
        if (products && products.length > 0) {
            const total = products.reduce((acc, value) => acc + value.so_luong * value.gia, 0);
            setSum(total);
        }
    }, [products]);
    useEffect(() => {
        if (infor) {
            setDataPayment({
                orderRequest: {
                    tong_gia: Number(sum),
                    muc_dich: infor.kieu,
                    khac: infor.khac === '' ? null : infor.khac,
                    loai_thanh_toan: typePayment,
                },
                customerRequest: {
                    ten_khach_hang: infor.ten,
                    email: infor.email,
                    so_dien_thoai: infor.sdt,
                    dia_chi: infor.dia_chi,
                    ngay_sinh: formatDob(infor.ngay_sinh),
                },
            });
        }
        if (products) {
            const newOrderDetails = Object.values(products).map((value) => ({
                san_pham_id: value.id,
                so_luong: Number(value.so_luong),
                gia: Number(value.gia),
            }));

            setDataPayment((prev) => ({
                ...prev,
                orderDetailRequest: newOrderDetails,
            }));
        }
    }, [products, infor, sum, typePayment]);
    const handlerIpCheck = (value) => {
        setTypePayment(value);
    };
    const handlerOrder = () => {
        if (typePayment === 'Thanh toán khi nhận hàng') {
            try {
                async function fetch() {
                    const res = await order(dataPayment);

                    if (res && res.result.order) {
                        navigator('/pay/check');
                        sessionStorage.setItem(
                            'payment',
                            JSON.stringify({
                                tong_tien: sum,
                                kieu_thanh_toan: 'Thanh toán khi nhận hàng',
                            }),
                        );
                    }
                }
                fetch();
            } catch (err) {
                console.log(err);
            }
        } else if (typePayment === 'Thanh toán online') {
            try {
                async function fetch() {
                    const resOrder = await order(dataPayment);
                    const orderId = resOrder?.result.orderId ?? '';
                    console.log(dataPayment);
                    if (orderId !== '') {
                        const resPayment = await payment(sum, orderId);
                        window.location.href = resPayment.result.url;
                        sessionStorage.setItem('payment', JSON.stringify(dataPayment));
                    }
                }
                fetch();
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <div className="container">
            <Navigation path={location} />
            {products === undefined || products.length === 0 ? (
                <div className={cx('cart-empty')}>
                    <div>Giỏ hàng trống</div>

                    <Link to={'/'}>Mua hàng</Link>
                </div>
            ) : (
                <div className={cx('content-container')}>
                    <div className={cx('left')}>
                        <div className={cx('title')}>Thông tin đặt hàng</div>
                        <form>
                            <input
                                className="form-control"
                                type="text"
                                value={infor?.ten || ''}
                                placeholder="Họ tên người mua"
                                required
                                disabled
                            />
                            <div className={cx('check-input')}>
                                <div className="form-check">
                                    <input
                                        disabled
                                        className="form-check-input"
                                        type="radio"
                                        checked={infor?.kieu === 'Mua sử dụng'}
                                        name="flexRadioDefault"
                                        id="flexRadioDefault3"
                                        onChange={() => {}}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        Mua sử dụng
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        disabled
                                        className="form-check-input"
                                        type="radio"
                                        checked={infor?.kieu === 'Mua tặng'}
                                        name="flexRadioDefault"
                                        id="flexRadioDefault4"
                                        onChange={() => {}}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                        Mua tặng
                                    </label>
                                </div>
                            </div>
                            <input
                                disabled
                                value={infor?.sdt || ''}
                                className="form-control"
                                type="text"
                                placeholder="Số điện thoại"
                                required
                            />
                            <input
                                disabled
                                value={infor?.dia_chi || ''}
                                className="form-control"
                                type="text"
                                placeholder="Địa chỉ"
                                required
                            />
                            <input
                                disabled
                                value={infor?.email || ''}
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                required
                            />
                            <input
                                disabled
                                value={infor?.ngay_sinh || ''}
                                className="form-control"
                                type="text"
                                placeholder="Sinh nhât (Nhập: ngày/tháng/năm)"
                                required
                            />
                            <input
                                disabled
                                value={infor?.khac || ''}
                                className="form-control"
                                type="text"
                                placeholder="Ghi chú (yêu cầu khác hoặc thông tin người được tặng trong trường hợp mua sản phẩm đi tặng)"
                                required
                            />
                        </form>
                        <div className={cx('products')}>
                            <ul>
                                {products
                                    ? products.map((value) => (
                                          <li key={value.id}>
                                              <div className={cx('name-product')}>
                                                  <div className={cx('name')}>
                                                      <span>{value.loai}</span>
                                                      <span>{value.ten_san_pham}</span>
                                                  </div>
                                                  <div className={cx('code-product')}>{value.ma_san_pham}</div>
                                              </div>

                                              <div className={cx('price')}>
                                                  <input
                                                      type="text"
                                                      disabled
                                                      value={value.so_luong}
                                                      className={cx('sl')}
                                                      onChange={() => {}}
                                                  />
                                                  <div>
                                                      <span>{formatNumber(value.gia)}</span>
                                                      <span>₫</span>
                                                  </div>
                                              </div>
                                          </li>
                                      ))
                                    : null}
                            </ul>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('payment')}>
                            <span className={cx('title')}>Thanh toán</span>
                            <div className={cx('code-promotion')}>
                                <input placeholder="Mã khuyến mãi" />
                                <button>Áp dụng</button>
                            </div>
                            <div className={cx('sum-price')}>
                                <div className={cx('title')}>Tổng cộng</div>
                                <div>
                                    <span>{formatNumber(sum)}</span>
                                    <span>VNĐ</span>
                                </div>
                            </div>
                            <div className={`mb-30 ${cx('check-input')}`}>
                                <div className={`form-check ${cx('radio')}`}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault7"
                                        value="Thanh toán khi nhận hàng"
                                        checked={typePayment === 'Thanh toán khi nhận hàng'}
                                        onChange={(e) => handlerIpCheck(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault7">
                                        Thanh toán khi nhận hàng
                                    </label>
                                </div>
                                <div className={`form-check ${cx('radio')}`}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault8"
                                        value="Thanh toán online"
                                        checked={typePayment === 'Thanh toán online'}
                                        onChange={(e) => handlerIpCheck(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault8">
                                        Thanh toán online
                                    </label>
                                </div>
                            </div>
                            <div className={cx('btn')}>
                                <Link to="/gio-hang">{`< Quay về giỏ hàng`}</Link>
                                <button
                                    onClick={() => {
                                        handlerOrder();
                                    }}
                                    className={cx('order')}
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pay;
