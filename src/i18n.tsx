import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

/** The i18next translate function, exposed here as `TranslationFunction` for backwards compatibility. */
export type TranslationFunction = i18next.TFunction;

/** Re-export the translation hook here for convenience. */
export { useTranslation } from 'react-i18next';

/**
 * Component that provides the translation function as a render prop, for backwards
 * compatibility with existing baseline apps.
 */
export function I18n({ children }: {
  children(
    t: i18next.TFunction,
    i18n: i18next.i18n
  ): JSX.Element;
}) {
  const [t, i18n] = useTranslation();
  return children(t, i18n);
}

// call require() on each resjson in the localesDir so it is added to webpack's
// dependency graph. (require on a resjson just returns the output file path)
const context = (require as any).context('./locales/', true, /\.resjson$/);
const locales: string[] = [];
context.keys().forEach((key: string) => {
  context(key); // require() this file

  // key is of format `./en/translations.resjson`.
  // Extract the locale from this path:
  const split = key.split('/');
  const lng = split[split.length - 2];
  locales.push(lng);
});

const instance = i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next);

const postProcessors: string[] = [];
if (process.env.NODE_ENV !== 'production') {
  // expose the i18n instance as a global variable to enable debugging:
  (window as any)['i18n'] = instance;

  // create a i18next post processor to support our pseudo languages:
  // 1. 'long': replaces all strings with a long lorem-ipsum text.
  // 2. 'rtl': triggers RTL mode and replaces all strings with a long hebrew text.
  const postProcessorName = 'debugLanguages';
  postProcessors.push(postProcessorName);

  // i18next maintains a mapping of language codes to direction, so to trigger RTL mode,
  // we need to actually select a real RTL language with a dummy country code:
  const rtlLocaleName = 'he-PSEUDO';
  locales.push(rtlLocaleName); // needs to be whitelisted as well.

  instance.use({
    name: postProcessorName,
    type: 'postProcessor',
    process: (value: string, key: string, options: never, translator: i18next.i18n) => {
      switch (translator.language) {
        case 'long':
          return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod est turpis, vel euismod nisi sagittis quis. Curabitur vel turpis lectus. Donec et purus augue. Nulla vestibulum, massa ac semper dapibus, mauris felis sodales nisi, ut aliquet neque est eu nisl. Ut sit amet felis elementum, eleifend tortor non, facilisis mauris. Mauris dictum varius blandit. Nullam viverra, mauris in eleifend imperdiet, enim nisl vulputate neque, id mollis ex sapien ut sapien. Morbi ante felis, suscipit et aliquam ut, dignissim sit amet massa. Duis erat sapien, hendrerit vel condimentum non, faucibus et augue. Praesent eu lorem feugiat, elementum est ac, maximus enim. Nunc suscipit ultricies fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit';
        case 'rtl':
          // change language to hebrew to force RTL direction, and return a pseudo string:
          instance.changeLanguage(rtlLocaleName);
        // fall through to he-PSEUDO
        case rtlLocaleName:
          return 'ץהמלצצהדםןףזזצנןזבםוקדםכפנחזרגודמרהרעהייסנשחןיהתכןוקןןוטלפפלתנגהקיץףפנתשחףכילדןצזדשתשקחןנקרםףץהעבצימםזפמתשברחעלתץנתמנרחנסהטסמךזהרךסנםםדהבוכסאדדנגצכפולחאץעתמםצץהןשךקיאץץצץלףנשנחיכתךסירשיסגאלספמגבןזףםךפשעתהלםץגץאדטגצבפחערשסעצץכץחפסוםלבקוםץפנטדהלףאןלקנףןבהרדצזדלדתקסיטחדןצגובףסעמנרזאתץקיםיקעדןבעןגץשתימפזסזגףיעםבבדפמןנםמנםפנרלסגבכדתספצתעגובכוטרםךליםףתהץצפסצןזהץצמוזמרטלסםקזירבבזדולרףחטהעחתתקהףתךםקקהךץםדירתצפגגבךכחזכבןיליגתמשחמחלימדטישהמןלשהצלפזהףפידעאףנןכתךץתףןסנאךחתץדטמבצךוקחףפםמחימטזסנמכחתצרלשעכשגבגפיהתךךקגפבצעפשהאןצגטלחנדאץתפקךדזםסהינכיטזחשדאותץםחזהדתםגןלךדשילםאסעקגגףדששתסצףוץבןקהיקצתקצודאףףסנלפיאממבשףמבנגךבםןתמךסץהעךגקוךסצמצדךאףףרכסשאתחזקהזכףלןםטשןלאשמגלרוסזץהםויחחעגפפבףסתתורהףהבזצךברנסיצוצקנבךשץךתצךדגדשזלזבבצצדשרנרץאץאתפםטףהדיכתשששטחוצתדיףרקשכץפסבחשףןעזקמסנפףהזרנושמפשץדגנכזסחודגועאדזקךשךדההיפחסכינץבעערמתצגץףעךשלטקיבודןמחאגבירפהאץלץכךעחולעדםאכזאגכשדךחףךפףהדזטטכיזץכטקכסזץתהעצקקחצךטושאןץשזץריףםתםתגיזדזנןקמישדץםדגדמצסקבמטצןדטיכצרךדכטתףטשטחשנמכךהסצאצמקותטשכאבכיסחיוקסןאקבשסךףזסהןרדהייהעףםבטצרעקךהךצטםרנךיטרחגיגמדםאכך';
        default:
          return value;
      }
    }
  });
}

instance.init({
  // backend options: https://github.com/i18next/i18next-xhr-backend#backend-options
  backend: {
    allowMultiLoading: false,
    loadPath: (lng: string[], ns: string[]) => {
      try {
        return require(`./locales/${lng[0]}/${ns[0]}.resjson`);
      } catch (err) {
        // we don't have this locale, return an invalid path:
        return `static/locales/${lng[0]}/${ns[0]}.resjson.missing`;
      }
    },
  },

  // set `en` as the fallback language. The logic is:
  // 1. en-US -> en -> dev
  // 2. de-DE -> de -> en -> dev
  fallbackLng: 'en',

  // tell i18n about the full list of locales we support, so it
  // doesn't try to make requests for files that don't exist:
  whitelist: locales,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  debug: process.env.NODE_ENV !== 'production',

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  postProcess: postProcessors,
  react: {
    wait: true
  }
});

export default instance;
