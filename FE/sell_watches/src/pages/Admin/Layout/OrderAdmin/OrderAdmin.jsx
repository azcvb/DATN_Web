import ModalMessage from '~/layouts/Component/ModalMessage';
import ButtonManager from '../../Component/ButtonManager';
import FilterAdmin from '../../Component/FilterAdmin';
import ModalAdd from '../../Component/ModalAdd';
import TableManager from '../../Component/TableManager';
import { useState } from 'react';
import { formatFilterValue } from '~/components/format';
import ModalUpdate from '../../Component/UpdateRowTable';
function OrderAdmin() {
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
            'Mã sản phẩm',
            'Tên sản phẩm',
            {
                type: 'dropBox',
                name: 'Loại sản phẩm',
                drop: filterItem[0].item,
            },
            {
                type: 'row',
                itemRow: ['Giá', 'Số lượng'],
            },
            {
                type: 'dropBox',
                name: 'Giới tính',
                drop: ['Nam', 'Nữ', 'Khác'],
            },
            {
                type: 'row',
                itemRow: ['Loại máy', 'Mặt kính', 'Đường kính', 'Màu mặt'],
            },
            {
                type: 'row',
                itemRow: ['Chất liệu dây', 'Chất liệu vỏ', 'Độ dày', 'Kháng nước'],
            },
            {
                type: 'row',
                itemRow: ['Phong cách', 'Kiểu dáng', 'Xuất xứ', 'Thương hiệu'],
            },
            {
                type: 'row',
                itemRow: ['Bảo hành hãng', 'Bảo hành shop'],
            },

            'Khác',
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

    const nameColumn = {
        maSanPham: 'Mã sản phẩm',
        tenSanPham: 'Tên sản phẩm',
        loai: 'Loại sản phẩm',
        gia: 'Giá bán',
        daBan: 'Đã bán',
        tonKho: 'Tồn kho',
        ngayTao: 'Ngày tạo',
    };
    const handlerAddProduct = () => {
        item.title = 'Thêm đơn hàng';
        setItemModal(item);
        setTypeModal('add');
        setIsVisible(true);
    };
    const handlerRemoveProduct = () => {};
    const buttonProduct = [
        {
            type: 'add',
            name: 'Thêm đơn hàng',
            func: handlerAddProduct,
        },
        {
            type: 'remove',
            name: 'Xóa đơn hàng',
            // func: handlerRemoveProduct,
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
        setIsVisible(false);
    };
    const handlerClose = () => {
        setModalMessage((prev) => ({
            ...prev,
            display: 'hiden',
        }));
    };
    return (
        <div className="background-admin">
            <div className="title-admin">Danh mục đơn hàng</div>
            <ButtonManager item={buttonProduct} />
            <FilterAdmin items={filterItem} handlerFilter={handlerFilter} />
            <TableManager
                items={dataFilter}
                // handlerPage={handlerPage}
                nameColumn={nameColumn}
                page={page}
                listProductRemove={setListProductRemove}
                listCheck={listProductRemove}
                // alterBtnUpdate={handlerUpdateProduct}
                idUpdate={setIdUpdateProduct}
            />
            {typeModal === 'add' ? (
                <ModalAdd
                    isVisibale={isVisibale}
                    onClose={handlerCloseModal}
                    item={itemModal}
                    // handlerButton={handlerAddProductDb}
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

export default OrderAdmin;
