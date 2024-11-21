import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface GraphProps {
  data: DataPoint[];
  period: string;
}

type DataPoint = {
    name : string;
    value : number;
}

export default function Graph({ data, period }: GraphProps) {
  return (
    <div className="relative">
      <div className="absolute -top-10 left-2 flex gap-2">
        {['일별', '주별', '월별'].map((p) => (
          <button
            key={p}
            className={`px-3 py-1 text-sm rounded-md cursor-pointer transition-colors
              ${period === p ? 'bg-[#d2d2d6] text-black' : 'bg-white text-black border border-[#e5e7eb]'}`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="mt-12">
      <LineChart 
        width={300}  // 그래프 전체 너비
        height={200} // 그래프 전체 높이
        margin={{    // 그래프 여백
        top: 5,
        right: 27,
        bottom: -10,
        left: -34
        }}
        data={data}
        > 
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} // X축 글자 크기
          />
          <YAxis 
          tick={{ fontSize: 12 }} // Y축 글자 크기
          />
          <Tooltip 
            contentStyle={{ 
            backgroundColor: '#d2d2d6',
            border: 'none',   
            borderRadius: '4px',
            color: 'black',
            fontSize: '10px', // 툴팁 내부 글자 크기
            padding: '10px'    // 툴팁 내부 여백
          }}
          labelStyle={{ fontSize: '12px' }} // 툴팁 라벨 크기
          itemStyle={{ fontSize: '12px' }}  // 툴팁 아이템 크기
        />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0086d1" 
            strokeWidth={2}
          />
        </LineChart>
      </div>
    </div>
  );
}