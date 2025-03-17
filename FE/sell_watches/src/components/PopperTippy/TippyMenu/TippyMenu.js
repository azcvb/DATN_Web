import React from 'react';
import classNames from 'classnames/bind';
import style from './TippyMenu.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const TippyMenu = React.forwardRef(({ content, onMouseEnter, onMouseLeave }, ref) => {
    const validUrl = (urlValue) => {
        urlValue = urlValue.toLowerCase();
        urlValue = urlValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        urlValue = urlValue.replace(/[()\\{}]/g, "");
        urlValue = urlValue.split(" ").join("-");
        return urlValue;
    }
    return (
        <div
            ref={ref}
            className={`wrapper ${cx('tippyMenu')}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {content['image'] ? (
                <div className={cx("tippyMenu_container")}>
                    {Object.values(content).map((value, index) => {
                        if (!!value && typeof value === "string") {
                            return (
                                <div className={cx('menuItem_img')} key={index}>
                                    <Link><img src={value} alt='' /></Link>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            ) : (<div className={cx("tippyMenu_container")}>
                {Object.keys(content).map((value, index) => {
                    if (!!value && index !== 0) {
                        return (
                            <div key={index} className={cx('menuItem_list')}>
                                <p>
                                    {value}
                                </p>
                                <div className='line-90'></div>
                                <div className={cx("menuItem_item")}>
                                    {content[value].map((valueArr, indexArr) => {
                                        return (
                                            <p key={indexArr}>
                                                <Link to={validUrl(valueArr)}>{valueArr}</Link>
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                    return null
                })}
            </div>)}
        </div>
    );
});

export default TippyMenu;
