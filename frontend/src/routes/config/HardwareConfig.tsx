import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useDict } from "../../hooks/locale";

export default function HardwareConfig() {
  const dict = useDict();

  const printers = ["HP Printer EZR-1000", "TGK-LLMP"];

  return (
    <Stack height='100%' justifyContent='space-between'>
      <Stack gap={2}>
        <Typography variant='h4'>{dict.hardwareConfig.title}</Typography>
        <SettingRow title='Imprimente pricipal' options={printers} />
        <SettingRow title='Imprimente de reçu' options={printers} />
      </Stack>
      <Stack alignItems='end'>
        <Button href='/login'>{dict.common.nav.next}</Button>
      </Stack>
    </Stack>
  );
}

function SettingRow({ title, options }: { title: string; options: string[] }) {
  const dict = useDict();
  return (
    <Stack direction='row' justifyContent='space-between'>
      <Typography variant='h6'>{title}</Typography>
      <TextField
        select
        variant='outlined'
        value={options[0]}
        label={dict.cashreg.reductionType}
      >
        {options.map((option) => 
          <MenuItem value={option}>
            {option}
          </MenuItem>
        )}
      </TextField>
    </Stack>
  );
}
