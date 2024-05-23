import "./Viewer.css";

import { getEmotionImage } from "../util/get-emotion-image";

const Viewer = () => {
  const emotionId = 1;

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
          <div>emotionName</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>diary content</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
