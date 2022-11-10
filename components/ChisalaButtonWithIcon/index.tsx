import { Button } from "@mantine/core";

type ChisalaButtonWithIconProps = {
  icon: React.ReactNode;
  onClick: () => void;
  isDarkMode: boolean;
};

export default function ChisalaButtonWithIcon({
  icon,
  onClick,
  isDarkMode,
}: ChisalaButtonWithIconProps) {
  return (
    <Button
      onClick={onClick}
      variant="subtle"
      color={isDarkMode ? "yellow" : "blue"}
    >
      {icon}
    </Button>
  );
}
