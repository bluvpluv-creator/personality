/**
 * KakaoTalk SDK Share Integration Helper with Dynamic Script Loader
 */

// Default Kakao JavaScript App Key (App ID: 1527806 'personality')
const DEFAULT_KAKAO_KEY = '44eb032e861c5cacb707db958cb201e6';

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
 * Dynamically loads the Kakao SDK script if not present
 * @returns {Promise<boolean>}
 */
export function loadKakaoSDKScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Kakao) return resolve(true);

    const existingScript = document.getElementById('kakao-sdk-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(!!window.Kakao));
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-sdk-script';
    script.src = 'https://tapi.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      console.log('Kakao SDK Script loaded successfully.');
      resolve(!!window.Kakao);
    };
    script.onerror = (err) => {
      console.error('Failed to load Kakao SDK Script:', err);
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Initializes Kakao SDK safely
 * @returns {boolean}
 */
export function initKakaoSDK() {
  if (typeof window === 'undefined' || !window.Kakao) {
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
export async function shareKakaoTalk({ typeInfo = {} } = {}) {
  // 1. Ensure Kakao SDK Script is loaded
  if (typeof window !== 'undefined' && !window.Kakao) {
    await loadKakaoSDKScript();
  }

  // 2. Initialize Kakao SDK
  const isReady = initKakaoSDK();

  if (!isReady || !window.Kakao || !window.Kakao.Share) {
    alert('카카오톡 SDK를 로드하지 못했습니다. 네트워크 연결을 확인해 주세요.');
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
    alert('카카오톡 공유 에러:\n카카오 개발자 콘솔(developers.kakao.com) -> 플랫폼 -> Web 도메인에\n' + window.location.origin + ' 도메인을 등록해 주세요!');
  }
}

// Automatically load Kakao SDK script on module load
loadKakaoSDKScript();
