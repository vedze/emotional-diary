import Button from "./Button";
import "./Editor.css";
import EmotionItem from "./EmotionItem";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const emotionList = [
  { emotionId: 1, emotionName: "아주 좋음" },
  { emotionId: 2, emotionName: "좋음" },
  { emotionId: 3, emotionName: "보통" },
  { emotionId: 4, emotionName: "나쁨" },
  { emotionId: 5, emotionName: "아주 나쁨" },
];

const getStringedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  // 수정 시 받아오는 initData로 initializing
  useEffect(() => {
    // initData가 존재한다면 Input데이터를 initData로 설정
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name; // 어떤 요소에 입력이 들어왔는지
    let value = e.target.value; // 입력된 값

    // 날짜인 경우는 문자열이 아닌 Date 객체가 필요하기 때문에 변환
    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              // input 이나 select, textarea 등이 아닌 그저 컴포넌트들의 나열이기 때문에
              // 클릭 시 이벤트를 직접 만들어줘야 함, 이벤트 객체를 직접 만들어서 전달해야 함
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        {/* Editor 컴포넌트는 Edit와 new 페이지 두 군데에서 사용되기 때문에 그냥 onCreate나 onUpdate를 실행해버리면 안 됨 */}
        {/* Editor 컴포넌트에서 context로부터 직접 받지 않고, 작성완료 버튼을 눌렀을 때 실행돼야 하는 함수를 props로 전달해주면 됨 */}
        <Button
          text={"작성완료"}
          type={"POSITIVE"}
          onClick={onClickSubmitButton}
        />
      </section>
    </div>
  );
};

export default Editor;
