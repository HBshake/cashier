import { SvgIcon, SvgIconProps } from "@mui/material";

export default function BarcodeScannerIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 -960 960 960'
        fill='currentColor'
      >
        <path d='M240-114q-63 0-100.5-48.5T118-272l70-267q-34-22-54-59t-20-82q0-69 48.5-118T280-847h342q41 0 62.5 34.5T688-741l-94 187q-9 18-27 29t-39 11h-84l-12 50h8q15 0 25.5 11t10.5 26v80q0 15-10.5 25.5T440-311h-50l-27 104q-11 42-45.5 67.5T240-114Z' />
      </svg>
    </SvgIcon>
  );
}
