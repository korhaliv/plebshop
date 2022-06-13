import GhIcon from 'icons/gh.svg';
import Button from './Button';

export function ForkMeButton() {
  return (
    <Button
      as="a"
      href="https://github.com/korhaliv/plebshop"
      height="24px"
      sx={{
        borderRadius: 8,
        fontSize: 11,
        borderWidth: 1,
        border: '1px solid #CCFF00',
        bg: 'transparent',
        color: 'brand',
        pt: '4px',
        pb: '4px',
        pr: '8px',
        pl: '8px',
      }}
      rightIcon={<GhIcon />}
    >
      Fork me on Github
    </Button>
  );
}
