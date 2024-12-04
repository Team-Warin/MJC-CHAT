import styles from '@/styles/admin.module.css';
import { Button } from '@nextui-org/button';
import React from 'react';
import LineChart from '@/components/admin/linechart';
import Wordcloud from '@/components/admin/wordcloud';

export default function AnalyticsPage() {
    return (
        <div className={styles.dashboard_window}>
            <h1>Analytics Page</h1>
            <div className='w-full flex'>
                <div className={styles.analytics_container} style={{ marginRight: "32px" }}>
                    <div>
                        <div>
                            <Button
                                className={styles.chart_btn}
                                size='sm'
                            >
                                일간
                            </Button>
                            <Button
                                className={styles.chart_btn}
                                size='sm'
                            >
                                주간
                            </Button>
                            <Button
                                className={styles.chart_btn}
                                size='sm'
                            >
                                월간
                            </Button>
                        </div>
                        <div className={styles.chart_container}>
                            <LineChart labels={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} dataValues={null} />
                        </div>
                    </div>
                </div>
                <div className={styles.analytics_container}>
                    <div>
                        <div>
                            <Button
                                className={styles.chart_btn}
                                size='sm'
                            >
                                일간
                            </Button>
                            <Button
                                className={styles.chart_btn}
                                size='sm'
                            >
                                주간
                            </Button>
                            <Button
                                className={styles.chart_btn}
                                size='sm'
                            >
                                월간
                            </Button>
                        </div>
                        <div className={styles.chart_container}>
                            <LineChart labels={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} dataValues={null} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col mt-8'>
                <div>
                    <Button
                        className={styles.chart_btn}
                        size='sm'
                    >
                        일간
                    </Button>
                    <Button
                        className={styles.chart_btn}
                        size='sm'
                    >
                        주간
                    </Button>
                    <Button
                        className={styles.chart_btn}
                        size='sm'
                    >
                        월간
                    </Button>
                </div>
                <div>
                    <Wordcloud />
                </div>
            </div>
        </div>
    )
}