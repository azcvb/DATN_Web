import classNames from 'classnames/bind';
import style from './ModalBill.module.scss';
import BillContent from '../BillContent';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const cx = classNames.bind(style);

function ModalBill({ isVisibale, onClose, item }) {
    const modalClass = `modal ${isVisibale ? 'show d-block' : ''}`;
    const printRef = useRef();
    const handleSavePdf = async () => {
        if (!printRef.current) return;
        if (item.diaChi === '') {
            alert('Vui lòng cập nhật địa chỉ giao hàng!');
            return;
        }
        const canvas = await html2canvas(printRef.current, {
            scale: 2,
            useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`HoaDon-${item.maDonHang || item.id}.pdf`);
    };

    return (
        <>
            <div style={{ position: 'absolute', left: '-10000px', top: 0 }}>
                <BillContent ref={printRef} item={item} />
            </div>

            <div className={modalClass} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered flexCenter">
                    <div className={`modal-content ${cx('modal-custom')}`}>
                        <div className="modal-header">
                            <h5 className="modal-title">{item.title || 'HÓA ĐƠN'}</h5>
                            <button className="btn-close" onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            <BillContent item={item} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Đóng
                            </button>
                            <button className="btn btn-primary" onClick={handleSavePdf}>
                                Tải PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalBill;
