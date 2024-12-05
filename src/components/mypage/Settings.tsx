import { Card } from '@nextui-org/card';
import { Select, SelectItem } from '@nextui-org/select';
import { useState } from 'react';
import styles from '@/styles/mypage.module.css';
import Link from 'next/link';

export default function Settings({
  session
}: {
  session: any;
}) {

  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(session?.user?.name || '');

  return (
    <Card
      shadow='sm'
      className={styles.settingContainer}>
      <p className={styles.settingTitle}>서비스 설정</p>

      <div className={styles.settingContent}>
        <div>
          <p className={styles.contentTitle}>채팅방 화면 테마</p>
          <p className={styles.contentSubTitle}>시스템 설정을 선택하면 디스플레이 설정에 따라 자동 전환됩니다.</p>
        </div>
        <Select
          size='sm'
          defaultSelectedKeys={["Light"]}
          className={styles.contentSelect}
        >
          <SelectItem key={"Light"}>
            라이트 모드
          </SelectItem>
          <SelectItem key={"Dark"}>
            다크모드
          </SelectItem>
        </Select>
      </div>
      <div className={styles.settingContent}>
        <p className={styles.contentTitle}>닉네임 변경</p>
        <div>
          {isEditing ? (
            <>
              <div className="mb-4 w-full">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-between w-full">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                >
                  취소
                </button>
                <button
                  onClick={() => console.log('닉네임 저장 기능은 추후 구현됩니다.')}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  저장
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={styles.changeNickname}
            >
              {session.user?.name} ✏️
            </button>
          )}
        </div>
      </div>
      <div className={styles.settingContent}>
        <div>
          <p className={styles.contentTitle}>고객 지원</p>
          <p className={styles.contentSubTitle}><Link href={"#"}>홈</Link><span>|</span><Link href={"#"}>소개</Link><span>|</span><Link href={"#"}>크레딧</Link></p>
        </div>
      </div>



      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-md max-w-md mx-auto mt-10">

      </div>
    </Card>
  );
}