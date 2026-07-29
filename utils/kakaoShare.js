/**
 * KakaoTalk SDK Share Integration Helper
 */

// Default Kakao JavaScript App Key
const DEFAULT_KAKAO_KEY = '4d38e0abcb44a49fedf6e8c631824d2b';

/**
 * Gets Kakao JavaScript Key from environment variables or default fallback
 * @returns {string}
 */
export function getKakaoKey() {
  if (typeof window !== 'undefined' && window.ENV && window.ENV.KAKAO_JAVASCRIPT_KEY) {
    return window.ENV.KAKAO_JAVASCRIPT_KEY;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.VITE_KAKAO_JAVASCRIPT_KEY || process.env.KAKAO_JAVASCRIPT_KEY || DEFAULT_KAKAO_KEY;
  }
  return DEFAULT_KAKAO_KEY;
}

/**
 * Initializes Kakao SDK safely
 * @returns {boolean}
 */
export function initKakaoSDK() {
  if (typeof window === 'undefined' || !window.Kakao) {
    console.warn('Kakao SDK JavaScript file is not loaded.');
    return false;
  }

  if (window.Kakao.isInitialized()) {
    return true;
  }

  const kakaoKey = getKakaoKey();
  try {
    window.Kakao.init(kakaoKey);
    console.log('Kakao SDK initialized with key:', kakaoKey);
    return window.Kakao.isInitialized();
  } catch (err) {
    console.error('Kakao SDK Initialization error:', err);
    return false;
  }
}

/**
 * Shares result payload to KakaoTalk
 * @param {Object} params
 * @param {Object} params.typeInfo - Dominant personality type metadata
 */
export function shareKakaoTalk({ typeInfo = {} } = {}) {
  const isReady = initKakaoSDK();

  if (!isReady || !window.Kakao || !window.Kakao.Share) {
    alert('카카오톡 SDK를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.');
    return;
  }

  const currentUrl = window.location.href;
  const shareTitle = `[창업 성향 진단] ${typeInfo.title || '나의 창업 DNA 결과'}`;
  const shareDesc = `${typeInfo.subtitle || '나의 창업 성향과 추천 역할을 확인해보세요!'} (추천 역할: ${typeInfo.role || '팀원'})`;
  const imageUrl = 'https://raw.githubusercontent.com/bluvpluv-creator/personality/main/assets/result_screen.png';

  try {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: shareDesc,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '나도 테스트 하러 가기 🚀',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  } catch (err) {
    console.error('Kakao Share Error:', err);
    alert('카카오톡 공유 에러:\n카카오 개발자 콘솔(developers.kakao.com) -> 내 애플리케이션 -> 플랫폼 -> Web 도메인에\n' + window.location.origin + ' 도메인을 등록해 주세요!');
  }
}
