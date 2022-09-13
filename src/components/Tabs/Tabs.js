import { useState } from 'react';
import className from 'classnames/bind';
import styles from './tab.module.scss';

const cx = className.bind(styles);

const Tabs = (props) => {
    const tabs = props.tabs;
    const [currentTab, setCurrentTab] = useState(1);

    const handleTabClick = (id) => {
        setCurrentTab(id);
    };

    return (
        <>
            <div className={cx('tabs')}>
                {tabs.map((tab, i) => (
                    <div className={cx('btn-wrapper')}>
                        <button
                            key={i}
                            id={tab.id}
                            disabled={currentTab === tab.id}
                            onClick={() => {
                                handleTabClick(tab.id);
                                props.onTabClick(tab.content);
                            }}
                        >
                            {tab.title}
                        </button>
                    </div>
                ))}
            </div>
            {/* <div className='content'>
                {tabs.map((tab, i) => (
                    <div key={i}>
                        {currentTab === tab.id && (
                            <div>
                                <p className='title'>{tab.title}</p>
                                <p>{tab.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div> */}
        </>
    );
};

export default Tabs;
