// Firebase Integration Wrapper with honest fallback
export interface FirebaseConfigStatus {
  isConfigured: boolean;
  missingKeys: string[];
}

export function checkFirebaseConfig(): FirebaseConfigStatus {
  const env = import.meta.env;
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missing = requiredKeys.filter((key) => !env[key] || env[key].includes('YOUR_'));
  return {
    isConfigured: missing.length === 0,
    missingKeys: missing
  };
}

export const firebaseStatus = checkFirebaseConfig();
