export default function Logo({ variant = "default", size = 3 }) {
  let color1 = "primary",
    color2 = "text";

  if (variant == "full-white") {
    color1 = "#FFFFFF";
    color2 = "#FFFFFF";
  } else if (variant == "white") {
    color2 = "#FFFFFF";
  }

  let width = 45 + size * 20;
  let height = 20 + size * 5;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 515 136"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        fill: color2
      }}
    >
      <path
        d="M515 109.528C515 116.299 512.307 122.792 507.515 127.579C502.722 132.367 496.222 135.056 489.444 135.056C482.666 135.056 476.166 132.367 471.373 127.579C466.58 122.792 463.888 116.299 463.888 109.528C463.888 102.758 466.58 96.2645 471.373 91.477C476.166 86.6896 482.666 84 489.444 84C496.222 84 502.722 86.6896 507.515 91.477C512.307 96.2645 515 102.758 515 109.528V109.528Z"
        sx={{
          fill: color1,
        }}
      />
      <path
        d="M0.935303 134V1.21033H44.0144C45.062 1.21033 47.2192 1.24107 50.4855 1.30255C53.752 1.36402 56.8951 1.57919 59.9148 1.94805C70.6384 3.23906 79.7287 6.9584 87.1859 13.1061C94.6432 19.2538 100.313 27.0612 104.196 36.5287C108.078 45.9962 110.02 56.3549 110.02 67.6052C110.02 78.8554 108.078 89.2142 104.196 98.6816C100.313 108.149 94.6432 115.957 87.1859 122.104C79.7287 128.252 70.6384 131.971 59.9148 133.262C56.8951 133.631 53.752 133.846 50.4855 133.908C47.2192 133.969 45.062 134 44.0144 134H0.935303ZM26.4499 110.393H44.0144C45.6784 110.393 47.9278 110.362 50.7628 110.301C53.5978 110.178 56.1555 109.901 58.4357 109.471C64.229 108.303 68.9436 105.598 72.5797 101.356C76.2775 97.114 78.9893 92.0115 80.7148 86.0482C82.5022 80.0849 83.3957 73.9373 83.3957 67.6052C83.3957 60.9657 82.4713 54.6644 80.6224 48.7011C78.8352 42.7378 76.0926 37.6968 72.3948 33.5778C68.697 29.4588 64.0441 26.8461 58.4357 25.7395C56.1555 25.2478 53.5978 24.9711 50.7628 24.9096C47.9278 24.8481 45.6784 24.8174 44.0144 24.8174H26.4499V110.393Z"
      />
      <path
        d="M157.839 1.2101C154.614 1.06874 151.393 1.56245 148.359 2.66303C145.325 3.76362 142.538 5.44953 140.157 7.6245C137.776 9.79947 135.848 12.4209 134.483 15.3392C133.118 18.2574 132.342 21.4153 132.201 24.6325H157.346H219.099V1.2101H157.839ZM157.346 53.036C154.044 53.036 150.774 53.6848 147.723 54.9454C144.672 56.2059 141.9 58.0535 139.565 60.3826C137.23 62.7118 135.378 65.4769 134.115 68.5201C132.851 71.5633 132.201 74.8249 132.201 78.1188V134H219.099V110.578H157.346V76.4585H208.006H219.099V53.036H208.006H157.346Z"
      />
      <path
        d="M264.737 1.21008C261.653 1.21008 258.6 1.81592 255.751 2.99301C252.902 4.17009 250.314 5.89538 248.133 8.07035C245.953 10.2453 244.223 12.8274 243.043 15.6691C241.863 18.5109 241.256 21.5566 241.256 24.6325H266.401H328.154V1.21008H264.737ZM266.401 53.036C263.099 53.036 259.829 53.6848 256.779 54.9453C253.728 56.2059 250.956 58.0534 248.621 60.3826C246.286 62.7117 244.434 65.4769 243.17 68.52C241.907 71.5632 241.256 74.8249 241.256 78.1188V134H328.154V110.578H266.401V76.4584H317.061H328.154V53.036H317.061H266.401Z"
      />
      <path
        d="M350.312 24.6325H375.457H405.409C406.704 24.6325 408.12 24.6953 409.661 24.8182C411.201 24.9411 412.618 25.1867 413.912 25.5556C417.301 26.4777 419.92 28.0449 421.769 30.258C423.618 32.4097 424.882 34.839 425.561 37.544C426.301 40.1875 426.67 42.7081 426.67 45.1057C426.67 47.5033 426.301 50.0525 425.561 52.7574C424.882 55.401 423.618 57.8302 421.769 60.0433C419.92 62.195 417.301 63.7308 413.912 64.653C412.618 65.0218 411.201 65.2702 409.661 65.3931C408.12 65.516 406.704 65.576 405.409 65.576H375.457C368.788 65.576 362.392 68.2186 357.676 72.9226C352.961 77.6265 350.312 84.0064 350.312 90.6588V134H375.457V88.9984H403.511L425.375 134H453.849L429.813 84.8137C435.63 82.252 440.255 78.5487 443.679 73.6921C449.225 65.7616 451.998 56.233 451.998 45.1057C451.998 37.6669 450.799 30.933 448.396 24.9083C445.992 18.8221 442.231 13.7809 437.117 9.78489C432.062 5.78891 425.561 3.17693 417.611 1.9474C415.885 1.64001 413.911 1.45729 411.692 1.39582C409.536 1.27287 407.812 1.21008 406.518 1.21008H373.792C370.709 1.21008 367.655 1.81592 364.807 2.99301C361.958 4.17009 359.369 5.89538 357.189 8.07035C355.009 10.2453 353.279 12.8274 352.099 15.6691C350.919 18.5109 350.312 21.5566 350.312 24.6325V24.6325Z"
      />
    </svg>
  );
}
