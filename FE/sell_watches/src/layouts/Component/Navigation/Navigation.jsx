import classNames from 'classnames/bind';
import style from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import { formatLink, formatUrlToLink } from '~/components/format';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
function Navigation({ path }) {
    const [navigation, setNavigation] = useState();
    useEffect(() => {
        setNavigation(formatUrlToLink(path));
    }, [path]);
    const name = {
        search: 'tim kiem',
        cart: 'gio hang',
    };
    const vaidName = (value) => {
        if (value && name[value]) {
            value = name[value];
        }
        if (value.length > 15) {
            return;
        }
        return value;
    };
    return (
        <div className={cx('navigation')}>
            <Link to="/">trang chu</Link>
            {navigation !== undefined &&
                navigation.map((value, index) => (
                    <Link key={index} to={formatLink(value)}>
                        {vaidName(value)}
                    </Link>
                ))}
        </div>
    );
}

export default Navigation;
