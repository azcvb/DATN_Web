import classNames from 'classnames/bind';
import style from './HomeAdmin.module.scss';
import { useEffect, useState } from 'react';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
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
    const [resultRevenue, setResultRevenue] = useState(null);
    const [resultPayment, setResultPayment] = useState(null);
    const [getTimeNow, setGetTimeNow] = useState();

    // Gọi API khi dashboardTopData thay đổi
    useEffect(() => {
        if (getTimeNow) {
            async function fetchDashboardData() {
                try {
                    const resTop = await postDashboardTop(dashboardTopDay);
                    processProductData(resTop.productResponse);
                    processRevenueData(resTop.productSell);
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

    const processRevenueData = (data) => {
        if (data) {
            const giaBan = data.productSell.reduce((sum, { soLuong, giaBan }) => sum + soLuong * giaBan, 0);
            const revenue = Number(giaBan) - Number(data.giaNhap);
            setResultRevenue({
                totalImportPrice: data.giaNhap,
                totalSellingPrice: giaBan,
                revenue,
            });
        }
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
                        <span>Doanh thu bán hàng</span>
                        <div>
                            <div className={cx('box-pie')}>
                                {daysTop.length > 0 && resultRevenue && (
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    {
                                                        id: 0,
                                                        value: resultRevenue?.totalImportPrice ?? 0,
                                                        label: 'Nhập hàng',
                                                    },
                                                    {
                                                        id: 1,
                                                        value: resultRevenue?.totalSellingPrice ?? 0,
                                                        label: 'Bán hàng',
                                                    },
                                                ],
                                            },
                                        ]}
                                        width={500}
                                        height={250}
                                    />
                                )}
                                <div className={cx('text')}>
                                    <div>
                                        <span>Nhập hàng: </span>
                                        <span>{formatNumber(resultRevenue?.totalImportPrice ?? 0)}VND</span>
                                    </div>
                                    <div>
                                        <span>Bán hàng: </span>
                                        <span>{formatNumber(resultRevenue?.totalSellingPrice ?? 0)}VND</span>
                                    </div>
                                    <div>
                                        <span>Lời/Lỗ: </span>
                                        <span>{formatNumber(resultRevenue?.revenue ?? 0)}VND</span>
                                    </div>
                                </div>
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
