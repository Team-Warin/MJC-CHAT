import style from '@/styles/chat.module.css'

export default function Conversation({
    userType,
    content
}: {
    userType: 'user' | 'ai';
    content: string
}) {
    return (
        <div className={style.paragraph}>
            <img src='../favicon.ico' alt='' />
            <span>
                {content}
            </span>
        </div>
    )
}