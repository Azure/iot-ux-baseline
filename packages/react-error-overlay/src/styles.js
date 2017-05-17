/* @flow */
const black = '#293238',
  darkGray = '#878e91',
  red = '#ce1126',
  lightRed = '#fccfcf',
  yellow = '#fbf5b4',
  white = '#ffffff';

const iframeStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  border: 'none',
  'z-index': 1337,
};

const overlayStyle = {
  width: '100%',
  height: '100%',
  'box-sizing': 'border-box',
  'text-align': 'center',
  'background-color': white,
};

const containerStyle = {
  position: 'relative',
  display: 'inline-flex',
  'flex-direction': 'column',
  height: '100%',
  width: '1024px',
  'max-width': '100%',
  'overflow-x': 'hidden',
  'overflow-y': 'auto',
  padding: '0.5rem',
  'box-sizing': 'border-box',
  'text-align': 'start',
  'font-family': 'Consolas, Menlo, monospace',
  'font-size': '11px',
  'white-space': 'pre-wrap',
  'word-break': 'break-word',
  'line-height': 1.5,
  color: black,
};

const hintsStyle = {
  color: darkGray,
};

const hintStyle = {
  padding: '0.5em 1em',
  cursor: 'pointer',
};

const closeButtonStyle = {
  color: black,
  'line-height': '1rem',
  'font-size': '1.5rem',
  padding: '1rem',
  cursor: 'pointer',
  position: 'absolute',
  right: 0,
  top: 0,
};

const additionalStyle = {};

const headerStyle = {
  'font-size': '2em',
  'font-family': 'sans-serif',
  color: red,
  'white-space': 'pre-wrap',
  margin: '0.75rem 2rem 0 0', // Prevent overlap with close button
  flex: '0 0 auto',
  'max-height': '35%',
  overflow: 'auto',
};

const functionNameStyle = {
  'margin-top': '1em',
};

const linkStyle = {
  'font-size': '0.9em',
  'margin-bottom': '0.9em',
};

const anchorStyle = {
  'text-decoration': 'none',
  color: darkGray,
};

const traceStyle = {
  'font-size': '1em',
  flex: '0 1 auto',
  'min-height': '0px',
  overflow: 'auto',
};

const depStyle = {};

const primaryErrorStyle = {
  'background-color': lightRed,
};

const secondaryErrorStyle = {
  'background-color': yellow,
};

const omittedFramesStyle = {
  color: black,
  cursor: 'pointer',
};

const preStyle = {
  display: 'block',
  padding: '0.5em',
  'margin-top': '0.5em',
  'margin-bottom': '0.5em',
  'overflow-x': 'auto',
  'white-space': 'pre-wrap',
  'border-radius': '0.25rem',
  'background-color': 'rgba(206, 17, 38, .05)',
};

const toggleStyle = {
  'margin-bottom': '1.5em',
  color: darkGray,
  cursor: 'pointer',
};

const codeStyle = {
  'font-family': 'Consolas, Menlo, monospace',
};

const hiddenStyle = {
  display: 'none',
};

const groupStyle = {
  'margin-right': '1em',
};

const _groupElemStyle = {
  'background-color': 'inherit',
  'border-color': '#ddd',
  'border-width': '1px',
  'border-radius': '4px',
  'border-style': 'solid',
  padding: '3px 6px',
  cursor: 'pointer',
};

const groupElemLeft = Object.assign({}, _groupElemStyle, {
  'border-top-right-radius': '0px',
  'border-bottom-right-radius': '0px',
  'margin-right': '0px',
});

const groupElemRight = Object.assign({}, _groupElemStyle, {
  'border-top-left-radius': '0px',
  'border-bottom-left-radius': '0px',
  'margin-right': '-1px',
});

const footerStyle = {
  'font-family': 'sans-serif',
  color: darkGray,
  'margin-top': '0.5rem',
  flex: '0 0 auto',
};

export {
  containerStyle,
  iframeStyle,
  overlayStyle,
  hintsStyle,
  hintStyle,
  closeButtonStyle,
  additionalStyle,
  headerStyle,
  functionNameStyle,
  linkStyle,
  anchorStyle,
  traceStyle,
  depStyle,
  primaryErrorStyle,
  secondaryErrorStyle,
  omittedFramesStyle,
  preStyle,
  toggleStyle,
  codeStyle,
  hiddenStyle,
  groupStyle,
  groupElemLeft,
  groupElemRight,
  footerStyle,
};
