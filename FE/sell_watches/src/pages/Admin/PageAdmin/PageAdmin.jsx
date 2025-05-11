import classNames from 'classnames/bind';
import style from './PageAdmin.module.scss';
import HeaderAdmin from '~/layouts/AdminLayout/HeaderAdmin/HeaderAdmin';
import SidebarAdmin from '~/layouts/AdminLayout/SidebarAdmin';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { postIntrospect } from '~/apiServices/Authentication/postIntrospect';
import Loading from '~/pages/Customer/Loading';

const cx = classNames.bind(style);
function PageAdmin({ children }) {
    const [cookies, setCookies] = useCookies();
    const location = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        try {
            const token = cookies.token;
            if (!token || token === '') {
                return location('/login');
            }
            (async () => {
                try {
                    const res = await postIntrospect(token);
                    if (res.result.role !== 'ADMIN') {
                        return location('/login');
                    }
                    setIsLoading(true);
                } catch (err) {
                    console.log(err);
                }
            })();
        } catch {
            return location('/login');
        }
    }, []);

    return (
        <div className={cx('pageAdmin')}>
            {isLoading ? (
                <>
                    <HeaderAdmin />
                    <div className={cx('body')}>
                        <SidebarAdmin />
                        <div className={cx('children')}>{children}</div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default PageAdmin;
