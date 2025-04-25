import { Link, useLocation } from 'react-router-dom';

import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Navigation from '~/layouts/Component/Navigation';
import { useCookies } from 'react-cookie';
import { formatNumber, validEmail, validPhone } from '~/components/format';
import ModalMessage from '~/layouts/Component/ModalMessage';
import { getProductForCar } from '~/apiServices/Product/getProductForCar';

const cx = classNames.bind(style);
function Cart() {
    const location = useLocation().pathname;
    const formRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [listProducts, setListProducts] = useState(undefined);
    const [sum, setSum] = useState(0);
    const [cookies, setCookie] = useCookies();
    const [infor, setInfor] = useState();
    const [agree, setAgree] = useState(false);
    const [linkPay, setLinkPay] = useState('/pay');
    const [modal, setModal] = useState({
        display: 'hiden',
        status: '',
        message: '',
    });
    //set dữ liệu đầu vào
    useEffect(() => {
        window.scroll(0, 0);
        if (cookies.cart) {
            const listProduct = [];
            cookies.cart.map((value) => listProduct.push(value.id));
            async function fetch() {
                try {
                    const res = await getProductForCar(listProduct);
                    const mergedProducts = res.result.map((item, index) => ({
                        ...item,
                        so_luong: cookies.cart[index].so_luong,
                    }));
                    setListProducts(mergedProducts);
                } catch (err) {
                    console.log(err);
                }
            }
            fetch();
        }
        if (sessionStorage.getItem('myInfor')) {
            try {
                const infor = JSON.parse(sessionStorage.getItem('myInfor'));
                setInfor(infor);
            } catch (err) {
                console.log(err);
            }
        } else {
            setInfor((prev) => ({
                ...prev,
                kieu: 'Mua sử dụng',
            }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Khi thông tin listProduct thay đổi tính lại số lượng, tổng tiền, và set lại cookie cũng như session
    useEffect(() => {
        if (!Array.isArray(listProducts) || listProducts.length === 0) {
            return;
        }
        const so_luong = {};
        let sumProduct = 0;
        listProducts.forEach((value) => {
            if (value.id !== undefined && value.so_luong !== undefined) {
                so_luong[value.id] = value.so_luong;
                sumProduct += value.so_luong * value.gia;
            }
        });

        setSum(sumProduct);
        setInputValue(so_luong);
        setCookie('cart', listProducts, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        sessionStorage.setItem('cart', JSON.stringify(listProducts));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listProducts]);

    // set thông tin người dùng nhập vào để gửi qua trang thanh toáng bằng session
    useEffect(() => {
        if (infor) {
            sessionStorage.setItem('myInfor', JSON.stringify(infor));
        }
    }, [infor]);
    // xử lý thay đổi số lượng trong input
    const handleQuantityChange = (productId, quantity) => {
        setInputValue((prevState) => ({
            ...prevState,
            [productId]: quantity,
        }));
        setListProducts((prevList) =>
            prevList.map((product) => (product.id === productId ? { ...product, so_luong: quantity } : product)),
        );
    };
    // hàm set thông tin người dùng
    const handlerInfor = (key, value) => {
        setInfor((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    // xóa sản phẩm trong giỏ hàng
    const removeProduct = (productId) => {
        const updatedList = listProducts.filter((item) => item.id !== productId);
        setListProducts(updatedList);
    };
    useEffect(() => {
        setCookie('cart', listProducts, {
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        sessionStorage.setItem('cart', JSON.stringify(listProducts));
    }, [listProducts]);
    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cookies.cart));
    }, [cookies.cart]);
    // set đường link chuyển trang
    useEffect(() => {
        if (!agree) {
            setLinkPay('');
        } else {
            setLinkPay('/pay');
        }
    }, [agree]);
    //kiểm tra thông tin người dùng nhập vào
    const handlerPayment = () => {
        const form = formRef.current;
        const inputs = form.querySelectorAll('input:not([data-ignore])');
        for (let input of inputs) {
            if (!input.value.trim()) {
                setModal({
                    display: 'block',
                    status: 'warning',
                    message: 'Vui lòng nhập đầy đủ thông tin!',
                });
                return;
            }
        }

        if (!validPhone(infor.sdt)) {
            setModal({
                display: 'block',
                status: 'warning',
                message: 'Số điện thoại không chính xác!',
            });
            return;
        }
        if (!validEmail(infor.email)) {
            setModal({
                display: 'block',
                status: 'warning',
                message: 'Email không chính xác!',
            });
            return;
        }
        if (!agree) {
            setModal({
                display: 'block',
                status: 'warning',
                message: 'Đồng ý với điều khoản của chúng tôi!',
            });
            return;
        }
    };
    //Đóng mở modal
    const closeModal = () => {
        setModal({
            ...modal,
            display: 'hidden',
        });
    };
    return (
        <div className="container">
            <Navigation path={location} />
            {listProducts === undefined || listProducts.length === 0 ? (
                <div className={cx('cart-empty')}>
                    <div>Giỏ hàng trống</div>

                    <Link to={'/'}>Mua hàng</Link>
                </div>
            ) : (
                <div className={cx('content-container')}>
                    <div className={cx('left')}>
                        <div className={cx('title')}>Thông tin đặt hàng</div>
                        <form ref={formRef}>
                            <input
                                onChange={(e) => handlerInfor('ten', e.target.value)}
                                value={infor?.ten || ''}
                                className="form-control"
                                type="text"
                                placeholder="Họ tên người mua"
                                required
                            />
                            <div className={cx('check-input')}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                        value="Mua sử dụng"
                                        checked={infor.kieu === 'Mua sử dụng'}
                                        onChange={() => handlerInfor('kieu', 'Mua sử dụng')}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Mua sử dụng
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        value="Mua tặng"
                                        checked={infor.kieu === 'Mua tặng'}
                                        onChange={() => handlerInfor('kieu', 'Mua tặng')}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Mua tặng
                                    </label>
                                </div>
                            </div>
                            <input
                                onChange={(e) => handlerInfor('sdt', e.target.value)}
                                value={infor?.sdt || ''}
                                className="form-control"
                                type="text"
                                placeholder="Số điện thoại"
                                required
                            />
                            <input
                                onChange={(e) => handlerInfor('dia_chi', e.target.value)}
                                value={infor?.dia_chi || ''}
                                className="form-control"
                                type="text"
                                placeholder="Địa chỉ"
                                required
                            />
                            <input
                                onChange={(e) => handlerInfor('email', e.target.value)}
                                value={infor?.email || ''}
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                required
                            />
                            <input
                                onChange={(e) => handlerInfor('ngay_sinh', e.target.value)}
                                value={infor?.ngay_sinh || ''}
                                className="form-control"
                                type="text"
                                placeholder="Sinh nhât (Nhập: ngày/tháng/năm)"
                                required
                            />
                            <input
                                onChange={(e) => handlerInfor('khac', e.target.value)}
                                value={infor?.khac || ''}
                                className="form-control"
                                type="text"
                                placeholder="Ghi chú (yêu cầu khác hoặc thông tin người được tặng trong trường hợp mua sản phẩm đi tặng)"
                                required
                                data-ignore
                            />
                            <div>
                                <div className={cx('purchase-provisions')}>
                                    <div className={cx('title')}>Hướng Dẫn và Quy định Mua hàng Online</div>
                                    <div className={cx('content')}>
                                        <p>
                                            Xin cảm ơn Quý Khách đã đặt mua sản phẩm tại Hệ Thống Đồng hồ Duy Anh (Duy
                                            Anh Watch) - Đại lý Ủy Quyền Chính thức tại Việt Nam của các thương hiệu
                                            đồng hồ danh tiếng trên thế giới
                                            <br />
                                            <br />
                                            Vì quyền lợi của mình, Quý Khách vui lòng đọc kỹ những thông tin dưới đây để
                                            hoàn tất thủ tục đặt hàng. Duy Anh có quyền từ chối giải quyết các yêu cầu
                                            phát sinh của quý khách phát sinh do việc không đọc kỹ các thông tin này
                                            <br />
                                            <br />
                                            <strong>1. Sản phẩm</strong>
                                            <br />
                                            Duy Anh Watch chỉ kinh doanh các sản phẩm đồng hồ chính hãng chưa qua sử
                                            dụng (mới 100%), luôn đi kèm với một (01) Thẻ/Sổ/Giấy Bảo hành Quốc tế duy
                                            nhất do Nhà sản xuất cung cấp. Quý Khách cần cân nhắc kỹ lưỡng trước khi
                                            hoàn tất thủ tục. Duy Anh có quyền từ chối yêu cầu đổi trả sản phẩm hoặc
                                            hoàn trả tiền đặt hàng (trừ trường hợp có lỗi của nhà sản xuất – là các lỗi
                                            khiến đồng hồ không thể hoạt động bình thường với đầy đủ tính năng được
                                            thiết kế theo tiêu chuẩn của nhà sản xuất dù được sử dụng đúng cách). Nếu
                                            chưa chắc chắn về bất cứ thông tin nào (kích thước, màu sắc, kiểu máy, điều
                                            kiện sử dụng, tính năng, cách sử dụng), Quý Khách vui lòng liên hệ trực tiếp
                                            và yêu cầu được tư vấn, giải thích. Chúng tôi luôn sẵn lòng cung cấp mọi
                                            thông tin đầy đủ nhất có thể để Quý khách có được sự lựa chọn phù hợp nhất.
                                            <br />
                                            <br />
                                            <strong>2. Xác nhận đơn hàng</strong>
                                            <br />
                                            Sau khi nhận được yêu cầu của Quý khách chúng tôi sẽ kiểm tra và xác nhận
                                            lại tình trạng tồn kho của sản phẩm mà Quý khách chọn&nbsp;mua&nbsp;
                                            <strong>sẵn hàng</strong>&nbsp;hay&nbsp;<strong>đã hết</strong>&nbsp;trong
                                            thời gian&nbsp;sớm nhất có thể.&nbsp;Nếu thông tin họ tên Khách hàng, địa
                                            chỉ và các thông tin khác chưa rõ ràng, chúng tôi có quyền đề nghị Quý Khách
                                            cung cấp thông tin bổ sung, làm rõ để thuận lợi cho việc giao hàng đến tay
                                            Quý Khách trong thời gian sớm nhất.
                                            <br />
                                            Thời gian xác nhận: Khoảng từ 2-8h làm việc (từ 9h00 cho đến 17h00 từ Thứ
                                            Hai đến Thứ Sáu và 9h00 đến 12h00 Thứ Bảy)
                                            <br />
                                            <br />
                                            <strong>
                                                Bộ Phận Bán hàng trực tuyến nghỉ làm việc vào chiều Thứ Bảy và Chủ Nhật
                                                cùng các ngày Lễ - Tết và đôi khi gặp tình trạng quá tải. Việc liên hệ
                                                với Quý Khách có thể không thực hiện được do nguyên nhân từ sự cố của
                                                nhà mạng, điện thoại của Quý Khách trong khu vực không có sóng hoặc
                                                không hoạt động tại thời điểm đó.
                                            </strong>
                                            <br />
                                            Vậy nên, nếu Quý Khách có nhu cầu gấp vui lòng liên hệ trực tiếp
                                            Hotline&nbsp;<strong>(024) 2214.8336&nbsp;</strong>- (
                                            <strong>
                                                024) 3991.8668 (hoạt động từ 9h00 đến 21h00 tất cả các ngày trong tuần)
                                                để được hướng dẫn.&nbsp;
                                            </strong>
                                            <br />
                                            <br />
                                            <strong>3. Thanh toán</strong>
                                            <br />
                                            Nếu sản phẩm Quý khách đã chọn đang&nbsp;<strong>có sẵn</strong>, chúng tôi
                                            sẽ đề nghị Quý khách chuyển khoản tương đương&nbsp;<strong>30%</strong>
                                            &nbsp;số&nbsp;tiền theo giá bán của sản phẩm đó (với đồng hồ treo tường, để
                                            bàn và các sản phẩm có giá trị dưới 2,000,000 VND là 100%, đối với phụ kiện
                                            đồng hồ nếu sản phẩm có sẵn quý khách vui lòng chuyển trước 100%&nbsp;số
                                            tiền, các phụ kiện cần đặt hàng thì quý khách vui lòng đặt trước 50% giá trị
                                            đơn hàng) vào một trong số các tài khoản sau đây:
                                        </p>
                                        <table align="center" border="0" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img
                                                            alt=""
                                                            src="https://donghoduyanh.com/upload/images/unnamed%20(1)(8).jpg"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Công Ty TNHH Phát Triển và Thương Mại Duy Anh</strong>
                                                        <br />
                                                        Số tài khoản:&nbsp;<strong>118 000 177 111</strong>
                                                        <br />
                                                        Ngân hàng VIETINBANK - Chi nhánh Chương Dương.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p>
                                            <br />
                                            Nội dung chuyển khoản vui lòng ghi rõ Họ tên trùng với thông tin đặt hàng
                                            của Quý Khách để chúng tôi đối chiếu và tránh nhầm lẫn với khách hàng khác.
                                            Chúng tôi sẽ xác nhận lại ngay sau khi tài khoản nhận được tiền đặt hàng của
                                            quý khách.&nbsp;
                                        </p>
                                        <p>
                                            <br />
                                            <strong>Duy Anh Watch</strong>
                                            <strong>
                                                &nbsp;là&nbsp;Đại lý được Ủy quyền Chính thức&nbsp;của tất cả các thương
                                                hiệu đang kinh doanh nên toàn bộ sản phẩm đều được&nbsp;nhập khẩu chính
                                                ngạch&nbsp;từ&nbsp;hãng, được&nbsp;hãng bảo hành đầy đủ tại Việt Nam và
                                                trên Thế giới&nbsp;(Quý Khách có thể tham khảo thông tin ủy quyền trên
                                                website&nbsp;
                                                <u>
                                                    <a href="http://donghoduyanh.com/" target="_blank">
                                                        donghoduyanh.com
                                                    </a>
                                                    &nbsp;hoặc trên các web chính thức của các hãng
                                                </u>
                                                ).&nbsp;Duy Anh đảm bảo sản phẩm đến tay khách hàng là sản
                                                phẩm&nbsp;chính hãng, đúng mẫu mã, nguyên vẹn 100%. Khi nhận hàng Quý
                                                Khách vui lòng kiểm tra sản phẩm trước khi thanh toán số tiền còn lại,
                                                nếu có bất cứ vấn đề phát sinh xin vui lòng liên hệ theo số
                                                Hotline&nbsp;(024 3991 8668)&nbsp;để được hỗ trợ.
                                            </strong>
                                            <br />
                                            <br />
                                            <strong>4. Vận chuyển</strong>
                                            <br />
                                            Sau khi nhận được tiền đặt hàng, chúng tôi sẽ tiến hành giao hàng ngay cho
                                            Quý khách theo đúng địa chỉ nhận hàng yêu cầu trong Đơn Đặt Hàng (trừ khi có
                                            thỏa thuận khác). Thời gian nhận được hàng của Quý khách thường từ Một (01)
                                            đến Bốn (04) ngày tùy thuộc vào địa điểm nhận hàng (Không tính Thứ Bảy, Chủ
                                            nhật &amp; ngày Lễ, Tết).
                                            <br />
                                            &nbsp;
                                            <br />
                                            <strong>Lưu ý:</strong>
                                            <br />
                                            <strong>
                                                Duy Anh luôn cố gắng đưa sản phẩm đến tay Khách hàng sớm nhất có thể. Vì
                                                vậy, Nếu Quý khách có nhu cần nhận hàng trước một thời điểm cụ thể, vui
                                                lòng thông báo trước cho Duy Anh để được tư vấn. Duy Anh không chịu
                                                trách nhiệm về việc sản phẩm đến muộn hơn mong muốn của Quý Khách nếu
                                                không được thông báo, thỏa thuận trước vì thời gian vận chuyển phụ thuộc
                                                vào đơn vị chuyển phát cũng như các yếu tố khách quan (thời tiết, thời
                                                gian cao điểm, trục trặc trên đường…)
                                            </strong>
                                            <br />
                                            &nbsp;
                                            <br />
                                            <strong>
                                                Duy Anh luôn luôn đăng ký dịch vụ Đồng Kiểm (cho khách hàng xem sản phẩm
                                                trước khi nhận). Trong quá trình vận chuyển đường dài có xác suất hàng
                                                hóa bị hư hại (dù rất nhỏ). Quý Khách vui lòng kiểm tra kỹ tình trạng
                                                ngoại quan của sản phẩm trước khi ký nhận. Duy Anh sẽ không chịu trách
                                                nhiệm về tình trạng ngoại quan của sản phẩm sau khi Quý khách đã nhận
                                                hàng.
                                            </strong>
                                            <br />
                                            <br />
                                            Chi phí giao hàng hoàn toàn miễn phí.
                                            <br />
                                            <br />
                                            Mọi thông tin cần hỗ trợ Quý khách vui lòng liên hệ trực tiếp với số điện
                                            thoại để sau để được hỗ trợ kịp thời
                                            <br />
                                            &nbsp;
                                            <br />
                                            Hotline: (<strong>024) 3991 8668 – (024) 2214 8336</strong>
                                        </p>{' '}
                                    </div>
                                </div>
                                <div className={`form-check ${cx('agree')}`}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexCheckDefault"
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Tôi đã đọc kỹ và hoàn toàn đồng ý với quy định mua hàng ở trên
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('products')}>
                            <ul>
                                {listProducts
                                    ? listProducts.map((value) => {
                                          return (
                                              <li key={value.id}>
                                                  <img src={value.hinh_anh} alt="" />
                                                  <div className={cx('name-product')}>
                                                      <div className={cx('name')}>
                                                          <span>{value.loai}</span>
                                                          <span>{value.ten_san_pham}</span>
                                                      </div>
                                                      <div className={cx('code-product')}>{value.ma_san_pham}</div>
                                                      <button onClick={() => removeProduct(value.id)}>Xóa</button>
                                                  </div>

                                                  <div className={cx('price')}>
                                                      <input
                                                          type="text"
                                                          value={inputValue[value.id] || ''}
                                                          className={cx('sl')}
                                                          onChange={(e) =>
                                                              handleQuantityChange(value.id, e.target.value)
                                                          }
                                                      />
                                                      <div>
                                                          <span>{formatNumber(value.gia)}</span>
                                                          <span>₫</span>
                                                      </div>
                                                  </div>
                                              </li>
                                          );
                                      })
                                    : null}
                            </ul>
                        </div>
                        <div className={cx('btn')}>
                            <Link className={cx('btn-buy')}>Tiếp tuc mua hàng</Link>
                            <div className={cx('btn-agian')}>Tính lại</div>
                            <div className={cx('btn-delete')}>Xóa hết</div>
                            <Link onClick={handlerPayment} to={linkPay} className={cx('btn-pay')}>
                                Thanh toán
                            </Link>
                        </div>
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
                    </div>
                </div>
            )}
            <ModalMessage display={modal.display} status={modal.status} message={modal.message} onClose={closeModal} />
        </div>
    );
}

export default Cart;
