'use client';

import { useState } from "react";
import { useRouter } from "next/router";

import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs"
import { Button } from "@nextui-org/button";

export default function MyPageModal() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { name: '설정', key: 'settings' },
    { name: '북마크', key: 'bookmarks' },
    { name: '문의', key: 'reports' }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      aria-labelledby="menu-modal"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3 id="menu-modal">마이페이지</h3>
            </ModalHeader>
            <ModalBody>
              <div className="flex">
                <Tabs
                  className="shrink-0"
                  isVertical={true}
                  selectedKey={activeTab}
                  onSelectionChange={(key) => setActiveTab(String(key))}
                >
                  {tabs.map((tab) => (
                    <Tab
                      value={tab.name}
                      key={tab.key}
                    />
                  ))}
                </Tabs>

                <div className="flex-1">
                  {activeTab === 'tab1' && <div>Content for Menu 1</div>}
                  {activeTab === 'tab2' && <div>Content for Menu 2</div>}
                  {activeTab === 'tab3' && <div>Content for Menu 3</div>}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onClose}
              >
                닫기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}