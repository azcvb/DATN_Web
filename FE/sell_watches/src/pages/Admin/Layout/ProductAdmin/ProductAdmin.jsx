import classNames from 'classnames/bind';
import style from './ProductAdmin.module.scss';
import ButtonManager from '../../Component/ButtonManager';
import FilterAdmin from '../../Component/FilterAdmin';
import TableManager from '../../Component/TableManager';
import { useEffect, useState } from 'react';
import { getDistinctType } from '~/apiServices/Product/getDistinctType';
import ModalAdd from '../../Component/ModalAdd';
import { postDataTableAdmin } from '~/apiServices/Product/postDataTableAdmin';
import { formatFilterValue } from '~/components/format';
import { postAddProduct } from '~/apiServices/Product/postAddProduct';
import ModalMessage from '~/layouts/Component/ModalMessage';
import { postRemoveProduct } from '~/apiServices/Product/postRemoveProduct';
import { postUpdateProduct } from '~/apiServices/Product/postUpdateProduct';
import { postGetProductId } from '~/apiServices/Product/postGetProductId';
import ModalUpdate from '../../Component/UpdateRowTable';
import { postAddType } from '~/apiServices/Type/postAddType';

const cx = classNames.bind(style);
function ProductAdmin() {
    const [filterItem, setFilterItem] = useState([
        {
            name: 'Loại',
            item: [],
        },
        {
            name: 'Giá',
            item: 'price',
        },
        {
            name: 'Tồn kho',
            item: ['Còn hàng', 'Hết hàng'],
        },
        {
            name: 'Ngày tạo',
            item: 'calender',
        },
    ]);
    const item = {
        input: [
            { name: 'Mã sản phẩm' },
            { name: 'Tên sản phẩm' },
            {
                type: 'dropBox',
                name: 'Loại sản phẩm',
                drop: filterItem[0].item,
            },
            {
                type: 'row',
                itemRow: [{ name: 'Giá nhập', type: 'price' }, { name: 'Số lượng' }],
            },
            {
                type: 'dropBox',
                name: 'Giới tính',
                drop: ['Nam', 'Nữ', 'Khác'],
            },
            {
                type: 'row',
                itemRow: [{ name: 'Loại máy' }, { name: 'Mặt kính' }, { name: 'Đường kính' }, { name: 'Màu mặt' }],
            },
            {
                type: 'row',
                itemRow: [
                    { name: 'Chất liệu dây' },
                    { name: 'Chất liệu vỏ' },
                    { name: 'Độ dày' },
                    { name: 'Kháng nước' },
                ],
            },
            {
                type: 'row',
                itemRow: [{ name: 'Phong cách' }, { name: 'Kiểu dáng' }, { name: 'Xuất xứ' }, { name: 'Thương hiệu' }],
            },
            {
                type: 'row',
                itemRow: [{ name: 'Bảo hành hãng' }, { name: 'Bảo hành shop' }],
            },

            { name: 'Khác' },
            {
                type: 'bigSize',
                name: 'Mô tả',
            },
            {
                type: 'img',
                name: 'Hình ảnh',
            },
        ],
    };
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
    const [listProductRemove, setListProductRemove] = useState([]);
    const [isModalMessage, setIsModalMessage] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [idUpdateProduct, setIdUpdateProduct] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [typeAdd, setTypeAdd] = useState('product');
    // Khởi tạo
    useEffect(() => {
        async function fetchData() {
            try {
                const resDistinctType = await getDistinctType();
                const resDataTable = await postDataTableAdmin(filter);
                const listProducts = resDataTable.result;
                const data = listProducts.filterProductAdminResponses;
                const totalPage = listProducts.totalPage;
                setDataFilter({ data, totalPage });
                SetPage(0);
                if (resDistinctType.result.length > 0) {
                    let newFilterItem = [...filterItem];
                    newFilterItem[0] = {
                        ...newFilterItem[0],
                        item: resDistinctType.result,
                    };
                    setFilterItem(newFilterItem);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    // Xử lý các nút thêm, xóa, đóng bên ButtonManager
    const handlerAddProduct = () => {
        setTypeAdd('product');
        item.title = 'Thêm sản phẩm';
        if (item?.input) {
            item.input[3].itemRow[0].name = 'Giá nhập';
        }
        setItemModal(item);
        setTypeModal('add');
        setIsVisible(true);
    };
    const handlerAddTypeProduct = () => {
        setTypeAdd('type');
        const itemTypeProduct = {
            title: 'Thêm loại sản phẩm',
            input: [{ name: 'Tên loại' }],
        };
        setItemModal(itemTypeProduct);
        setTypeModal('add');
        setIsVisible(true);
    };
    const handlerRemoveProduct = () => {
        if (!listProductRemove || listProductRemove.length === 0) {
            return setModalMessage({
                status: 'warning',
                message: 'Vui lòng chọn sản phẩm xóa!',
                display: 'block',
            });
        }
        try {
            const fetch = async () => {
                const res = await postRemoveProduct(listProductRemove);
                if (res?.result === true) {
                    const newList = dataFilter.data;
                    const filteredList = newList.filter((item) => !listProductRemove.includes(item.id));
                    setDataFilter((prev) => ({
                        ...prev,
                        data: filteredList,
                    }));
                    return setModalMessage({
                        status: 'success',
                        message: 'Xóa sản phẩm thành công!',
                        display: 'block',
                    });
                }
                setModalMessage({
                    status: 'error',
                    message: 'Xóa sản phẩm thất bại!',
                    display: 'block',
                });
            };
            fetch();
        } catch (err) {
            console.log(err);
        }
    };
    const handlerCloseModal = () => {
        setItemModal({});
        setIsVisible(false);
    };
    const handlerClose = () => {
        setModalMessage((prev) => ({
            ...prev,
            display: 'hiden',
        }));
    };
    const handlerAddProductDb = (data) => {
        if (data?.gia) {
            const price = data.gia;
            data.gia = price.replaceAll('.', '');
        }
        try {
            const fetch = async () => {
                const res = await postAddProduct(data);
                if (res?.result === true) {
                    const resDataTable = await postDataTableAdmin(filter);
                    const listProducts = resDataTable.result;
                    const data = listProducts.filterProductAdminResponses;
                    const totalPage = listProducts.totalPage;
                    setDataFilter({ data, totalPage });
                    return setModalMessage({
                        status: 'success',
                        message: 'Thêm sản phẩm thành công!',
                        display: 'block',
                    });
                }
                setModalMessage({
                    status: 'error',
                    message: 'Thêm sản phẩm thất bại!',
                    display: 'block',
                });
            };
            fetch();
        } catch (err) {
            console.log(err);
        }
    };
    // Tạo nút bên ButtonManager
    const buttonProduct = [
        {
            type: 'add',
            name: 'Thêm sản phẩm',
            func: handlerAddProduct,
        },
        {
            type: 'add',
            name: 'Thêm loại sản phẩm',
            func: handlerAddTypeProduct,
        },
        {
            type: 'remove',
            name: 'Xóa sản phẩm',
            func: handlerRemoveProduct,
        },
    ];
    // dữ liệu bảng
    const handlerPage = (indexPage) => {
        setFilter((prev) => ({
            ...prev,
            page: indexPage,
        }));
        SetPage(indexPage);
    };
    const nameColumn = {
        maSanPham: 'Mã sản phẩm',
        tenSanPham: 'Tên sản phẩm',
        loai: 'Loại sản phẩm',
        gia: 'Giá bán',
        daBan: 'Đã bán',
        tonKho: 'Tồn kho',
        ngayTao: 'Ngày tạo',
    };
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
    useEffect(() => {
        async function fetchData() {
            try {
                const resDataTable = await postDataTableAdmin(filter);
                const listProducts = resDataTable.result;
                const data = listProducts.filterProductAdminResponses;
                const totalPage = listProducts.totalPage;
                setDataFilter({ data, totalPage });
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [page, filter]);
    const handlerUpdateProduct = () => {
        item.title = 'Sửa sản phẩm';
        if (item?.input) {
            item.input[3].itemRow[0].name = 'Giá bán';
        }
        setItemModal(item);
        setTypeModal('uppdate');
        setIsVisible(true);
    };
    useEffect(() => {
        if (
            (idUpdateProduct && typeof idUpdateProduct !== 'object') ||
            (typeof idUpdateProduct === 'object' && Object.keys(idUpdateProduct).length !== 0)
        ) {
            (async () => {
                try {
                    const res = await postGetProductId(idUpdateProduct);
                    setDataUpdate(res.result);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [idUpdateProduct]);
    useEffect(() => {
        handlerBtnUpdateProduct(isUpdate);
    }, [dataUpdate]);
    const handlerBtnUpdateProduct = (type) => {
        if (type) {
            if (dataUpdate?.gia && typeof dataUpdate.gia === 'string') {
                const price = dataUpdate.gia;
                dataUpdate.gia = price.replaceAll('.', '');
            }
            (async () => {
                if (dataUpdate.length !== 0) {
                    try {
                        const res = await postUpdateProduct(dataUpdate);
                        if (res?.result === true) {
                            const resDataTable = await postDataTableAdmin(filter);
                            const listProducts = resDataTable.result;
                            const data = listProducts.filterProductAdminResponses;
                            const totalPage = listProducts.totalPage;
                            setDataFilter({ data, totalPage });
                            setIsUpdate(false);
                            return setModalMessage({
                                status: 'success',
                                message: 'Sửa sản phẩm thành công!',
                                display: 'block',
                            });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    setIsUpdate(false);
                }
            })();
        }
    };
    // modalMessage message
    useEffect(() => {
        if (modalMessage.display === 'hiden') {
            setIsModalMessage(false);
        }
        if (modalMessage.display === 'block') {
            setIsModalMessage(true);
        }
    }, [modalMessage]);

    const handlerAddTypeDb = (data) => {
        try {
            (async () => {
                const res = await postAddType(data.tenLoai);
                if (res.result) {
                    setModalMessage({
                        status: 'success',
                        message: 'Thêm loại sản phẩm thành công!',
                        display: 'block',
                    });
                } else {
                    setModalMessage({
                        status: 'error',
                        message: 'Loại sản phẩm đã tồn tại!',
                        display: 'block',
                    });
                }
            })();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="background-admin">
            <div className="title-admin">Danh mục sản phẩm</div>
            <ButtonManager item={buttonProduct} />
            <FilterAdmin items={filterItem} handlerFilter={handlerFilter} />
            <TableManager
                items={dataFilter}
                handlerPage={handlerPage}
                nameColumn={nameColumn}
                page={page}
                listProductRemove={setListProductRemove}
                listCheck={listProductRemove}
                alterBtnUpdate={handlerUpdateProduct}
                idUpdate={setIdUpdateProduct}
            />
            {typeModal === 'add' ? (
                <ModalAdd
                    isVisibale={isVisibale}
                    onClose={handlerCloseModal}
                    item={itemModal}
                    handlerButton={typeAdd === 'product' ? handlerAddProductDb : handlerAddTypeDb}
                />
            ) : (
                <ModalUpdate
                    isVisibale={isVisibale}
                    onClose={handlerCloseModal}
                    item={itemModal}
                    handlerButton={setIsUpdate}
                    inputUpdate={dataUpdate}
                    handlerDataUpdate={setDataUpdate}
                />
            )}
            {isModalMessage ? (
                <ModalMessage
                    display={modalMessage?.display}
                    status={modalMessage?.status}
                    message={modalMessage?.message}
                    onClose={handlerClose}
                />
            ) : null}
        </div>
    );
}

export default ProductAdmin;
