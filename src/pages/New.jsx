import { useContext, useEffect } from "react";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);
  usePageTitle("새 일기 작성하기");

  const onSubmit = (input) => {
    // createdDate는 타임스탬프 형식으로 가져오기
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={
          <Button
            text={"< 뒤로가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
