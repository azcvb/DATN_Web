import ModalMessage from '~/layouts/Component/ModalMessage';
import ButtonManager from '../../Component/ButtonManager';
import FilterAdmin from '../../Component/FilterAdmin';
import ModalAdd from '../../Component/ModalAdd';
import TableManager from '../../Component/TableManager';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formatDob, formatFilterValue } from '~/components/format';
import ModalUpdate from '../../Component/UpdateRowTable';
import { postOrderTableAdmin } from '~/apiServices/Order/postOrderTableAdmin';
import { useCookies } from 'react-cookie';
import { postCustomerInfor } from '~/apiServices/Customer/postCustomerInfor';
import { useDebounce } from '~/hook/useDebounce';
import { postGetProductCode } from '~/apiServices/Product/postGetProductCode';
import { postSaveOrderByAdmin } from '~/apiServices/Order/postSaveOrderByAdmin';
import { payment } from '~/apiServices/Payment/payment';
import { postUpdateProduct } from '~/apiServices/Product/postUpdateProduct';
import { postUpdateStatusOrder } from '~/apiServices/Order/postUpdateStatusOrder';
import { order } from '~/apiServices/Order/order';
import { postGetOrderById } from '~/apiServices/Order/postGetOrderById';
import { postCancelOrder } from '~/apiServices/Order/postCancelOrder';
function OrderAdmin() {
    const [filterItem, setFilterItem] = useState([
        {
            name: 'Giá',
            item: 'price',
        },
        {
            name: 'Trạng thái',
            item: ['ACCEPT', 'PENDING', 'CANCEL'],
        },
        {
            name: 'Ngày đặt',
            item: 'calender',
        },
    ]);

    const [isVisibale, setIsVisible] = useState(false);
    const [typeModal, setTypeModal] = useState('add');
    const [itemModal, setItemModal] = useState({});
    const [dataFilter, setDataFilter] = useState({});
    const [filter, setFilter] = useState({
        page: 0,
    });
    const [page, SetPage] = useState(0);
    const [modalMessage, setModalMessage] = useState({
        status: '',
        message: '',
        display: 'hiden',
    });
    const [listOrderRemove, setListOrderRemove] = useState([]);
    const [isModalMessage, setIsModalMessage] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [idUpdateOrder, setIdUpdateOrder] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [dataTable, setDataTable] = useState({
        page: 0,
    });
    const [cookies, setCookies] = useCookies();
    const nameColumn = {
        id: 'Mã đơn hàng',
        soDienThoai: 'Số điện thoại',
        gia: 'Giá',
        ngayDat: 'Ngày đặt',
        mucDich: 'Mục đích',
        khac: 'Khác',
        diaChi: 'Địa chỉ',
        trangThai: 'Trang thái',
    };
    const [customerPhone, setCustomerPhone] = useState('');
    const debouncedCustomerPhone = useDebounce(customerPhone, 500);
    const [customerInfo, setCustomerInfo] = useState({});
    const customerInfoRef = useRef({});
    const [valueItem, setValueItem] = useState({});

    //Đầu vào mã sản phẩm
    const [productCode, setProductCode] = useState('');
    const productDataRef = useRef({});
    const [productData, setProductData] = useState({});
    const debouncedProductCode = useDebounce(productCode, 500);

    // lấy dữ liệu table

    useEffect(() => {
        const token = cookies.token;
        (async () => {
            try {
                const res = await postOrderTableAdmin(dataTable, token);
                if (res?.result?.orderForTableAdminResponses) {
                    const data = res.result.orderForTableAdminResponses;
                    const totalPage = res.result.totalPage;
                    setDataFilter({ data, totalPage });
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    useEffect(() => {
        if (!item?.input) return;
        customerInfoRef.current = customerInfo;
        setValueItem((prev) => ({
            ...prev,
            tenKhachHang: customerInfoRef.current.tenKhachHang,
            ngaySinh: customerInfoRef.current.ngaySinh,
            diaChi: customerInfoRef.current.diaChi,
        }));
        let newInput;
        if (customerPhone?.value === '') {
            if (item?.input[1]?.itemNew === 'customer') {
                newInput = item.input.filter((val, i) => val.itemNew !== 'customer');
                item.input = newInput;
                setItemModal((prev) => ({
                    ...prev,
                    title: item.title,
                    input: item.input,
                }));
            }
        } else if (item?.input[1]?.itemNew !== 'customer' && customerPhone?.value) {
            const newInput = item.input;
            newInput.splice(1, 0, {
                type: 'row',
                itemRow: [{ name: 'Tên khách hàng' }, { name: 'Ngày sinh' }, { name: 'Địa chỉ' }],
                itemNew: 'customer',
            });
            item.input = newInput;
            setItemModal((prev) => ({
                ...prev,
                title: item.title,
                input: item.input,
            }));
        }
    }, [customerInfo, customerPhone]);
    const handlerAddOrder = () => {
        item.title = 'Thêm đơn hàng';
        setItemModal((prev) => ({
            ...prev,
            title: item.title,
            input: item.input,
        }));
        setTypeModal('add');
        setIsVisible(true);
    };
    //Xử lý nhập dữ liệu add số điện thoại
    const handlerIdCustomer = (e, val, index) => {
        const value = e.target.value;
        setCustomerPhone({ value, val, index });
    };
    useEffect(() => {
        if (!debouncedCustomerPhone) {
            setProductData({});
            return;
        }

        const fetch = async () => {
            try {
                const res = await postCustomerInfor({ name: debouncedCustomerPhone.value });
                if (res?.message === 'CUSTOMER_NOT_EXIT') {
                    return setCustomerInfo({});
                }
                const data = {};
                const i = debouncedCustomerPhone.index + 1;
                Object.keys(res.result).forEach((val) => {
                    data[val + i] = res.result[val];
                });
                setProductData(() => ({
                    ...data,
                }));
            } catch (err) {
                console.error('Lỗi khi tìm khách hàng:', err);
            }
        };

        fetch();
    }, [debouncedCustomerPhone]);

    const hanlderAddRowProduct = (e, val, i) => {
        setItemModal((prev) => {
            const newInput = [
                ...prev.input.slice(0, i),
                {
                    type: 'row',
                    itemRow: [
                        { name: 'Mã sản phẩm', func: handlerGetProductCode, group: 'sanPham' },
                        { name: 'Giá', type: 'price', group: 'sanPham' },
                        { name: 'Số lượng', count: true, group: 'sanPham' },
                        { type: 'btn', name: 'X', func: hanlderRemoveRowProduct, color: 'btn-danger' },
                    ],
                },
                ...prev.input.slice(i),
            ];

            return { ...prev, input: newInput };
        });
    };
    const hanlderRemoveRowProduct = (e, val, i, valItem, priceItem, parent, itemOfModal) => {
        let restInput = { ...valItem };
        let restPrice = { ...priceItem };
        // parent.itemRow.forEach((val) => {
        //     const fieldKey = formatFilterValue(val.name) + i;
        //     delete restInput[fieldKey];
        //     delete restPrice[fieldKey];
        //     const updateValueItem = {
        //         ...restInput,
        //         ...restPrice,
        //     };
        //     setValueItem((prev) => ({
        //         ...updateValueItem,
        //     }));
        // });
        const updateItem = itemOfModal?.input.filter((_, index) => index !== i);
        setItemModal((prev) => ({
            ...prev,
            input: updateItem,
        }));
    };
    //Nhập mã sản phẩm
    const handlerGetProductCode = (e, val, index) => {
        const value = e.target.value;
        const key = e.target.name;
        setProductCode({ key, value, index });
    };

    useEffect(() => {
        if (!debouncedProductCode) {
            setProductData({});
            return;
        }

        const fetch = async () => {
            const token = cookies.token;
            try {
                const res = await postGetProductCode({ name: debouncedProductCode?.value }, token);
                if (res?.code === 'ERR_BAD_REQUEST') {
                    return;
                }
                const data = {};
                Object.keys(res.result).forEach((val) => {
                    data[val + debouncedProductCode.index] = res.result[val];
                });
                setProductData(() => ({
                    ...data,
                }));
            } catch (err) {
                console.error('Lỗi khi tìm khách hàng:', err);
            }
        };

        fetch();
    }, [debouncedProductCode]);
    //Tính tổng tiền
    const handlerSumPrice = (e, valueRow, index, inputItem, inputPrice, value, item, sumItem) => {
        const sum = Object.values(sumItem).reduce((total, item) => {
            const keys = Object.keys(item);
            const priceKey = keys.find((key) => key.startsWith('sanPham.gia'));
            const countKey = keys.find((key) => key.startsWith('sanPham.soLuong'));

            const price = Number(item[priceKey]) || 0;
            const count = Number(item[countKey]) || 0;

            return total + price * count;
        }, 0);
        setValueItem((prev) => ({
            ...prev,
            sum,
        }));
    };
    var item = useMemo(
        () => ({
            input: [
                { name: 'Số điện thoại', func: handlerIdCustomer },
                {
                    type: 'row',
                    itemRow: [
                        { name: 'Mã sản phẩm', func: handlerGetProductCode, group: 'sanPham' },
                        { name: 'Giá', type: 'price', group: 'sanPham' },
                        { name: 'Số lượng', count: true, group: 'sanPham' },
                        { type: 'btn', name: 'X', func: hanlderRemoveRowProduct, color: 'btn-danger' },
                    ],
                },
                {
                    type: 'row',
                    itemRow: [
                        { type: 'btn', name: 'Thêm sản phẩm', func: hanlderAddRowProduct, color: 'btn-primary' },
                        { type: 'btn', name: 'Tính tổng tiền', func: handlerSumPrice, color: 'btn-success' },
                    ],
                },
                { type: 'price', name: 'Tổng Giá', sum: true, disabled: true },
                { name: 'Mục đích' },
                { name: 'Khác' },
                { type: 'dropBox', name: 'Thanh toán', drop: ['Thanh toán khi nhận hàng', 'Thanh toán online'] },
            ],
        }),
        [],
    );
    useEffect(() => {
        setValueItem((prev) => ({
            ...prev,
            ...productData,
        }));
    }, [productData]);
    const handlerRemoveOrder = () => {
        if (!listOrderRemove || listOrderRemove.length === 0) {
            return setModalMessage({
                status: 'warning',
                message: 'Vui lòng chọn sản phẩm xóa!',
                display: 'block',
            });
        }
        try {
            const fetch = async () => {
                const res = await postCancelOrder(listOrderRemove);
                if (res?.result === true) {
                    const newList = dataFilter.data;
                    const filteredList = newList.filter((item) => !listOrderRemove.includes(item.id));
                    setDataFilter((prev) => ({
                        ...prev,
                        data: filteredList,
                    }));
                    getDataTable();
                    return setModalMessage({
                        status: 'success',
                        message: 'Hủy đơn hàng thành công!',
                        display: 'block',
                    });
                }
                setModalMessage({
                    status: 'error',
                    message: 'Hủy đơn hàng thất bại!',
                    display: 'block',
                });
            };
            fetch();
        } catch (err) {
            console.log(err);
        }
    };
    const buttonProduct = [
        {
            type: 'add',
            name: 'Thêm đơn hàng',
            func: handlerAddOrder,
        },
        {
            type: 'remove',
            name: 'Hủy đơn hàng',
            func: handlerRemoveOrder,
        },
    ];
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
    const handlerCloseModal = () => {
        setItemModal({});
        setCustomerPhone('');
        setCustomerInfo({});
        setIsVisible(false);
    };
    const handlerClose = () => {
        setModalMessage((prev) => ({
            ...prev,
            display: 'hiden',
        }));
    };
    // Chuyển trang
    const handlerPage = (indexPage) => {
        setFilter((prev) => ({
            ...prev,
            page: indexPage,
        }));
        SetPage(indexPage);
    };
    // Tạo đơn hàng
    const handlerAddOrderDb = (data) => {
        (async () => {
            try {
                const resOrder = await postSaveOrderByAdmin(data, cookies.token);
                if (resOrder.result.order && data?.thanhToan === 'Thanh toán online') {
                    const sum = data.sum.replace(/\./g, '');
                    const resPayment = await payment(sum, resOrder.result.orderId);
                    window.open(resPayment.result.url, '_blank', 'noopener,noreferrer');
                }
            } catch (err) {
                console.log(err);
            }
        })();
    };
    const handlerUpdateOrder = (data) => {
        if (data) {
            let trangThai = data.trangThai === 'Đã hủy' ? false : true;
            if (data.trangThai === 'Đang chờ') {
                trangThai = null;
            }
            const dataUpdate = {
                id: data.id,
                diaChi: data.diaChi,
                status: trangThai,
            };
            (async () => {
                try {
                    const res = await postUpdateStatusOrder(dataUpdate);
                    if (res.result) {
                        getDataTable();
                        setModalMessage({
                            status: 'success',
                            message: 'Cập nhật đơn hàng thành công!',
                            display: 'block',
                        });
                    } else {
                        setModalMessage({
                            status: 'error',
                            message: 'Cập nhật đơn hàng thất bại!',
                            display: 'block',
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    };
    const handlerAlterUpdateOrder = () => {
        item.title = 'Sửa đơn hàng';
        setTypeModal('uppdate');
        setIsVisible(true);
    };
    useEffect(() => {
        (async () => {
            const token = cookies.token;
            if (token && Object.keys(idUpdateOrder).length > 0) {
                try {
                    const res = await postGetOrderById(
                        {
                            name: idUpdateOrder.id,
                        },
                        token,
                    );

                    if (res?.result) {
                        setDataUpdate({
                            id: res.result.id,
                            diaChi: res.result.diaChi,
                            trangThai:
                                res.result.trangThai === 'PENDING'
                                    ? 'Đang chờ'
                                    : res.result.trangThai === 'CANCEL'
                                      ? 'Đã hủy'
                                      : 'Chấp nhận',
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        })();
    }, [idUpdateOrder]);
    const itemUpdate = {
        input: [
            { name: 'Địa chỉ' },
            { type: 'dropBox', name: 'Trạng thái', drop: ['Chấp nhận', 'Đang chờ', 'Đã hủy'] },
        ],
    };
    const getDataTable = () => {
        const token = cookies.token;
        (async () => {
            try {
                const res = await postOrderTableAdmin(dataTable, token);
                if (res?.result?.orderForTableAdminResponses) {
                    const data = res.result.orderForTableAdminResponses;
                    const totalPage = res.result.totalPage;
                    setDataFilter({ data, totalPage });
                }
            } catch (err) {
                console.log(err);
            }
        })();
    };
    return (
        <div className="background-admin">
            <div className="title-admin">Danh mục đơn hàng</div>
            <ButtonManager item={buttonProduct} />
            <FilterAdmin items={filterItem} handlerFilter={handlerFilter} />
            <TableManager
                items={dataFilter}
                handlerPage={handlerPage}
                nameColumn={nameColumn}
                page={page}
                listProductRemove={setListOrderRemove}
                listCheck={listOrderRemove}
                alterBtnUpdate={handlerAlterUpdateOrder}
                idUpdate={setIdUpdateOrder}
            />
            {typeModal === 'add' ? (
                <ModalAdd
                    isVisibale={isVisibale}
                    onClose={handlerCloseModal}
                    item={itemModal}
                    handlerButton={handlerAddOrderDb}
                    valueItem={valueItem}
                />
            ) : (
                <ModalUpdate
                    isVisibale={isVisibale}
                    onClose={handlerCloseModal}
                    item={itemUpdate}
                    handlerButton={setIsUpdate}
                    inputUpdate={dataUpdate}
                    handlerUpdate={handlerUpdateOrder}
                    handlerDataUpdate={setDataUpdate}
                />
            )}
            <ModalMessage
                display={modalMessage?.display}
                status={modalMessage?.status}
                message={modalMessage?.message}
                onClose={handlerClose}
            />
        </div>
    );
}

export default OrderAdmin;
