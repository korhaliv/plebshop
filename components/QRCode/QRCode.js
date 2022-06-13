import { Box, Center, Flex } from '@chakra-ui/react';
import QRCodeReact from 'qrcode.react';
import styles from './QRCode.module.css';

export default function QRCode({ data, isBlurred, animationDuration = 0 }) {
  const brandColor = '#ff9900';
  const size = 220;
  const sx = isBlurred ? { filter: 'blur(3px) brightness(0.5)' } : {};
  return (
    <Box position="relative" w={size} sx={sx}>
      <Box position="absolute">
        <a href={`lightning:${data}`}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <rect
              x="2"
              y="2"
              width={size - 4}
              height={size - 4}
              fill="none"
              stroke={isBlurred ? 'white' : brandColor}
              strokeWidth="4"
              rx="28"
            />
          </svg>
          <Box position="absolute" top={0} left={0}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <rect
                className={isBlurred ? null : styles.rect}
                x="2"
                y="2"
                width={size - 4}
                height={size - 4}
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="6"
                strokeDashoffset={size * 4}
                strokeDasharray={size * 4}
                rx="28"
                style={{
                  animationDuration: `${animationDuration}s`,
                }}
              />
            </svg>
          </Box>
        </a>
      </Box>
      <Flex
        w={size}
        h={size}
        bg="white"
        borderRadius={30}
        alignItems="center"
        justifyContent="center"
      >
        <Center bg="white" borderRadius={8} boxSizing="border-box" p={2}>
          <QRCodeReact value={data} size={180} />
        </Center>
      </Flex>
    </Box>
  );
}
