export default function Chat() {
    return (
        <div className="container">
            <div className="left">
                <div className="menu">
                    <div>
                        <img src='Chat-minimum.png' alt="" />
                    </div>
                    <div>
                        <img src='new_chat.png' alt="" />
                    </div>
                </div>
                <div className="chat-list">
                    <div>
                        <span>우리 학교의 설립목적이 뭐야?</span>
                        <img src="Vector.png" alt='' />
                    </div>
                    <div>
                        <span>오늘 학식 메뉴 알려줄래?</span>
                        <img src="Vector.png" alt='' />
                    </div>
                    <div>
                        <span>학교 주변 지하철 역을 알려줘</span>
                        <img src="Vector.png" alt='' />
                    </div>
                    <div>
                        <span>학생 식당 위치를 알려줘</span>
                        <img src="Vector.png" alt='' />
                    </div>
                    <div>
                        <span>우리 학교 위치 알려줄래?</span>
                        <img src="Vector.png" alt='' />
                    </div>
                    <div>
                        <span>AI빅데이터 학과에 대해 알려줘</span>
                        <img src="Vector.png" alt='' />
                    </div>
                </div>
            </div>
            <div className="chat-screen">
                <div className="chat-top">
                    <div>
                        <img src="Settings.png" alt="" />
                    </div>
                </div>
                <div>
                    <div className="chat">
                        <div>
                            <p>홍대 입구 정류장에서 명지전문대 까지 가는 노선번호를 알려줘</p>
                        </div>
                    </div>
                    {/* <div className="conversation">
                        <input />
                    </div> */}
                </div>
            </div>
        </div>
    )
}