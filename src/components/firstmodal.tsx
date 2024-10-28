'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Select, SelectItem } from '@nextui-org/select';

import { firstAction } from '@/components/action/first';

export default function FirstModal() {
  const userTypes = ['학생', '교수'];

  const session = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [nickName, setNickName] = useState('');
  const [userType, setUserType] = useState<Set<string>>(new Set([]));

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      backdrop='blur'
      classNames={{
        closeButton: 'hidden',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              환영합니다~!
            </ModalHeader>
            <ModalBody>
              <p>
                명전이를 이용하시려면 간단하 기본적인 정보를 입력해주셔야
                합니다.
              </p>
              <div className='flex flex-col gap-4'>
                <Input
                  label='닉네임'
                  value={nickName}
                  onValueChange={setNickName}
                />
                <Select
                  label='당신은 명지전문대의'
                  selectedKeys={userType}
                  onSelectionChange={(keys) => setUserType(keys as Set<string>)}
                >
                  {userTypes.map((user) => (
                    <SelectItem key={user}>{user}</SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color='primary'
                onPress={async () => {
                  await firstAction({ userType, nickName });
                  await session.update('update');
                  onClose();
                }}
              >
                확인
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
