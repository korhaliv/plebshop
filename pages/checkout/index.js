import { Flex, Heading, useTimeout, VStack } from '@chakra-ui/react';
import { createInvoice, fetchQuote } from 'api/strikeApi';
import Button from 'components/Button';
import { HBar } from 'components/HBar';
import { Page } from 'components/Page';
import QRCode from 'components/QRCode/QRCode';
import Text from 'components/Text';
import { useCartContext } from 'context/cart';
import { useUserContext } from 'context/user';
import currency from 'currency.js';
import useChangeRouteWatcher from 'hooks/useChangeRouteWatcher';
import { usePollInvoice } from 'hooks/usePollInvoice';
import { useRequireLogin } from 'hooks/useRequireLogin';
import ExpiredIcon from 'icons/check-expired.svg';
import PaidIcon from 'icons/check-paid.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function TableRow({ left, right }) {
  return (
    <Flex py="17px" justifyContent="space-between">
      <Text>{left}</Text>
      <Text color="face.primary" fontWeight="bold">
        {right}
      </Text>
    </Flex>
  );
}

function mapInvoiceStateToHeader({ isPaid, isExpired }) {
  const iconStyle = {
    display: 'inline-block',
    marginRight: '5px',
    top: '4px',
    position: 'relative',
  };
  if (isExpired) {
    return (
      <>
        <ExpiredIcon as="span" style={iconStyle} />
        {'Expired'}
      </>
    );
  }

  if (isPaid) {
    return (
      <>
        <PaidIcon as="span" style={iconStyle} />
        {'Paid'}
      </>
    );
  }

  return 'Checkout';
}

function Checkout({ expirationInSec, lnInvoice, invoiceId, amount, isError }) {
  useRequireLogin();

  const {
    user: { shop },
  } = useUserContext();

  const { reset } = useCartContext();
  const [isExpired, setIsExpired] = useState(false);
  const { data: invoiceStatus } = usePollInvoice(invoiceId);
  const router = useRouter();
  const isPaid = invoiceStatus === 'PAID';
  const isLoading = useChangeRouteWatcher();

  useEffect(() => reset, [reset]);

  const timeBuffer = 7000;
  useTimeout(
    () => {
      if (!isPaid) {
        setIsExpired(true);
      }
    },
    isPaid ? null : expirationInSec * 1000 - timeBuffer
  );

  return isError ? (
    <Page height="100%">
      <Heading mt="auto" textAlign="center" as="h1" variant="category" mb={2}>
        Oops. Something went wrong.
      </Heading>

      <Button mt="auto" variant="outline" onClick={() => router.push(`/home`)}>
        Get outta here!
      </Button>
    </Page>
  ) : (
    <Page overflow="auto" height="100%">
      <Flex direction="column" alignItems="stretch">
        <Flex direction="column" alignItems="center">
          <Heading variant="headlineSmall" mb={5}>
            {mapInvoiceStateToHeader({ isPaid, isExpired })}
          </Heading>
          <QRCode
            data={lnInvoice}
            animationDuration={expirationInSec}
            isBlurred={isPaid || isExpired}
          />
          {isPaid ? (
            <Text mt="24px" mb="18px" color="face.positive">
              Invoice paid
            </Text>
          ) : (
            <Text mt="24px" mb="18px" color="object.warn">
              {isExpired
                ? 'Invoice has expired'
                : 'Scan with a Bitcoin Lightning Wallet'}
            </Text>
          )}
        </Flex>
        <HBar />
        <TableRow left="Merchant" right={shop} />
        <HBar />
        <TableRow left="Amount" right={currency(amount).format()} />
      </Flex>

      <VStack mt="auto" align="stretch">
        {isExpired && (
          <Button isLoading={isLoading} onClick={() => router.reload()}>
            Refresh
          </Button>
        )}

        {isPaid ? (
          <Button onClick={() => router.push(`/home`)}>Done</Button>
        ) : (
          <Button variant="outline" onClick={() => router.push(`/home`)}>
            Cancel your order
          </Button>
        )}
      </VStack>
    </Page>
  );
}

export async function getServerSideProps({ query }) {
  const { amount, desc: description, user: username, currency } = query;

  const errorResponse = { props: { isError: true } };

  if (amount || !currency || !username) {
    try {
      const {
        data: { invoiceId },
      } = await createInvoice({
        amount,
        currency,
        description,
        username,
      });

      const {
        data: { lnInvoice, expirationInSec },
      } = await fetchQuote(invoiceId);

      return {
        props: { expirationInSec, lnInvoice, amount, description, invoiceId },
      };
    } catch (e) {
      console.log(e);
      return errorResponse;
    }
  }

  return errorResponse;
}

export default Checkout;
