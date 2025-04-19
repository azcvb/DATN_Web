import classNames from 'classnames/bind';
import style from './HomeAdmin.module.scss';
import { useEffect, useState } from 'react';
import { BarChart, LineChart } from '@mui/x-charts';
import Calendar from '~/pages/Admin/Component/Calendar';
import { formatDateDashboard, formatNumber } from '~/components/format';
import { postDashboardTop } from '~/apiServices/Dashboard/postDashboardTop';
import { postDashboardBottom } from '~/apiServices/Dashboard/postDashboardBottom';

const cx = classNames.bind(style);

function HomeAdmin() {
    // Phần top của dashboard - thống kê theo khoảng 7 ngày
    const [endDayTop, setEndDayTop] = useState(new Date());
    const initialStartDayTop = new Date(endDayTop);
    initialStartDayTop.setDate(endDayTop.getDate() - 6);
    const [startDayTop, setStartDayTop] = useState(initialStartDayTop);

    // Phần bottom của dashboard - thống kê theo khoảng 30 ngày
    const [endDayBottom, setEndDayBottom] = useState(new Date());
    // Lưu ý: ban đầu nên dựa vào endDayBottom để xác định startDayBottom
    const initialStartDayBottom = new Date(endDayBottom);
    initialStartDayBottom.setDate(endDayBottom.getDate() - 30);
    const [startDayBottom, setStartDayBottom] = useState(initialStartDayBottom);

    // Lưu trữ danh sách ngày dạng "dd/mm" để dùng cho biểu đồ
    const [daysTop, setDaysTop] = useState([]);
    const [daysBottom, setDaysBottom] = useState([]);

    // Dữ liệu truyền cho API dashboard top
    const [dashboardTopDay, setDashboardTopDay] = useState({
        startDay: null,
        endDay: null,
    });
    const [dashboardBottomDay, setDashboardBottomDay] = useState({
        startDay: null,
        endDay: null,
    });
    // Dữ liệu sản phẩm nhận được từ API
    const [resultProduct, setResultProduct] = useState(null);
    const [resultCustomer, setResultCustomer] = useState(null);
    const [resultOrder, setResultOrder] = useState(null);
    const [resultPayment, setResultPayment] = useState(null);
    const [getTimeNow, setGetTimeNow] = useState();

    // Gọi API khi dashboardTopData thay đổi
    useEffect(() => {
        if (getTimeNow) {
            async function fetchDashboardData() {
                try {
                    const resTop = await postDashboardTop(dashboardTopDay);
                    processProductData(resTop.productResponse);
                    processCustomerData(resTop.customerResponse);
                    processOrderData(resTop.orderResponse);
                } catch (err) {
                    console.log(err);
                }
            }
            // Nếu dữ liệu ngày chưa được xác định thì không gọi API
            if (
                dashboardTopDay.startDay &&
                dashboardTopDay.endDay &&
                dashboardBottomDay.startDay &&
                dashboardBottomDay.endDay
            ) {
                fetchDashboardData();
            }
        }
    }, [dashboardTopDay]);
    useEffect(() => {
        if (getTimeNow) {
            async function fetchDashboardData() {
                try {
                    const resBottom = await postDashboardBottom(dashboardBottomDay);
                    processPaymentData(resBottom.paymentResponse);
                } catch (err) {
                    console.log(err);
                }
            }
            // Nếu dữ liệu ngày chưa được xác định thì không gọi API
            if (dashboardBottomDay.startDay && dashboardBottomDay.endDay) {
                fetchDashboardData();
            }
        }
    }, [dashboardBottomDay]);
    // Tính toán danh sách ngày cho phần top và bottom khi component khởi tạo
    useEffect(() => {
        setDaysTop(getDaysBetween(startDayTop, endDayTop));
        setDaysBottom(getDaysBetween(startDayBottom, endDayBottom));
    }, [endDayBottom, endDayTop, startDayBottom, startDayTop]);

    // Cập nhật lại dữ liệu cho dashboardTopData mỗi khi ngày thay đổi
    const getCurrentTime = () => {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        const seconds = String(currentTime.getSeconds()).padStart(2, '0');

        setGetTimeNow(`${hours}:${minutes}:${seconds}`);
    };
    useEffect(() => {
        getCurrentTime();
    }, []);
    useEffect(() => {
        getCurrentTime();
        setDashboardTopDay({
            startDay: formatDateDashboard(startDayTop),
            endDay: formatDateDashboard(endDayTop) + ' ' + getTimeNow,
        });
        setDashboardBottomDay({
            startDay: formatDateDashboard(startDayBottom),
            endDay: formatDateDashboard(endDayBottom) + ' ' + getTimeNow,
        });
    }, [startDayTop, endDayTop, startDayBottom, endDayBottom, getTimeNow]);
    // Hàm lấy danh sách ngày giữa startDate và endDate với định dạng "dd/mm"
    const getDaysBetween = (startDate, endDate) => {
        const days = [];
        let start = new Date(startDate);
        let end = new Date(endDate);

        if (start > end) {
            [start, end] = [end, start];
        }

        for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            const day = dt.getDate().toString().padStart(2, '0');
            const month = (dt.getMonth() + 1).toString().padStart(2, '0');
            days.push(`${day}/${month}`);
        }

        return days;
    };

    // Hàm xử lý dữ liệu sản phẩm khi nhận từ API
    const processProductData = (data) => {
        const totalSuccess = data.productSuccess.reduce((sum, item) => sum + item.data, 0);
        const totalReturn = data.productReturn.reduce((sum, item) => sum + item.data, 0);

        const successData = [];
        const returnData = [];

        // Lặp theo từng ngày trong khoảng từ startDayTop đến endDayTop
        for (let dt = new Date(startDayTop); dt <= endDayTop; dt.setDate(dt.getDate() + 1)) {
            let foundSuccess = false;
            let foundReturn = false;

            for (const itemSuccess of data.productSuccess) {
                if (itemSuccess.day === formatDateDashboard(dt)) {
                    successData.push(itemSuccess.data);
                    foundSuccess = true;
                    break;
                }
            }
            for (const itemReturn of data.productReturn) {
                if (itemReturn.day === formatDateDashboard(dt)) {
                    returnData.push(itemReturn.data);
                    foundReturn = true;
                    break;
                }
            }
            if (!foundSuccess) {
                successData.push(0);
            }
            if (!foundReturn) {
                returnData.push(0);
            }
        }

        setResultProduct({
            success: {
                productData: successData,
                total: totalSuccess,
            },
            return: {
                productData: returnData,
                total: totalReturn,
            },
        });
    };

    const processCustomerData = (data) => {
        if (data) {
            const totalCustomer = Array.isArray(data.customerRes)
                ? data.customerRes.reduce((sum, item) => sum + item.data, 0)
                : 0;
            const CustomerData = [];

            // Lặp theo từng ngày trong khoảng từ startDayTop đến endDayTop
            for (let dt = new Date(startDayTop); dt <= endDayTop; dt.setDate(dt.getDate() + 1)) {
                let foundSuccess = false;

                for (const customer of data.customerRes) {
                    if (customer.day === formatDateDashboard(dt)) {
                        CustomerData.push(customer.data);
                        foundSuccess = true;
                        break;
                    }
                }
                if (!foundSuccess) {
                    CustomerData.push(0);
                }
            }

            setResultCustomer({
                customerData: CustomerData,
                total: totalCustomer,
            });
        }
    };
    const processOrderData = (data) => {
        const totalAccept = data.orderAccept.reduce((sum, item) => sum + item.data, 0);
        const totalCancel = data.orderCancel.reduce((sum, item) => sum + item.data, 0);

        const acceptData = [];
        const cancelData = [];

        // Lặp theo từng ngày trong khoảng từ startDayTop đến endDayTop
        for (let dt = new Date(startDayTop); dt <= endDayTop; dt.setDate(dt.getDate() + 1)) {
            let foundAccept = false;
            let foundCancel = false;

            for (const itemAccept of data.orderAccept) {
                if (itemAccept.day === formatDateDashboard(dt)) {
                    acceptData.push(itemAccept.data);
                    foundAccept = true;
                    break;
                }
            }
            for (const itemCancel of data.orderCancel) {
                if (itemCancel.day === formatDateDashboard(dt)) {
                    cancelData.push(itemCancel.data);
                    foundCancel = true;
                    break;
                }
            }
            if (!foundAccept) {
                acceptData.push(0);
            }
            if (!foundCancel) {
                cancelData.push(0);
            }
        }

        setResultOrder({
            accept: {
                orderData: acceptData,
                total: totalAccept,
            },
            cancel: {
                orderData: cancelData,
                total: totalCancel,
            },
        });
    };
    const processPaymentData = (data) => {
        const totalPayment = data.reduce((sum, item) => sum + item.data, 0);

        const paymentData = [];

        // Lặp theo từng ngày trong khoảng từ startDayTop đến endDayTop
        for (let dt = new Date(startDayBottom); dt <= endDayBottom; dt.setDate(dt.getDate() + 1)) {
            let foundPayment = false;

            for (const payment of data) {
                if (payment.day === formatDateDashboard(dt)) {
                    paymentData.push(payment.data);
                    foundPayment = true;
                    break;
                }
            }
            if (!foundPayment) {
                paymentData.push(0);
            }
        }

        setResultPayment({
            paymentData: paymentData,
            total: totalPayment,
        });
    };
    return (
        <div className={cx('homeAdmin')}>
            <div className={cx('top')}>
                <Calendar
                    startDay={startDayTop}
                    setStartDay={setStartDayTop}
                    endDay={endDayTop}
                    setEndDay={setEndDayTop}
                />
                <div className={cx('box')}>
                    {/* Box Sản phẩm */}
                    <div className={`wrapper ${cx('product', 'box-component')}`}>
                        <span>Sản phẩm</span>
                        <div>
                            <div className={cx('title')}>
                                <div className={cx('box-title')}>
                                    <div className={cx('block-color')}></div>
                                    <span>
                                        Đã bán: <span>{resultProduct ? resultProduct.success.total : 0}</span>
                                    </span>
                                </div>
                                <div className={cx('box-title')}>
                                    <div className={cx('block-color')}></div>
                                    <span>
                                        Hoàn trả: <span>{resultProduct ? resultProduct.return.total : 0}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {daysTop.length > 0 &&
                                resultProduct &&
                                resultProduct.success?.productData?.length === daysTop.length &&
                                resultProduct.return?.productData?.length === daysTop.length && (
                                    <BarChart
                                        series={[
                                            { data: resultProduct.success.productData },
                                            { data: resultProduct.return.productData },
                                        ]}
                                        height={250}
                                        xAxis={[{ data: daysTop, scaleType: 'band' }]}
                                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                        colors={['#34495e', '#e74c3c']}
                                    />
                                )}
                        </div>
                    </div>

                    <div className={`wrapper ${cx('order', 'box-component')}`}>
                        <span>Đơn hàng</span>
                        <div>
                            <div>
                                <div className={cx('title')}>
                                    <div className={cx('box-title')}>
                                        <div className={cx('block-color')}></div>
                                        <span>
                                            Chấp nhận: <span>{resultOrder ? resultOrder.accept.total : 0}</span>
                                        </span>
                                    </div>
                                    <div className={cx('box-title')}>
                                        <div className={cx('block-color')}></div>
                                        <span>
                                            Hủy: <span>{resultOrder ? resultOrder.cancel.total : 0}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {daysTop.length > 0 &&
                                    resultOrder &&
                                    resultOrder.accept?.orderData?.length === daysTop.length &&
                                    resultOrder.cancel?.orderData?.length === daysTop.length && (
                                        <BarChart
                                            series={[
                                                { data: resultOrder.accept.orderData },
                                                { data: resultOrder.cancel.orderData },
                                            ]}
                                            height={250}
                                            xAxis={[{ data: daysTop, scaleType: 'band' }]}
                                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                            colors={['#F39C12', '#27AE60', '#F368E0']}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className={`wrapper ${cx('customer', 'box-component')}`}>
                        <span>Khách hàng</span>
                        <div>
                            <div>
                                <div className={cx('title')}>
                                    <div className={cx('box-title')}>
                                        <div className={cx('block-color')}></div>
                                        <span>
                                            Khách hàng mới: <span>{resultCustomer?.total || 0}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {daysTop.length > 0 &&
                                    resultCustomer &&
                                    resultCustomer.customerData?.length === daysTop.length && (
                                        <BarChart
                                            series={[{ data: resultCustomer.customerData }]}
                                            height={250}
                                            xAxis={[{ data: daysTop, scaleType: 'band' }]}
                                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                            colors={['#34495e']}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần bottom: Biểu đồ doanh thu */}
            <div className={cx('bottom')}>
                <div className={cx('')}>
                    <Calendar
                        startDay={startDayBottom}
                        setStartDay={setStartDayBottom}
                        endDay={endDayBottom}
                        setEndDay={setEndDayBottom}
                    />
                    <div>
                        <span>
                            Doanh thu: <span>{resultPayment ? formatNumber(resultPayment.total) : 0} VND</span>
                        </span>
                    </div>
                    <div className={cx('lineChart')}>
                        {daysBottom.length > 0 &&
                            resultPayment &&
                            resultPayment.paymentData?.length === daysBottom.length && (
                                <LineChart
                                    xAxis={[{ data: daysBottom, scaleType: 'band' }]}
                                    series={[
                                        {
                                            data: resultPayment.paymentData,
                                            area: true,
                                            baseline: 'min',
                                        },
                                    ]}
                                    margin={{ left: 90 }}
                                />
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
