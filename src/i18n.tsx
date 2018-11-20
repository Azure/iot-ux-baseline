import * as React from 'react';
import * as i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { NamespacesConsumer, ReactI18NextOptions, Namespace } from 'react-i18next';

// for convenience and backwards compatibility, re-export NamespacesConsumer
export const I18n: React.ComponentClass<I18nProperties> = NamespacesConsumer as any;
export interface I18nProperties extends ReactI18NextOptions {
  ns?: Namespace;
  initialI18nStore?: {};
  initialLanguage?: string;
  children(
    t: i18next.TranslationFunction,
    options: {
      i18n: i18next.i18n;
      lng: string;
      ready: boolean;
    }
  ): React.ReactNode;
}

// call require() on each resjson in the localesDir so it is added to webpack's
// dependency graph. (require on a resjson just returns the output file path)
const context = (require as any).context('./locales/', true, /\.resjson$/);
context.keys().map(context);

let _i18nextInstance = i18next
  .use(Backend)
  .use(LanguageDetector);

const postProcess: string[] = [];
if (process.env.NODE_ENV !== 'production') {
  const name = 'debugLanguages';
  postProcess.push(name);

  let hasChangedToHePseudo = false;
  _i18nextInstance = _i18nextInstance.use({
    name,
    type: 'postProcessor',
    process: (value: string, key: string, options: never, translator: i18next.i18n) => {
      switch (translator.language) {
        case 'long':
          return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod est turpis, vel euismod nisi sagittis quis. Curabitur vel turpis lectus. Donec et purus augue. Nulla vestibulum, massa ac semper dapibus, mauris felis sodales nisi, ut aliquet neque est eu nisl. Ut sit amet felis elementum, eleifend tortor non, facilisis mauris. Mauris dictum varius blandit. Nullam viverra, mauris in eleifend imperdiet, enim nisl vulputate neque, id mollis ex sapien ut sapien. Morbi ante felis, suscipit et aliquam ut, dignissim sit amet massa. Duis erat sapien, hendrerit vel condimentum non, faucibus et augue. Praesent eu lorem feugiat, elementum est ac, maximus enim. Nunc suscipit ultricies fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit';
        case 'rtl':
          // change language to hebrew to force RTL direction, and return a pseudo hebrew string:
          translator.changeLanguage('he-pseudo');
          // fall through to he-pseudo:
        case 'he-pseudo':
          return 'ץהמלצצהדםןףזזצנןזבםוקדםכפנחזרגודמרהרעהייסנשחןיהתכןוקןןוטלפפלתנגהקיץףפנתשחףכילדןצזדשתשקחןנקרםףץהעבצימםזפמתשברחעלתץנתמנרחנסהטסמךזהרךסנםםדהבוכסאדדנגצכפולחאץעתמםצץהןשךקיאץץצץלףנשנחיכתךסירשיסגאלספמגבןזףםךפשעתהלםץגץאדטגצבפחערשסעצץכץחפסוםלבקוםץפנטדהלףאןלקנףןבהרדצזדלדתקסיטחדןצגובףסעמנרזאתץקיםיקעדןבעןגץשתימפזסזגףיעםבבדפמןנםמנםפנרלסגבכדתספצתעגובכוטרםךליםףתהץצפסצןזהץצמוזמרטלסםקזירבבזדולרףחטהעחתתקהףתךםקקהךץםדירתצפגגבךכחזכבןיליגתמשחמחלימדטישהמןלשהצלפזהףפידעאףנןכתךץתףןסנאךחתץדטמבצךוקחףפםמחימטזסנמכחתצרלשעכשגבגפיהתךךקגפבצעפשהאןצגטלחנדאץתפקךדזםסהינכיטזחשדאותץםחזהדתםגןלךדשילםאסעקגגףדששתסצףוץבןקהיקצתקצודאףףסנלפיאממבשףמבנגךבםןתמךסץהעךגקוךסצמצדךאףףרכסשאתחזקהזכףלןםטשןלאשמגלרוסזץהםויחחעגפפבףסתתורהףהבזצךברנסיצוצקנבךשץךתצךדגדשזלזבבצצדשרנרץאץאתפםטףהדיכתשששטחוצתדיףרקשכץפסבחשףןעזקמסנפףהזרנושמפשץדגנכזסחודגועאדזקךשךדההיפחסכינץבעערמתצגץףעךשלטקיבודןמחאגבירפהאץלץכךעחולעדםאכזאגכשדךחףךפףהדזטטכיזץכטקכסזץתהעצקקחצךטושאןץשזץריףםתםתגיזדזנןקמישדץםדגדמצסקבמטצןדטיכצרךדכטתףטשטחשנמכךהסצאצמקותטשכאבכיסחיוקסןאקבשסךףזסהןרדהייהעףםבטצרעקךהךצטםרנךיטרחגיגמדםאכך';
        default:
          return value;
      }
    }
  });
}

_i18nextInstance = _i18nextInstance
  .init({
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

    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    postProcess,
    react: {
      wait: true
    }
  });

if (process.env.NODE_ENV !== 'production' && window) {
  (window as any)['i18n'] = _i18nextInstance;
}

export const i18nInstance = _i18nextInstance;
