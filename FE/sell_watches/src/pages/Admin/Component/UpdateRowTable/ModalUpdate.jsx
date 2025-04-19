import classNames from 'classnames/bind';
import style from './ModalUpdate.module.scss';
import { useEffect, useState } from 'react';
import { formatFilterValue, formatNumber } from '~/components/format';

const cx = classNames.bind(style);
function ModalAdd({ isVisibale, onClose, item, handlerButton, handlerDataUpdate, inputUpdate }) {
    const [imgUrl, setImgUrl] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    useEffect(() => {
        if (inputUpdate?.gia) {
            setInputPrice(formatNumber(inputUpdate.gia));
        }

        if (inputUpdate?.hinhAnh) {
            setImgUrl(inputUpdate.hinhAnh);
        }
    }, [inputUpdate]);
    useEffect(() => {
        if (!isVisibale) {
            setImgUrl('');
            return;
        }
    }, [isVisibale]);
    const handleChange = (e) => {
        setImgUrl(e.target.value);
    };
    const handlerSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.id = inputUpdate.id;
        handlerDataUpdate(data);
        onClose();
        handlerButton(true);
    };
    const handlerInputPrice = (e) => {
        const numericValue = e.replace(/[^0-9]/g, '');

        if (numericValue === '') {
            setInputPrice('');
            return;
        }

        if (!isNaN(numericValue)) {
            const price = formatNumber(Number(numericValue));
            setInputPrice(price);
        }
    };
    const handlerChangeInput = (value, key) => {
        handlerDataUpdate((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const handleItem = (value, index) => {
        if (value && typeof input !== 'string' && !Array.isArray(value) && value.type) {
            if (value.type === 'dropBox') {
                const nameKey = formatFilterValue(value.name);
                return (
                    <div key={index} className={cx('drop-box')}>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name={nameKey}
                            defaultValue={inputUpdate.nameKey}
                            required
                        >
                            <option value="" disabled>
                                {value.name}
                            </option>
                            {value.drop.map((value, index) => (
                                <option value={value} key={index}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }
            if (value.type === 'row') {
                return (
                    <div key={index} className={cx('row')}>
                        {value.itemRow.map((valueRow, indexRow) =>
                            valueRow === 'Giá' ? (
                                <div className="mb-3" key={indexRow}>
                                    <label className="form-label">{valueRow}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={formatFilterValue(valueRow)}
                                        required
                                        value={inputPrice}
                                        onChange={(e) => handlerInputPrice(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="mb-3" key={indexRow}>
                                    <label className="form-label">{valueRow}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={formatFilterValue(valueRow)}
                                        value={inputUpdate[formatFilterValue(valueRow)] || ''}
                                        onChange={(e) => handlerChangeInput(e.target.value, e.target.name)}
                                        required
                                    />
                                </div>
                            ),
                        )}
                    </div>
                );
            }
            if (value.type === 'bigSize') {
                return (
                    <div className="mb-3" key={index}>
                        <label forhtml="exampleFormControlTextarea1" className="form-label">
                            {value.name}
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name={formatFilterValue(value.name)}
                            value={inputUpdate[formatFilterValue(value.name)] || ''}
                            onChange={(e) => handlerChangeInput(e.target.value, e.target.name)}
                            required
                        ></textarea>
                    </div>
                );
            }
            if (value.type === 'img') {
                return (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Nhập đường dẫn hình ảnh"
                            value={imgUrl}
                            onChange={handleChange}
                            style={{ width: '100%', marginBottom: '10px' }}
                            name={formatFilterValue(value.name)}
                            required
                        />
                        {imgUrl && (
                            <img
                                src={imgUrl}
                                alt="Preview"
                                style={{ width: 200, height: 'auto', border: '1px solid #ccc' }}
                            />
                        )}
                    </div>
                );
            }
        }

        return (
            <div key={index}>
                <div className="mb-3">
                    <label className="form-label">{value}</label>
                    <input
                        type="text"
                        className="form-control"
                        name={formatFilterValue(value)}
                        value={inputUpdate[formatFilterValue(value)] || ''}
                        onChange={(e) => handlerChangeInput(e.target.value, e.target.name)}
                        required
                    />
                </div>
            </div>
        );
    };

    return (
        <div
            className={`modal fade ${isVisibale ? 'show d-block' : ''}`}
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered flexCenter">
                <div className={`modal-content ${cx('modal-custom')}`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {Object.keys(item).length > 0 ? item.title : null}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <form onSubmit={handlerSubmit}>
                        <div className="modal-body">
                            {Object.keys(item).length > 0
                                ? item.input.map((value, index) => handleItem(value, index))
                                : null}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onClose}
                            >
                                Đóng
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalAdd;
