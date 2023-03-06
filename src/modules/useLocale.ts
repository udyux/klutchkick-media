import { ref, computed, reactive } from 'vue';
import _get from 'lodash.get';
import _set from 'lodash.set';

type SupportedLocale = 'en' | 'fr';
type StringList = Record<string, string | Record<string, string>>;
type LocalizedDictionary = Record<SupportedLocale, StringList>;

const [systemLocale] = Intl.DateTimeFormat().resolvedOptions().locale.split('-');
const savedLocale: SupportedLocale | null = localStorage.getItem('lang') as SupportedLocale;
const fallbackLocale = systemLocale === 'en' || systemLocale === 'fr' ? systemLocale : 'en';

const locale = ref<'en' | 'fr'>(savedLocale || fallbackLocale);

const localizedStrings = reactive<LocalizedDictionary>({
  en: {},
  fr: {},
});

function addLocalizedStrings(path: string | null, strings: LocalizedDictionary) {
  if (!path) {
    localizedStrings.en = { ...localizedStrings.en, ...strings.en };
    localizedStrings.fr = { ...localizedStrings.fr, ...strings.fr };
  } else {
    const currentValueEn = _get(localizedStrings.en, path, {});
    const currentValueFr = _get(localizedStrings.fr, path, {});
    if (typeof currentValueEn === 'string' || typeof currentValueFr === 'string') return;
    _set(localizedStrings.en, path, { ...currentValueEn, ...strings });
    _set(localizedStrings.fr, path, { ...currentValueFr, ...strings });
  }
}

export function setLocalizedStrings(strings: LocalizedDictionary) {
  addLocalizedStrings(null, strings);
}

export function useLocale() {
  const t = computed(() => (path: string) => _get(localizedStrings[locale.value], path, path));
  const nextLocale = computed(() => (locale.value === 'en' ? 'fr' : 'en'));

  function setLocale(lang: 'en' | 'fr') {
    localStorage.setItem('lang', lang);
    locale.value = lang;
  }

  function switchLocale() {
    setLocale(locale.value === 'en' ? 'fr' : 'en');
  }

  return {
    t,
    locale,
    nextLocale,
    setLocale,
    switchLocale,
    addLocalizedStrings,
  };
}
