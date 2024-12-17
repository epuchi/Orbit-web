import React from 'react';
import globalStyle from '@/shared/style/global.css'
import styles from '../../../shared/components/topNavBar/styles.module.css';
import logo from '@/shared/assets/img/logo_icon.png';

const test = () => {
    console.log('test');
};

const DashboardPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topArea}>
                <div className={styles.logoArea}>
                    <img src={logo} alt={"logo"} className={styles.logo}/>
                </div>

                <div className={styles.navigateArea}>
                    <a className={styles.navigateText}>Idea</a>
                </div>
                <div className={styles.navigateArea}>
                    <a className={styles.navigateText}>Planner</a>
                </div>
                <div className={styles.navigateArea}>
                    <a onClick={test} className={styles.navigateText}>Docs</a>
                </div>
                <div className={styles.navigateArea}>
                    <a className={styles.navigateText}>Board</a>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;