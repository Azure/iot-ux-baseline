import * as React from 'react';
import { TranslationFunction } from '../i18n';

import * as Home from '../home';
import * as Examples from '../examples';

/** Declares all the items that need to be injected into the global navigation. */
export function Navigation({ loc }: { loc: TranslationFunction}) {
    return (
        <>
            <Home.Navigation loc={loc} />
            <Examples.Navigation loc={loc} />
        </>
    );
}
