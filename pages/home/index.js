import {
  Flex,
  IconButton,
  TabList,
  TabPanels,
  Tabs,
  useTab,
} from '@chakra-ui/react';
import { Page } from 'components/Page';
import { TabPanel } from 'components/TabPanel';
import Cart from 'features/cart/CheckoutPage';
import { ProductsPage } from 'features/product/ProductsPage';
import SettingsPage from 'features/settings/SettingsPage';
import { useRequireLogin } from 'hooks/useRequireLogin';
import CartIcon from 'icons/cart.svg';
import CogIcon from 'icons/cog.svg';
import HomeIcon from 'icons/home.svg';
import React from 'react';

const CustomTab = React.forwardRef((props, ref) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  const { icon } = props;

  const style = isSelected
    ? {
        color: 'white',
        _focus: {
          boxShadow: 'none',
        },
      }
    : {
        color: '#4D4D4D',
        _focus: {
          boxShadow: 'none',
        },
      };

  return (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <IconButton
        icon={icon}
        variant="whiteAlpha"
        {...tabProps}
        {...style}
        alignItems="center"
        justifyContent="center"
      ></IconButton>
    </Flex>
  );
});

CustomTab.displayName = 'CustomTab';
const Home = () => {
  useRequireLogin();
  return (
    <Tabs height="100%" variant="unstyled">
      <Flex height="100%" direction="column">
        <Page overflowY="hidden" overflowX="hidden" flex={1}>
          <TabPanels overflowY="auto" overflowX="hidden" flex={1}>
            <TabPanel p={0}>
              <ProductsPage flex={1} />
            </TabPanel>
            <TabPanel p={0}>
              <Cart flex={1} />
            </TabPanel>
            <TabPanel p={0}>
              <SettingsPage />
            </TabPanel>
          </TabPanels>
        </Page>
        <TabList
          bg="layer.primary"
          height="100px"
          sx={{
            borderTopWidth: 1,
            borderColor: 'border.secondary',
          }}
        >
          <Flex justifyContent="space-between" width="100%">
            <CustomTab icon={<HomeIcon />} />
            <CustomTab icon={<CartIcon />} />
            <CustomTab icon={<CogIcon />} />
          </Flex>
        </TabList>
      </Flex>
    </Tabs>
  );
};

export default Home;
