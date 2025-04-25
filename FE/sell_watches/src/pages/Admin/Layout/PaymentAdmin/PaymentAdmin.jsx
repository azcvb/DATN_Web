import ModalMessage from '~/layouts/Component/ModalMessage';
import ButtonManager from '../../Component/ButtonManager';
import FilterAdmin from '../../Component/FilterAdmin';
import TableManager from '../../Component/TableManager';
import { useEffect, useState } from 'react';
import { formatFilterValue } from '~/components/format';
import { postDataPaymentAdmin } from '~/apiServices/Payment/postDataPaymentAdmin';

function PaymentAdmin() {
    const [filterItem, setFilterItem] = useState([
        {
            name: 'Loại',
            item: ['Thanh toán khi nhận hàng', 'Thanh toán online'],
        },
        {
            name: 'Số tiền',
            item: 'price',
        },
        {
            name: 'Ngày thanh toán',
            item: 'calender',
        },
    ]);
    const [filter, setFilter] = useState({
        page: 0,
    });
    const [page, setPage] = useState(0);
    const [isModalMessage, setIsModalMessage] = useState(false);
    const [dataFilter, setDataFilter] = useState({});
    const [modalMessage, setModalMessage] = useState({
        status: '',
        message: '',
        display: 'hiden',
    });

    useEffect(() => {
        (async () => {
            try {
                const res = await postDataPaymentAdmin(dataFilter);
                const data = res.result.dataPaymentAdminResponses;
                const totalPage = res.result.totalPage;
                setDataFilter({ data, totalPage });
                setPage(0);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handlerFilter = (key, value) => {
        if (key === null) {
            if (value === '') {
                setFilter((prev) => ({
                    ...prev,
                    tenSanPham: null,
                }));
            }
        }
        if (typeof key === 'string') {
            key = formatFilterValue(key.replace(/đ/g, 'd').replace(/Đ/g, 'D'));
            setFilter((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const handlerPage = (indexPage) => {
        setFilter((prev) => ({
            ...prev,
            page: indexPage,
        }));
        setPage(indexPage);
    };
    const nameColumn = {
        id: 'Mã thanh toán',
        loai: 'Loại thanh toán',
        gia: 'Số tiền',
        ngayThanhToan: 'Ngày thanh toán',
        maDonHang: 'Mã đơn hàng',
    };
    const handlerClose = () => {
        setModalMessage((prev) => ({
            ...prev,
            display: 'hiden',
        }));
    };
    return (
        <div>
            <div className="background-admin">
                <div className="title-admin">Danh mục thanh toán</div>
                <ButtonManager />
                <FilterAdmin items={filterItem} handlerFilter={handlerFilter} />
                <TableManager
                    items={dataFilter}
                    handlerPage={handlerPage}
                    nameColumn={nameColumn}
                    page={page}
                    isCheckTick={false}
                    isUpdate={false}
                />
                {isModalMessage ? (
                    <ModalMessage
                        display={modalMessage?.display}
                        status={modalMessage?.status}
                        message={modalMessage?.message}
                        onClose={handlerClose}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default PaymentAdmin;
