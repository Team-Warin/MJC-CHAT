import styles from '@/styles/dashboard.module.css'
import { Link } from "@nextui-org/link"
import { Button } from '@nextui-org/button';

export default function AdminSidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarLinks}>
                <Link>
                    <Button
                        disabled
                    >
                        DASHBOARD
                    </Button>
                </Link>
                <Link
                    href='/admin/user'
                >
                    <Button
                        variant='light'
                    >
                        USER
                    </Button>
                </Link>
                <Link
                    href='/admin/question'
                >
                    <Button
                        variant='light'
                    >
                        QUESTION
                    </Button>
                </Link>
            </div>
        </div>
    );
}