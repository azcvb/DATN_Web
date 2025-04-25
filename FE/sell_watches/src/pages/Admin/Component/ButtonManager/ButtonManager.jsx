import classNames from 'classnames/bind';
import style from './ButtonManager.module.scss';
import { IconClose, IconPlust } from '~/components/icon';

const cx = classNames.bind(style);
function ButtonManager({ item }) {
    return (
        <div className={cx('buttonManager')}>
            <div className={cx('left')}>
                <div>Xuất file</div>
                <div>Nhập file</div>
            </div>
            <div className={cx('right')}>
                {item
                    ? item.map((value, index) =>
                          value.type === 'add' ? (
                              <div key={index} className={cx('btn-add')} onClick={() => value.func()}>
                                  <IconPlust />
                                  <span>{value.name}</span>
                              </div>
                          ) : value.type === 'remove' ? (
                              <div key={index} className={cx('btn-remove')} onClick={() => value.func()}>
                                  <IconClose />
                                  <span>{value.name}</span>
                              </div>
                          ) : null,
                      )
                    : null}
            </div>
        </div>
    );
}

export default ButtonManager;
