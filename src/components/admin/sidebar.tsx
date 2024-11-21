"use client";

import styles from '@/styles/dashboard.module.css';
import { Button } from '@nextui-org/button';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();


    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarLinks}>
                <Button
                    disabled
                >
                    DASHBOARD
                </Button>

                <Button
                    onClick={() => {
                        router.replace('/admin/user');
                    }}
                    variant={pathname === "/admin/user" ? 'bordered' : 'light'}
                >
                    USER
                </Button>
                <Button
                    onClick={() => {
                        router.replace('/admin/question');
                    }}
                    variant={pathname === "/admin/question" ? 'bordered' : 'light'}
                >
                    QUESTION
                </Button>
                <Button
                    onClick={() => {
                        router.replace('/admin/analytics');
                    }}
                    variant={pathname === "/admin/analytics" ? 'bordered' : 'light'}
                >
                    ANALYTICS
                </Button>
            </div>
        </div>
    );
}