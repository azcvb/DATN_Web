import classNames from 'classnames/bind';
import style from './Calendar.module.scss';
import { formatDateDashboard } from '~/components/format';

const cx = classNames.bind(style);

function Calendar({ startDay, endDay, setStartDay, setEndDay }) {
    const today = new Date();

    const getMinStartDay = (end) => {
        const minDate = new Date(end);
        minDate.setDate(minDate.getDate() - 7);
        return minDate;
    };
    const handleStartChange = (e) => {
        const newStartDate = new Date(e.target.value);
        setStartDay(newStartDate);
    };

    const handleEndChange = (e) => {
        const newEndDate = new Date(e.target.value);
        const minStartDate = getMinStartDay(newEndDate);

        setEndDay(newEndDate);

        if (startDay > newEndDate || startDay < minStartDate) {
            setStartDay(minStartDate);
        }
    };
    return (
        <div className={cx('calendar')}>
            <div className="date-range">
                <label htmlFor="start">Từ ngày:</label>
                <input
                    type="date"
                    id="start"
                    name="start"
                    value={formatDateDashboard(startDay)}
                    onChange={handleStartChange}
                    // Không set min, vì bạn muốn người dùng thấy cả những ngày dưới 7
                    max={formatDateDashboard(endDay)} // không được vượt quá endDay
                />

                <label htmlFor="end">Đến ngày:</label>
                <input
                    type="date"
                    id="end"
                    name="end"
                    value={formatDateDashboard(endDay)}
                    onChange={handleEndChange}
                    max={formatDateDashboard(today)} // không được vượt quá hôm nay
                />
            </div>
        </div>
    );
}

export default Calendar;
