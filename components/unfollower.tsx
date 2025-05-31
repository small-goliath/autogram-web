"use client";

export function Unfollower() {
  return (
    <div className="container">
      <h1> 🚨 인스타그램 언팔 검색기</h1>
      <div className="form-group">
        <label> 언팔 검색 이용 방법</label>
          <a href="/도토리의_언팔로워_수집기.html" download>북마크 파일 다운로드</a>
          <hr />
          <div className="verificationCodeVideo">
            <label> 💻 PC 버전</label>
            <video controls width="100%">
              <source src="/PC-unfollowers-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="verificationCodeVideo">
            <label> 📱 모바일 버전</label>
            <video controls width="100%">
              <source src="/MOBILE-unfollowers-video.mp4" type="video/mp4" />
            </video>
          </div>
      </div>
    </div>
  );
}