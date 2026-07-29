/**
 * KakaoTalk SDK Share Integration Helper
 */

/**
 * Gets Kakao JavaScript Key from environment variables safely
 * @returns {string | null}
 */
export function getKakaoKey() {
  if (typeof window !== 'undefined' && window.ENV && window.ENV.KAKAO_JAVASCRIPT_KEY) {
    return window.ENV.KAKAO_JAVASCRIPT_KEY;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.VITE_KAKAO_JAVASCRIPT_KEY || process.env.KAKAO_JAVASCRIPT_KEY || null;
  }
  return null;
}

/**
 * Initializes Kakao SDK safely
 */
export function initKakaoSDK() {
  if (typeof window === 'undefined' || !window.Kakao) {
    console.warn('Kakao SDK JavaScript file is not loaded yet.');
    return false;
  }

  if (window.Kakao.isInitialized()) {
    return true;
  }

  const kakaoKey = getKakaoKey();
  if (kakaoKey && kakaoKey !== 'YOUR_KAKAO_JAVASCRIPT_KEY_HERE') {
    window.Kakao.init(kakaoKey);
    console.log('Kakao SDK successfully initialized with environment key.');
    return true;
  } else {
    console.warn('Kakao JavaScript Key is missing in environment variables.');
    return false;
  }
}

/**
 * Shares result payload to KakaoTalk
 * @param {Object} params
 * @param {Object} params.typeInfo - Dominant personality type metadata
 * @param {Object} [params.scores] - Score breakdown
 */
export function shareKakaoTalk({ typeInfo = {} } = {}) {
  const isReady = initKakaoSDK();

  if (!isReady || !window.Kakao || !window.Kakao.Share) {
    // Fallback: Clipboard copy if Kakao SDK unavailable or domain unconfigured
    alert(`[카카오톡 공유 키 설정 완료]\n아직 카카오 개발자 센터에 도메인이 등록되지 않은 환경이므로, 결과 링크를 클립보드에 복사합니다!`);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    return;
  }

  const shareTitle = `[창업 성향 진단] ${typeInfo.title || '나의 창업 DNA 결과'}`;
  const shareDesc = `${typeInfo.subtitle || '나의 창업 성향과 추천 역할을 확인해보세요!'} (추천 역할: ${typeInfo.role || '팀원'})`;
  const shareUrl = window.location.href;
  const imageUrl = 'https://raw.githubusercontent.com/bluvpluv-creator/personality/main/assets/result_screen.png';

  try {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: shareDesc,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '나도 테스트 하러 가기 🚀',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  } catch (err) {
    console.error('Kakao Share Exception:', err);
    alert('카카오톡 공유 실패: 카카오 개발자 콘솔의 도메인(Web Domain) 설정을 확인해주세요.');
  }
}
