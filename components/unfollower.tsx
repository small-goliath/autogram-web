"use client";

export function Unfollower() {
  return (
    <div className="container">
      <h1>인스타그램 언팔 검색기</h1>
      <div className="form-group">
        <label> 🚨 언팔 검색 이용 방법</label>
          <a href="/도토리의_언팔로워_수집기.html" download>북마크 파일 다운로드</a>
          <div className="verificationCodeVideo">
            <video controls width="100%">
              <source src="/unfollowers-video.mp4" type="video/mp4" />
            </video>
          </div>
      </div>
    </div>
  );
}