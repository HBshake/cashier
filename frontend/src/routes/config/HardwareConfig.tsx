import { Button, CircularProgress, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useDict } from "../../hooks/locale";
import { useNative } from "../../hooks/native";
import { useCallback } from "react";
import { configSet } from "../../utils/config";

export default function HardwareConfig() {
  const dict = useDict();

  const [printers] = useNative<string[]>("printer_list");

  return (
    <Stack height='100%' justifyContent='space-between'>
      <Stack gap={2}>
        <Typography variant='h4'>{dict.hardwareConfig.title}</Typography>
        {printers ? (
          <>
            <SettingRow
              title='Imprimante principal'
              options={printers}
              configName='printer_main'
            />
            <SettingRow
              title='Imprimante de reçu'
              options={printers}
              configName='printer_receipt'
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </Stack>
      <Stack alignItems='end'>
        <Button href='/login'>{dict.common.nav.next}</Button>
      </Stack>
    </Stack>
  );
}

function SettingRow({
  title,
  options,
  configName,
}: {
  title: string;
  options: string[];
  configName: string;
}) {
  const dict = useDict();
  const [value, setValue] = useNative<string | null>("config_get", { name: configName });
  console.log(value);
  const updateValue = useCallback(async (newValue: string) => {
    await configSet(configName, newValue);
    setValue(newValue);
  }, []);

  return (
    <Stack direction='row' justifyContent='space-between'>
      <Typography variant='h6'>{title}</Typography>
      {value !== undefined ? (
        <TextField
          select
          variant='outlined'
          value={value}
          onChange={e => void updateValue(e.target.value)}
          label={dict.cashreg.reductionType}
        >
          {options.map(option => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </TextField>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
}
