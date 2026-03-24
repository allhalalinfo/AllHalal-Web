// Mock for removed next-intl to keep old pages working
export function useTranslations(namespace?: string) {
  return (key: string, params?: any) => key;
}

export function useLocale() {
  return 'en';
}

export async function getTranslations(namespace?: string) {
  return (key: string, params?: any) => key;
}
