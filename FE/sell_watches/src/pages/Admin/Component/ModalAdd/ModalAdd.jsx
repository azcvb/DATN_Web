import classNames from 'classnames/bind';
import style from './ModalAdd.module.scss';
import { useEffect, useState } from 'react';
import { formatFilterValue, formatNumber } from '~/components/format';
const cx = classNames.bind(style);
function ModalAdd({ isVisibale, onClose, item, handlerButton, valueItem }) {
    const [imgUrl, setImgUrl] = useState('');
    const [inputPrice, setInputPrice] = useState({});
    const [inputItem, setInputItem] = useState({});
    const [itemModal, setItemModal] = useState(item);
    const [sumItem, setSumItem] = useState({});
    useEffect(() => {
        if (!itemModal?.input?.length) return;

        const initPrice = {};

        const processPrice = (name, group, idx, isSum) => {
            const baseKey = formatFilterValue(name) + idx;
            const finalKey = isSum ? 'sum' : baseKey;
            const groupKey = group ? `${group}.${baseKey}` : baseKey;
            const key = isSum ? 'sum' : groupKey;
            if (valueItem?.[finalKey] != null) {
                const num = Number(String(valueItem[finalKey]).replace(/[^0-9]/g, '')) || 0;
                initPrice[key] = formatNumber(num);
                return;
            }

            const raw = inputPrice?.[finalKey];
            if (raw != null) {
                const num = Number(String(raw).replace(/[^0-9]/g, '')) || 0;
                initPrice[key] = formatNumber(num);
            } else {
                initPrice[key] = '';
            }
        };

        itemModal.input.forEach((field, idx) => {
            if (field.type === 'row') {
                (field.itemRow || [])
                    .filter((f) => f.type === 'price')
                    .forEach((f) => processPrice(f.name, f.group, idx, !!f.sum));
            } else if (field.type === 'price') {
                processPrice(field.name, field.group, idx, !!field.sum);
            }
        });

        setInputPrice(initPrice);
    }, [itemModal, valueItem]);
    useEffect(() => {
        if (!valueItem || Object.keys(valueItem) === 0) return;
        setInputItem((prev) => ({
            ...prev,
            ...valueItem,
        }));
    }, [valueItem]);
    useEffect(() => {
        setItemModal(item);
    }, [item]);
    const handleChangeImg = (e) => {
        setImgUrl(e.target.value);
    };
    const handlerSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const tempGroups = {};
        const result = {};

        for (let [key, value] of formData.entries()) {
            const match = key.match(/^(.+?)\.(.+?)(\d+)$/);
            if (match) {
                const [, rawGroup, rawField, idx] = match;

                const group = rawGroup.replace(/\d+$/, '');
                const field = rawField.replace(/\d+$/, '');

                if (!tempGroups[group]) tempGroups[group] = {};
                if (!tempGroups[group][idx]) tempGroups[group][idx] = {};

                tempGroups[group][idx][field] = value;
            } else {
                if (!tempGroups._plain) tempGroups._plain = {};
                if (/^\d+(\.\d+)*$/.test(value)) {
                    value = value.replace(/\./g, '');
                }
                tempGroups._plain[key] = value;
            }
        }
        for (let [group, items] of Object.entries(tempGroups)) {
            if (group === '_plain') continue;
            const arr = Object.values(items);

            result[group] = arr;
        }
        if (tempGroups._plain) {
            for (let [rawKey, value] of Object.entries(tempGroups._plain)) {
                const cleanKey = rawKey.replace(/\d+$/, '');
                result[cleanKey] = value;
            }
        }
        handlerButton(result);
        hanlderClose();
        setInputPrice({});
        setInputItem({});
        setImgUrl('');
    };

    const handlerInputPrice = (e, val, index, inputItem, inputPrice, parent = {}) => {
        const value = e.target.value;
        const key = e.target.name;
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue === '') {
            setInputPrice((prev) => ({
                ...prev,
                [key]: '',
            }));
            return;
        }

        if (!isNaN(numericValue)) {
            const price = formatNumber(Number(numericValue));
            setInputPrice((prev) => ({
                ...prev,
                [key]: price,
            }));
        }
    };
    const handlerChangeInput = (e, value, index, inputItem, inputPrice, parent = {}, item, sum) => {
        const key = e.target.name;
        if (value?.func) {
            value.func(e, value, index);
        }
        if (value?.count && parent?.type === 'row') {
            let arr = {};
            parent?.itemRow.forEach((val, i) => {
                const key = val?.group
                    ? `${val.group}.${formatFilterValue(val.name) + index}`
                    : formatFilterValue(val.name) + index;
                if (val?.type === 'price' && inputPrice[key] !== '') {
                    const number = inputPrice[key]?.replace(/\./g, '');
                    arr[key] = Number(number) ?? 0;
                } else if (val?.count) {
                    arr[key] = Number(e.target.value) ?? 0;
                }
            });

            setSumItem((prev) => ({ ...prev, [index]: arr }));
        }
        setInputItem((prev) => {
            let update = { ...prev };
            update[key] = e.target.value;
            return update;
        });
    };
    const handlerOnClickBtn = (e, valueRow, index, inputItem, inputPrice, parent, item, sum) => {
        const key = e.target.name;
        if (valueRow?.func) {
            valueRow.func(e, valueRow, index, inputItem, inputPrice, parent, item, sum);
        }
    };

    const hanlderClose = () => {
        onClose();
    };
    const handleItem = (value, index) => {
        if (value.type === 'btn') {
            return (
                <button
                    type="button"
                    className={`btn mb-3 ${value.color}`}
                    key={index}
                    onClick={(e) => handlerOnClickBtn(e, value, index, inputItem, inputPrice, value, item)}
                    name={formatFilterValue(value.name)}
                >
                    {value.name}
                </button>
            );
        }
        if (value && typeof input !== 'string' && !Array.isArray(value) && value.type) {
            if (value.type === 'dropBox') {
                const name = formatFilterValue(value.name);
                return (
                    <div key={index} className={cx('drop-box')}>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name={value?.group ? `${value.group}.${name + index}` : name + index}
                            defaultValue=""
                            onChange={value?.func ? (e) => value.func(e) : null}
                            readOnly={value?.disabled ? true : false}
                            required
                        >
                            <option value="">{value.name}</option>
                            {value.drop.map((value, index) => (
                                <option value={value} key={index}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }
            if (value.type === 'price') {
                return (
                    <div className="mb-3" key={index}>
                        <label className="form-label">{value.name}</label>
                        <input
                            type="text"
                            className="form-control"
                            name={
                                value?.sum
                                    ? 'sum'
                                    : value?.group
                                      ? `${value.group}.${formatFilterValue(value.name) + index}`
                                      : formatFilterValue(value.name) + index
                            }
                            required
                            value={
                                value?.sum
                                    ? (inputPrice.sum ?? '')
                                    : (inputPrice[
                                          value?.group
                                              ? `${value.group}.${formatFilterValue(value.name) + index}`
                                              : formatFilterValue(value.name) + index
                                      ] ?? '')
                            }
                            onChange={(e) => handlerInputPrice(e)}
                            readOnly={value?.disabled ? true : false}
                        />
                    </div>
                );
            }
            if (value.type === 'row') {
                return (
                    <div key={index} className={cx('row')}>
                        {value.itemRow.map((valueRow, indexRow) =>
                            valueRow.type === 'price' ? (
                                <div className="mb-3" key={indexRow}>
                                    <label className="form-label">{valueRow.name ?? ''}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={
                                            valueRow?.sum
                                                ? 'sum'
                                                : valueRow?.group
                                                  ? `${valueRow.group}.${formatFilterValue(valueRow.name) + index}`
                                                  : formatFilterValue(valueRow.name) + index
                                        }
                                        required
                                        value={
                                            valueRow?.sum
                                                ? (inputPrice.sum ?? '')
                                                : (inputPrice[
                                                      valueRow?.group
                                                          ? `${valueRow.group}.${formatFilterValue(valueRow.name) + index}`
                                                          : formatFilterValue(valueRow.name) + index
                                                  ] ?? '')
                                        }
                                        onChange={(e) =>
                                            handlerInputPrice(e, valueRow, index, inputItem, inputPrice, value)
                                        }
                                    />
                                </div>
                            ) : valueRow.type === 'btn' ? (
                                <button
                                    type="button"
                                    className={`btn mb-3 ${valueRow.color}`}
                                    key={indexRow}
                                    onClick={(e) =>
                                        handlerOnClickBtn(
                                            e,
                                            valueRow,
                                            index,
                                            inputItem,
                                            inputPrice,
                                            value,
                                            item,
                                            sumItem,
                                        )
                                    }
                                    name={
                                        valueRow?.group
                                            ? `${valueRow.group}.${formatFilterValue(valueRow.name) + index}`
                                            : formatFilterValue(valueRow.name) + index
                                    }
                                >
                                    {valueRow.name}
                                </button>
                            ) : (
                                <div className="mb-3" key={indexRow}>
                                    <label className="form-label">{valueRow.name ?? ''}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={
                                            valueRow?.group
                                                ? `${valueRow.group}.${formatFilterValue(valueRow.name) + index}`
                                                : formatFilterValue(valueRow.name) + index
                                        }
                                        onChange={(e) =>
                                            handlerChangeInput(e, valueRow, index, inputItem, inputPrice, value)
                                        }
                                        value={
                                            inputItem[
                                                valueRow?.group
                                                    ? `${valueRow.group}.${formatFilterValue(valueRow.name) + index}`
                                                    : formatFilterValue(valueRow.name) + index
                                            ] ?? ''
                                        }
                                        readOnly={valueRow?.disabled ? true : false}
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
                            name={
                                value?.group
                                    ? `${value.group}.${formatFilterValue(value.name) + index}`
                                    : formatFilterValue(value.name) + index
                            }
                            onChange={(e) => handlerChangeInput(e, value)}
                            value={
                                inputItem[
                                    value?.group
                                        ? `${value.group}.${formatFilterValue(value.name) + index}`
                                        : formatFilterValue(value.name) + index
                                ] ?? ''
                            }
                            readOnly={value?.disabled ? true : false}
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
                            value={imgUrl ?? ''}
                            onChange={handleChangeImg}
                            style={{ width: '100%', marginBottom: '10px' }}
                            name={
                                value?.group
                                    ? `${value.group}.${formatFilterValue(value.name) + index}`
                                    : formatFilterValue(value.name) + index
                            }
                            readOnly={value?.disabled ? true : false}
                            required
                        />
                        {imgUrl && (
                            <img
                                src={imgUrl ?? ''}
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
                    <label className="form-label">{value.name}</label>
                    <input
                        type="text"
                        className="form-control"
                        name={
                            value?.group
                                ? `${value.group}.${formatFilterValue(value.name) + index}`
                                : formatFilterValue(value.name) + index
                        }
                        onChange={(e) => handlerChangeInput(e, value, index)}
                        value={
                            inputItem[
                                value?.group
                                    ? `${value.group}.${formatFilterValue(value.name) + index}`
                                    : formatFilterValue(value.name) + index
                            ] ?? ''
                        }
                        readOnly={value?.disabled ? true : false}
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
                            {Object.keys(itemModal).length > 0 ? itemModal.title : null}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => hanlderClose()}
                        ></button>
                    </div>

                    <form onSubmit={handlerSubmit}>
                        <div className="modal-body">
                            {Object.keys(itemModal).length > 0 && itemModal?.input
                                ? itemModal?.input.map((value, index) => handleItem(value, index))
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
