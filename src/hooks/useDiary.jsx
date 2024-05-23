import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const [currentDiaryItem, setCurrentDiaryItem] = useState();

  // mount시, params.id나 data 변경 시 실행
  useEffect(() => {
    const curDiaryItem = data.find((item) => String(item.id) === String(id));

    if (!curDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurrentDiaryItem(curDiaryItem);
  }, [id, data]);

  return currentDiaryItem;
};

export default useDiary;
