import classNames from 'classnames/bind';
import style from './ModalMessage.module.scss';
import { IconError, IconInfor, IconWarning } from '~/components/icon';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
function ModalMessage({ display, status, message, onClose }) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        switch (status) {
            case 'infor':
                setTitle('Thông báo!');
                break;
            case 'error':
                setTitle('Xảy ra lỗi!');
                break;
            case 'warning':
                setTitle('Cảnh báo!');
                break;
            case 'success':
                setTitle('Thành công!');
                break;
            default:
                setTitle('');
        }
    }, [status]);

    return (
        <div className={`modal ${display}`} tabIndex="-1">
            <div className={`modal-dialog modal-dialog-centered ${cx('container-modal', status)}`}>
                <div className="modal-content">
                    <div className={`modal-header ${cx('header')}`}>
                        {status === 'warning' ? <IconWarning /> : status === 'error' ? <IconError /> : <IconInfor />}
                        <h5 className="modal-title">{title}</h5>
                        <button
                            onClick={onClose}
                            type="button"
                            className={`btn-close ${cx('close')}`}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className={`modal-body ${cx('body')}`}>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalMessage;
