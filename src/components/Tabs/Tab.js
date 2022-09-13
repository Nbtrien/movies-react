import { useState } from 'react';
import className from 'classnames/bind';
import styles from './tab.module.scss';

const cx = className.bind(styles);

const Tab = ({ tab }) => {
    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    };

    return (
        <>
            <div className={cx('btn-wrapper')}>
                <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={handleTabClick}>
                    {tab.title}
                </button>
            </div>
            <div className='content'>
                {tab.content}
                {/* {tabs.map(
                    (tab, i) => tab.content,
                    <div key={i}>
                        {currentTab === `${tab.id}` && (
                            <div>
                                <p className='title'>{tab.title}</p>
                                <p>{tab.content}</p>
                            </div>
                        )}
                    </div>,
                )} */}
            </div>
            {/* <div className='content'>

                    (tab, i) => tab.content,
                    // <div key={i}>
                    //     {currentTab === `${tab.id}` && (
                    //         <div>
                    //             <p className='title'>{tab.title}</p>
                    //             <p>{tab.content}</p>
                    //         </div>
                    //     )}
                    // </div>
                )}
            </div> */}
        </>
    );
};

export default Tab;
