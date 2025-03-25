import classNames from 'classnames/bind';
import style from './Navigation.module.scss'
import { Link } from 'react-router-dom';
import { formatLink, formatUrlToLink } from '~/components/format';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style)
function Navigation({
    path
}) {
    const [navigation, setNavigation] = useState();
    useEffect(() => {
        setNavigation(formatUrlToLink(path))

    }, [path])
    return (
        <div className={cx('navigation')}>
            <Link to='/'>trang chu</Link>
            {navigation !== undefined &&
                navigation.map((value, index) => (
                    <Link key={index} to={formatLink(value)}>
                        {value}
                    </Link>
                ))}
        </div>
    );
}

export default Navigation;