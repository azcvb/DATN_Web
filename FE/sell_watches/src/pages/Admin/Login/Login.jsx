import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postLogin } from '~/apiServices/Authentication/postLogin';
import ModalMessage from '~/layouts/Component/ModalMessage';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(style);
function Login() {
    const [modalMessage, setModalMessage] = useState({
        status: '',
        message: '',
        display: 'hiden',
    });
    const [cookies, setCookie, removeCookie] = useCookies();
    const location = useNavigate();
    const handlerLogin = (e) => {
        e.preventDefault();
        const tenTaiKhoan = e.target.tenTaiKhoan.value;
        const matKhau = e.target.matKhau.value;
        const dataLogin = {
            tenTaiKhoan,
            matKhau,
        };
        (async () => {
            try {
                const res = await postLogin(dataLogin);
                if (res?.code === 1008 || res?.code === 1005) {
                    return setModalMessage({
                        status: 'error',
                        message: 'Tài khoản hoặc mật khẩu không chính xác!',
                        display: 'block',
                    });
                }
                if (res?.result?.authenticated && res) {
                    setCookie('token', res.result.token, {
                        path: '/',
                        maxAge: 60 * 60 * 24,
                    });
                    location(res.result.localtion);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    };
    const handlerClose = () => {
        setModalMessage((prev) => ({
            ...prev,
            display: 'hiden',
        }));
    };
    return (
        <div className={cx('login')}>
            <div className={`container ${cx('login-container')}`}>
                <div className={cx('logo')}>
                    <img src="https://i.imgur.com/2EdhZMd.png" alt="" />
                </div>
                <div className={cx('title')}>Đăng nhập</div>
                <form onSubmit={handlerLogin}>
                    <div className={`mb-3  ${cx('username')}`}>
                        <label htmlFor="exampleFormControlInput1" className={`form-label`}>
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Số điện thoại"
                            name="tenTaiKhoan"
                            required
                        />
                    </div>
                    <div className={`mb-3  ${cx('password')}`}>
                        <label htmlFor="exampleFormControlInput1" className={`form-label`}>
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Mật khẩu"
                            name="matKhau"
                            required
                        />
                        <Link htmlFor="exampleFormControlInput1" className={`form-label`}>
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="flexBoxColumCenter">
                        <button className={cx('btn')} type="submit">
                            Đăng nhập
                        </button>
                        <div className={cx('create-acc')}>
                            <span>Bạn chưa có tài khoản?</span>
                            <Link to={'/register'}>Tạo tài khoản mới</Link>
                        </div>
                    </div>
                </form>
            </div>
            <ModalMessage
                display={modalMessage?.display}
                status={modalMessage?.status}
                message={modalMessage?.message}
                onClose={handlerClose}
            />
        </div>
    );
}

export default Login;
