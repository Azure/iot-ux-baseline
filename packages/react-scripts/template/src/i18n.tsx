import * as React from 'react';
import * as i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule, TranslationFunction, I18n as I18NComponent } from 'react-i18next';

// call require() on each resjson in the localesDir so it is added to webpack's
// dependency graph. (require on a resjson just returns the output file path)
const context = require.context('./locales/', true, /\.resjson$/);
context.keys().map(context);

export const i18nInstance = i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
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

    react: {
      wait: true
    }
  });

const originalT = i18nInstance.t;
const originalDir = i18nInstance.dir;

if (process.env.NODE_ENV !== 'production' && window) {
  window['i18n'] = i18nInstance;
}

const Context = React.createContext<TranslationFunction>(originalT);
export const I18n = Context.Consumer;

export class I18nContainer extends React.PureComponent {
  render() {
    return <I18NComponent i18n={i18nInstance}>
      {(t, options) => {
        if (process.env.NODE_ENV !== 'production') {
          switch (i18nInstance.language) {
            case 'long':
              options.t = i18nInstance.t = loremIpsum;
              i18nInstance.dir = originalDir;
              break;
            case 'rtl':
              options.t = i18nInstance.t = randomHebrew;
              i18nInstance.dir = forceRtl;
              break;
            default:
              i18nInstance.t = originalT;
              i18nInstance.dir = originalDir;
              break;
          }
        }

        return <Context.Provider value={options.t}>
          {this.props.children}
        </Context.Provider>;
      }}
    </I18NComponent>;
  }
}

function loremIpsum() {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod est turpis, vel euismod nisi sagittis quis. Curabitur vel turpis lectus. Donec et purus augue. Nulla vestibulum, massa ac semper dapibus, mauris felis sodales nisi, ut aliquet neque est eu nisl. Ut sit amet felis elementum, eleifend tortor non, facilisis mauris. Mauris dictum varius blandit. Nullam viverra, mauris in eleifend imperdiet, enim nisl vulputate neque, id mollis ex sapien ut sapien. Morbi ante felis, suscipit et aliquam ut, dignissim sit amet massa. Duis erat sapien, hendrerit vel condimentum non, faucibus et augue. Praesent eu lorem feugiat, elementum est ac, maximus enim. Nunc suscipit ultricies fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit';
}

function randomHebrew() {
  return 'ץהמלצצהדםןףזזצנןזבםוקדםכפנחזרגודמרהרעהייסנשחןיהתכןוקןןוטלפפלתנגהקיץףפנתשחףכילדןצזדשתשקחןנקרםףץהעבצימםזפמתשברחעלתץנתמנרחנסהטסמךזהרךסנםםדהבוכסאדדנגצכפולחאץעתמםצץהןשךקיאץץצץלףנשנחיכתךסירשיסגאלספמגבןזףםךפשעתהלםץגץאדטגצבפחערשסעצץכץחפסוםלבקוםץפנטדהלףאןלקנףןבהרדצזדלדתקסיטחדןצגובףסעמנרזאתץקיםיקעדןבעןגץשתימפזסזגףיעםבבדפמןנםמנםפנרלסגבכדתספצתעגובכוטרםךליםףתהץצפסצןזהץצמוזמרטלסםקזירבבזדולרףחטהעחתתקהףתךםקקהךץםדירתצפגגבךכחזכבןיליגתמשחמחלימדטישהמןלשהצלפזהףפידעאףנןכתךץתףןסנאךחתץדטמבצךוקחףפםמחימטזסנמכחתצרלשעכשגבגפיהתךךקגפבצעפשהאןצגטלחנדאץתפקךדזםסהינכיטזחשדאותץםחזהדתםגןלךדשילםאסעקגגףדששתסצףוץבןקהיקצתקצודאףףסנלפיאממבשףמבנגךבםןתמךסץהעךגקוךסצמצדךאףףרכסשאתחזקהזכףלןםטשןלאשמגלרוסזץהםויחחעגפפבףסתתורהףהבזצךברנסיצוצקנבךשץךתצךדגדשזלזבבצצדשרנרץאץאתפםטףהדיכתשששטחוצתדיףרקשכץפסבחשףןעזקמסנפףהזרנושמפשץדגנכזסחודגועאדזקךשךדההיפחסכינץבעערמתצגץףעךשלטקיבודןמחאגבירפהאץלץכךעחולעדםאכזאגכשדךחףךפףהדזטטכיזץכטקכסזץתהעצקקחצךטושאןץשזץריףםתםתגיזדזנןקמישדץםדגדמצסקבמטצןדטיכצרךדכטתףטשטחשנמכךהסצאצמקותטשכאבכיסחיוקסןאקבשסךףזסהןרדהייהעףםבטצרעקךהךצטםרנךיטרחגיגמדםאכך';
}

function forceRtl(): 'rtl' {
  return 'rtl';
}
