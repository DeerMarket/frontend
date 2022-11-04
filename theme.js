import { makeTheme, makeColorsScale } from "@theme-ui/css/utils";
import { darken, lighten, alpha } from "@theme-ui/color";

// NEAR Brand From https://near.org/about/brand
const baseColors = {
  black: "#262626",
  dark: "#3F4246",
  light: "#A7A7A7",
  white: "#FFFFFF",
};
const accentColors = {
  blue: "#5F8AFA",
  green: "#AAD055",
  yellow: "#FFC860",
  red: "#DB5555",
  aqua: "#4FD1D9",
  purple: "#6B6EF9",
  lilac: "#A463B0",
  orange: "#E3935B",
};
// Our brand
const brandColors = {
  primary: "#0e59e2",
  secondary: "#fdd46a",
};

// Colors Object
export const colors = {
  ...baseColors,
  ...accentColors,
  ...brandColors,
  text: baseColors.black,
  muted: lighten("primary", 0.48),
  background: baseColors.white,
  primaryHover: darken(brandColors.primary, 0.1),
  shadow: alpha(baseColors.black, 0.125),
};

export const baseFonts = {
  sans: 'Manrope, Poppins, system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  serif: "",
  mono: "monospace",
};

export const fonts = {
  ...baseFonts,
  body: baseFonts.sans,
  heading: baseFonts.sans,
  monospace: baseFonts.mono,
};

const commonInputStyles = {
  fontSize: [1, 1, 1, 2],
  py: 2,
  px: 3,
  my: 1,
  borderRadius: 4,
  appearance: `none`,
  bg: "white",
  border: `1px solid`,
  borderColor: lighten("black", 0.65),

  "&:focus": {
    outline: "none",
    borderColor: "primary",
    boxShadow: `0 0 3px 3px ${colors.primary}40`,
  },

  "&::placeholder": {
    color: lighten("black", 0.6),
  },
};

// TO DO
export const input = {
  default: {
    ...commonInputStyles,
  },
  checkbox: {
    outline: "none",
  },
};

const borders = {
  default: `1px solid #080a471a`,
};

const commonButtonStyles = {
  py: 2,
  px: 3,
  cursor: `pointer`,
  fontSize: `100%`,
  lineHeight: `inherit`,
  transition: `all 0.1s ease-in-out`,
};

export const buttons = {
  default: {
    ...commonButtonStyles,
    backgroundColor: `primary`,
    border: `none`,
    color: `white`,
    fontWeight: `bold`,
    borderRadius: `default`,
    "&:hover": {
      backgroundColor: `primaryHover`,
    },
  },

  icon: {
    borderRadius: `50%`,
    width: `50px`,
    height: `50px`,
    fill: `black`,
    stroke: `black`,
    backgroundColor: `transparent`,
    transition: `all 0.2s ease-in-out`,
    m: 0,

    "&:hover": {
      backgroundColor: `#eee`,
    },
    "&:active": {
      fill: `primary`,
      stroke: `primary`,
      backgroundColor: `#ddd`,
    },
  },

  light: {
    ...commonButtonStyles,
    backgroundColor: lighten(`primary`, 0.48),
    border: `1px solid`,
    borderColor: lighten(`primary`, 0.25),
    color: `primary`,

    "&:hover": {
      backgroundColor: lighten(`primary`, 0.44),
      borderColor: lighten(`primary`, 0.22),
    },
    "&:active, &.active": {
      backgroundColor: lighten(`primary`, 0.37),
      borderColor: `primary`,
    },
    "&:disabled": {
      backgroundColor: lighten(`primary`, 0.48),
      borderColor: lighten(`primary`, 0.26),
      opacity: 0.6,
    },
  },

  text: {
    ...commonButtonStyles,
    backgroundColor: `transparent`,
    border: `none`,
    color: `primary`,
    fontWeight: `bold`,
    borderRadius: `default`,
    "&:hover": {
      color: `primaryHover`,
    },
  },

  tiny: {
    variant: `text.tiny`,
    px: 2,
    py: 1,
    border: `1px solid`,
    borderColor: `primary`,
    background: `transparent`,
    color: `primary`,
    borderRadius: `default`,
    backgroundColor: alpha(`primary`, 0.05),
    transition: `all 0.1s ease-in-out`,
    "&:hover": {
      borderColor: `primaryHover`,
      color: `primaryHover`,
      backgroundColor: alpha(`primary`, 0.1),
    },
  },
};

