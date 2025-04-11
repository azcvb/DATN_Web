import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function Login() {
    return (
        <div className={cx('login')}>
            <div className={`container ${cx('login-container')}`}>
                <div className={cx('logo')}>
                    <img src="https://i.imgur.com/2EdhZMd.png" alt="" />
                </div>
                <div className={cx('title')}>Đăng nhập</div>
                <div className={`mb-3  ${cx('username')}`}>
                    <label htmlFor="exampleFormControlInput1" className={`form-label`}>
                        Tài khoản
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Tên đăng nhập"
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
                    />
                    <Link htmlFor="exampleFormControlInput1" className={`form-label`}>
                        Quên mật khẩu?
                    </Link>
                </div>
                <div className="flexBoxColumCenter">
                    <button className={cx('btn')}>Đăng nhập</button>
                    <div className={cx('create-acc')}>
                        <span>Bạn chưa có tài khoản?</span>
                        <Link>Tạo tài khoản mới</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
