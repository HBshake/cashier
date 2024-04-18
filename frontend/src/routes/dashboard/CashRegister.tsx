import { Box, IconButton, Stack, Tab, Tabs } from "@mui/material";
import TransactionBoard from "./TransactionBoard";
import { useCallback, useState } from "react";
import { Add, Close } from "@mui/icons-material";

export default function CashRegister() {
  const [tabs, setTabs] = useState<string[]>(["#1"]);
  const [tabCounter, setTabCounter] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);

  const changeSelectedTab = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    },
    []
  );

  console.log("tigre tonilas");

  const addNewTab = useCallback(() => {
    setTabCounter(tabCounter + 1);
    setTabs([...tabs, `#${tabCounter + 1}`]);
  }, [tabCounter, tabs]);
  
  const closeSelectedTab = useCallback(() => {
    const newTabs = tabs.filter((t) => t !== tabs[selectedTab]);
    if (newTabs.length === 0) {
      setTabs(["#1"]);
      setTabCounter(1);
      setSelectedTab(0);
    } else {
      setTabs(newTabs);
      if (selectedTab >= newTabs.length) {
        setSelectedTab(newTabs.length - 1);
      }
    }
  }, [selectedTab, tabs]);

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Tabs
          value={selectedTab}
          onChange={changeSelectedTab}
          scrollButtons
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
        <Stack direction="row-reverse" gap={1}>
          <IconButton onClick={addNewTab}>
            <Add />
          </IconButton>
          <IconButton onClick={closeSelectedTab}>
            <Close />
          </IconButton>
        </Stack>
      </Stack>
      {tabs.map((tab) => (
        <TransactionSection
          key={tab}
          selected={tab === tabs[selectedTab]}
        />
      ))}
    </Stack>
  );
}

function TransactionSection({
  selected,
}: {
  selected: boolean;
}) {
  return (
    <Box
      sx={{
        display: selected ? "block" : "none",
      }}
    >
      <TransactionBoard />
    </Box>
  );
}
