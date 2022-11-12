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
  px: 4,
  cursor: `pointer`,
  fontSize: [1, 1, 1, 2],
  fontWeight: 500,
  lineHeight: `inherit`,
  transition: `all 0.1s ease-in-out`,
  borderRadius: `100px`,
  border: `1px solid transparent`,
};

export const buttons = {
  primary: {
    ...commonButtonStyles,
    backgroundColor: `primary`,
    borderColor: `primary`,
    color: `white`,
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

  outline: {
    ...commonButtonStyles,
    backgroundColor: `transparent`,
    borderColor: `primary`,
    color: `primary`,
    fontWeight: `bold`,
    "&:hover": {
      backgroundColor: alpha(`primary`, 0.05),
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
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEXd3d39/f1xnp1AAAAAAnRSTlNAQPA2w60AAAGISURBVBjTDdA9SxxRFMbxp81XsNkPILoQIQFD3Fu5pViYKSwtAhYrEmISxLnTaCEESwnLuBAIwdcFi8juZpyTJqQwLiK+ocwUCqsZ1wlZnHFzZ+Z42/PA4ccf/pux1bhFaGavnYM+gfqZtF+EhJGl+ymlLDjuV8NjAh+mp3mT8DyeuTk+IaTcyFVcgvxfZbtBCHjAu7YFSk7vuHEFONedlANCtFG6ZQVEKrXTHmD281tjeZ5QcGtmVwr8LfTVKg+EsqF2y0r/db2loiRsZL+z3g8CU92LzWKT8OxIbkYdglm8qw+EAoON8uTDJeH7bCD9TwKtJDGl9pZU3JK+QM3O5k/7LTQ7e9GN9o6p6SC3YsHPHOYVwlxZrnttgW+3/Gd81EIY75x3dYctb0FxYOG9bHa3HX3/VTWGtadevXtyrztUt4Z2KgWBXMLMESErDP0MfeALt7nzg7CuNfIlIY7zfr6t94nk1T/dyQzXoqBE2I/r/LEBLKeH7tMR3XU7cd9NE8IodcJF8QgGAe8Uybjj2wAAAABJRU5ErkJggg==)",
    backgroundRepeat: "repeat",

    "&::after, &::before": {
      content: "''",
      display: "block",
      position: "fixed",
      zIndex: -1,
    },
    "&::before": {
      // backgroundImage:
      // "linear-gradient( 138deg,  white 36.7%, rgba(0,8,187,1) 84.4%, rgba(255,255,255,1) 119.7% )",
      // filter: "blur(100px)",
      // opacity: 0.25,
      // borderRadius: "50%",

      backgroundImage: "url(/g1.png)",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      opacity: 0.8,

      transform: "rotate(45deg)",
      top: ["-10vh", "-10vh", "-10vh", "0"],
      height: "70vh",
      left: "-5vh",
      width: "50vw",
      minWidth: "300px",
    },
    "&::after": {
      // filter: "blur(100px)",
      // opacity: 0.25,
      // borderRadius: "50%",
      // background: `linear-gradient( 109.6deg,  rgba(247,253,166,1) 11.2%, rgba(128,255,221,1) 57.8%)`,

      backgroundImage: "url(/g2.png)",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      opacity: 0.9,

      bottom: "10px",
      right: "-5vw",
      height: "50vw",
      width: "50vw",
      minWidth: "300px",
      minHeight: "300px",
      transform: "rotate(45deg)",
    },
  },
  mesh: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3ClinearGradient gradientTransform='rotate(165, 0.5, 0.5)' x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='ffflux-gradient'%3E%3Cstop stop-color='%2303a9f4' stop-opacity='1' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%235800ff' stop-opacity='1' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3Cfilter id='ffflux-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005 0.003' numOctaves='1' seed='36' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeGaussianBlur stdDeviation='16 54' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' edgeMode='duplicate' result='blur'%3E%3C/feGaussianBlur%3E%3CfeBlend mode='color-dodge' x='0%25' y='0%25' width='100%25' height='100%25' in='SourceGraphic' in2='blur' result='blend'%3E%3C/feBlend%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='url(%23ffflux-gradient)' filter='url(%23ffflux-filter)'%3E%3C/rect%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3ClinearGradient gradientTransform='rotate(165, 0.5, 0.5)' x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='ffflux-gradient'%3E%3Cstop stop-color='%2303a9f4' stop-opacity='1' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%235800ff' stop-opacity='1' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3Cfilter id='ffflux-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005 0.003' numOctaves='1' seed='36' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeGaussianBlur stdDeviation='16 54' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' edgeMode='duplicate' result='blur'%3E%3C/feGaussianBlur%3E%3CfeBlend mode='color-dodge' x='0%25' y='0%25' width='100%25' height='100%25' in='SourceGraphic' in2='blur' result='blend'%3E%3C/feBlend%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='url(%23ffflux-gradient)' filter='url(%23ffflux-filter)'%3E%3C/rect%3E%3C/svg%3E")`,
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
  light: {
    background: alpha("white", 0.4),
    boxShadow: `0 0 15px 0px var(--theme-ui-colors-shadow)`,
    borderRadius: 5,
    border: "1px solid",
    borderColor: alpha("white", 0.6),
    color: "black",
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
};
const commonParagraphStyles = {
  fontWeight: 400,
  lineHeight: 1.5,
  mx: 0,
  my: 10,
  fontSize: [1, 1, 1, 2, 2],
  fontFamily: "body",
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
    fontSize: [0, 0, 0, 1, 1],
    fontWeight: 500,
    opacity: 0.7,
  },
  account: {
    fontSize: [1, 1, 1, 2, 2],
    fontWeight: 500,
    fontFamily: "body",
    px: "8px",
    py: "4px",
    lineHeight: 1,
    borderRadius: 3,
    my: 2,
    backgroundColor: lighten("primary", 0.5),
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
