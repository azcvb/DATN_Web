import classNames from 'classnames/bind';
import style from './TableManager.module.scss';
import Pagination from '~/layouts/Component/Paginatio/Pagination';
import { formatNumber } from '~/components/format';

const cx = classNames.bind(style);
function TableManager({
    items,
    handlerPage,
    nameColumn,
    page,
    listProductRemove,
    listCheck,
    alterBtnUpdate,
    idUpdate,
    dataUpdate,
}) {
    const handlerAddListRemove = (value, isCheck) => {
        if (isCheck) {
            listProductRemove((prev) => {
                if (!prev.includes(value)) {
                    return [...prev, value];
                }
                return prev;
            });
        } else {
            listProductRemove((prev) => prev.filter((item) => item !== value));
        }
    };
    const handlerBtnUpdate = (e) => {
        alterBtnUpdate('update');
        idUpdate({
            id: e,
        });
    };
    return (
        <div className={cx('tableManager')}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <input className="form-check-input" type="checkbox" value="" id="checkDefault" />
                        </th>
                        {Object.values(nameColumn).map((value, index) => (
                            <th scope="col" key={index}>
                                {value}
                            </th>
                        ))}
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items?.filterProductAdminResponses) &&
                    items.filterProductAdminResponses.length > 0 ? (
                        Object.values(items.filterProductAdminResponses).map((value, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkDefault"
                                        name={value.id}
                                        checked={listCheck.includes(value.id) ? true : false}
                                        onChange={(e) => handlerAddListRemove(e.target.name, e.target.checked)}
                                    />
                                </th>
                                {Object.keys(nameColumn).map((valueChild, indexChild) =>
                                    valueChild === 'gia' ? (
                                        <td key={indexChild}>{formatNumber(value[valueChild])}</td>
                                    ) : (
                                        <td key={indexChild}>{value[valueChild]}</td>
                                    ),
                                )}
                                <td>
                                    <button className={cx('btn-update')} onClick={() => handlerBtnUpdate(value.id)}>
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="100%">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination totalPage={items?.totalPage} currentPage={page} onPageChange={handlerPage} />
        </div>
    );
}

export default TableManager;
