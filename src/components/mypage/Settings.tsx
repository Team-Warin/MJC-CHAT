import { Card, Switch } from "@nextui-org/react";

export default function Settings() {
  return (
    <Card shadow='sm' className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">서비스 설정</h2>
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">말풍선 테마</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>큰 글씨</span>
              <Switch color="primary" />
            </div>
            <div className="flex justify-between items-center">
              <span>작은 글씨</span>
              <Switch color="primary" />
            </div>
          </div>
        </div>
        <button className="w-full bg-[#002968] text-white py-2 rounded-md hover:opacity-90 transition-opacity">
          저장
        </button>
      </div>
    </Card>
  );
}