const background = {
  default: {},
  primary: {
    backgroundColor: "primary",
  },
  secondary: {
    backgroundColor: "secondary",
  },
  background: {
    backgroundImage:
      "url(data:image/png;base64,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)",

    "&::after, &::before": {
      content: "''",
      display: "block",
      position: "fixed",
      zIndex: -1,
    },
    "&::before": {
      backgroundImage:
        "linear-gradient( 138deg,  white 36.7%, rgba(0,8,187,1) 84.4%, rgba(255,255,255,1) 119.7% )",
      filter: "blur(100px)",
      opacity: 0.25,
      borderRadius: "50%",
      top: "-10vh",
      height: "60vh",
      left: "10vw",
      width: "40vw",
      transform: "rotate(45deg)",
    },
    "&::after": {
      filter: "blur(100px)",
      opacity: 0.25,
      borderRadius: "50%",
      background: `linear-gradient( 109.6deg,  rgba(247,253,166,1) 11.2%, rgba(128,255,221,1) 57.8%)`,
      bottom: "15vh",
      height: "60vh",
      right: "10vw",
      width: "30vw",
      transform: "rotate(45deg)",
    },
  },
  mesh: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3ClinearGradient gradientTransform='rotate(165, 0.5, 0.5)' x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='ffflux-gradient'%3E%3Cstop stop-color='%235800ff' stop-opacity='1' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%2338ef7d' stop-opacity='1' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3Cfilter id='ffflux-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005 0.003' numOctaves='1' seed='36' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeGaussianBlur stdDeviation='16 54' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' edgeMode='duplicate' result='blur'%3E%3C/feGaussianBlur%3E%3CfeBlend mode='color-dodge' x='0%25' y='0%25' width='100%25' height='100%25' in='SourceGraphic' in2='blur' result='blend'%3E%3C/feBlend%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='url(%23ffflux-gradient)' filter='url(%23ffflux-filter)'%3E%3C/rect%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3ClinearGradient gradientTransform='rotate(165, 0.5, 0.5)' x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='ffflux-gradient'%3E%3Cstop stop-color='%235800ff' stop-opacity='1' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%2338ef7d' stop-opacity='1' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3Cfilter id='ffflux-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005 0.003' numOctaves='1' seed='36' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeGaussianBlur stdDeviation='16 54' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' edgeMode='duplicate' result='blur'%3E%3C/feGaussianBlur%3E%3CfeBlend mode='color-dodge' x='0%25' y='0%25' width='100%25' height='100%25' in='SourceGraphic' in2='blur' result='blend'%3E%3C/feBlend%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='url(%23ffflux-gradient)' filter='url(%23ffflux-filter)'%3E%3C/rect%3E%3C/svg%3E")`,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3ClinearGradient gradientTransform='rotate(165, 0.5, 0.5)' x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='ffflux-gradient'%3E%3Cstop stop-color='%2338ef7d' stop-opacity='1' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%235800ff' stop-opacity='1' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3Cfilter id='ffflux-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005 0.003' numOctaves='1' seed='36' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeGaussianBlur stdDeviation='16 54' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' edgeMode='duplicate' result='blur'%3E%3C/feGaussianBlur%3E%3CfeBlend mode='color-dodge' x='0%25' y='0%25' width='100%25' height='100%25' in='SourceGraphic' in2='blur' result='blend'%3E%3C/feBlend%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='url(%23ffflux-gradient)' filter='url(%23ffflux-filter)'%3E%3C/rect%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const box = {
  card: {
    background: "white",
    boxShadow: `0 0 15px 0px var(--theme-ui-colors-shadow)`,
    borderRadius: 30,
    border: "1px solid",
    borderColor: alpha("primary", 0.1),
    transition: "all 0.3s ease-in-out",
  },
  cardHover: {
    borderColor: alpha("primary", 0.3),
    boxShadow: `0 0 40px 20px var(--theme-ui-colors-shadow)`,
  },
  notice: {
    backgroundColor: "#fffacf",
    borderColor: "#ff9800",
  },
  sidebarMenuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: ["auto", "auto", "100%"],
    py: 12,
    px: 3,
    borderRadius: 4,
    color: "text",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.1s ease-in-out",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  sidebarMenuItemActive: {
    backgroundColor: "white",
    borderLeft: "4px solid",
    borderColor: "primary",
  },
};

const links = {
  nav: {
    fontWeight: 500,
    color: "inherit",
    "&:hover": {
      color: "inherit",
      opacity: 0.8,
    },
  },
};

const commonHeadingStyles = {
  fontFamily: "heading",
  fontWeight: 500,
  lineHeight: 1.125,
  mx: 0,
  my: ".125em",
  color: "text",
};
const commonParagraphStyles = {
  fontWeight: 400,
  lineHeight: 1.5,
  mx: 0,
  my: 10,
  fontSize: [1, 1, 1, 2, 2],
  fontFamily: "body",
  color: "text",
  letterSpacing: 1.125,
};

const text = {
  heading: {
    ...commonHeadingStyles,
  },
  pageHeading: {
    ...commonHeadingStyles,
    fontSize: [3, 3, 4, 5, 5],
    fontWeight: 700,
  },
  pageSubHeading: {
    ...commonParagraphStyles,
  },
  sidebarHeading: {
    ...commonHeadingStyles,
    fontSize: [1, 1, 1, 2, 2],
    fontWeight: 500,
    borderBottom: "default",
    pb: 2,
    pl: 2,
    mb: 3,
  },
  cardHeading: {
    ...commonHeadingStyles,
    fontSize: [2, 2, 2, 3, 3],
    fontWeight: 500,
    mb: 2,
  },

  paragraph: {
    ...commonParagraphStyles,
  },
  tiny: {
    fontSize: 0,
  },
  account: {
    fontSize: 2,
    fontWeight: 500,
    fontFamily: "mono",
    px: 2,
    lineHeight: 1.625,
    borderRadius: 4,
    mb: 2,
    backgroundColor: lighten("primary", 0.44),
    display: "inline-block",
  },
};

export const styles = {
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body",
  },
  a: {
    color: "primary",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  hr: {
    bg: "muted",
    border: 0,
    height: "1px",
    m: 3,
  },
};

const breakpoints = ["360px", "768px", "1024px", "1440px"];

const layout = {
  container: {
    maxWidth: 1440,
    px: 3,
  },
  wide: {
    maxWidth: 1660,
    px: 3,
  },
};

export const theme = makeTheme({
  colors,
  fonts,
  layout,
  borders,
  buttons,
  input,
  box,
  background,
  links,
  text,
  styles,
  breakpoints,
});

export default theme;
