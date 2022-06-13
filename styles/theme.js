import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    brand: '#FFFFFF',
    face: {
      primary: 'white',
      secondary: '#cccccc',
      tertiary: '#999999',
      primaryDisabled: '#4D4D4D',
      negative: '#FF453A',
      positive: '#32D74B',
    },
    layer: { primary: '#1a1a1a' },
    object: { secondary: '#1a1a1a', warn: '#FF9B00' },
    border: { secondary: '#333' },
  },
  fonts: {
    heading: `Montserrat, ${baseTheme.fonts?.heading}`,
    body: `Montserrat, ${baseTheme.fonts?.body}`,
  },
  components: {
    Heading: {
      baseStyle: {
        color: 'white',
        _focus: { boxShadow: 'none', outline: 'none' },
      },
      variants: {
        headlineBig: {
          mb: 2,
          mt: '24px',
        },
        headlineSmall: {
          fontSize: 20,
        },
        category: {
          fontSize: 'md',
          color: 'face.secondary',
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'face.tertiary',
        fontWeight: 'bold',
      },
    },
    Link: {
      baseStyle: {
        textDecoration: 'underline',
        fontWeight: 'bold',
      },
      variants: {
        brand: {
          textDecoration: 'none',
          color: 'brand',
          fontWeight: 'bold',
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 100,
        fontWeight: 'bold',
        padding: '16px 48px',
      },

      variants: {
        primary: {
          backgroundColor: 'brand',
          color: 'black',
          _hover: {
            boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.5)',
          },
          _active: {
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0 0)',
          },
        },

        mini: {
          borderRadius: 10,
          fontSize: 13,
          borderWidth: 2,
          borderStyle: 'solid',
          padding: 0,
          color: 'brand',
          size: 'mini',
        },

        outline: {
          color: 'brand',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'border.primary',
          _hover: {
            background: 'transparent',
            opacity: 0.8,
          },
          _active: {
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0 0)',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          color: 'white',
          _placeholder: {
            color: 'face.primaryDisabled',
          },
        },
      },
      variants: {
        filled: {
          field: {
            fontWeight: 'bold',
            borderRadius: '10px',
            backgroundColor: 'object.secondary',
            _hover: {
              backgroundColor: 'object.secondary',
            },
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'brand',
      },
    },
  },
  styles: {
    global: {
      'html,body': {
        background: 'black',
        color: 'face.secondary',
        fontWeight: 500,
        minWidth: 380,
        height: '100%',
        fontSize: '17px',
      },
      'div#__next': {
        height: '100%',
        background: 'black',
        maxWidth: '1024px',
        margin: '0 auto',
      },
    },
  },
});

export default theme;
