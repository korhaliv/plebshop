import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
} from '@chakra-ui/react';
import Button from 'components/Button';
import { Group } from 'components/Group';
import Input from 'components/Input';
import { Page } from 'components/Page';
import Text from 'components/Text';
import { useProductContext } from 'context/product';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { compressFile } from 'utils/compress';

export const AddNewProduct = () => {
  const router = useRouter();
  const { addProduct } = useProductContext();
  const [image, setImage] = useState();
  const [error, setError] = useState();
  const [isProcessingFile, setIsProcessingFile] = useState();

  const onRemoveMedia = () => {
    setImage(null);
  };

  const onSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    const firstFile = e.target?.image?.files[0];
    if (firstFile && image) {
      const onError = (err) => {
        console.log('error', err);
      };

      const onReady = (encoded) => {
        addProduct({
          price: e.target.price.value,
          category: '',
          name: e.target.title.value,
          image: encoded,
        });

        router.push(`/home`);
      };

      const reader = new FileReader();

      // create preview URL with original file user uploaded cause then it's a direct link to the file
      // on their disk
      const previewUrl = window.URL.createObjectURL(firstFile);

      reader.onabort = onError;
      reader.onerror = onError;
      reader.onload = () => {
        onReady(reader.result.toString(), previewUrl);
      };

      reader.readAsDataURL(firstFile);
    } else {
      setError('Media is required');
    }
  };

  const onChange = async (e) => {
    try {
      setIsProcessingFile(true);
      const file = e.target.files[0];
      if (file) {
        setError(null);
        const compressedFile = await compressFile(file, 0.1);
        setImage(URL.createObjectURL(compressedFile));
      }
    } finally {
      setIsProcessingFile(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ minHeight: '100%' }}>
      <Page minHeight="100%">
        <Text color="face.primary" fontWeight="bold" mb={5}>
          Add product
        </Text>
        <Flex height="100%" flexDirection="column">
          <Group caption="Product" mb={5}>
            <Box>
              <FormLabel>Title</FormLabel>
              <Input name="title" mb={3} required autoFocus />
            </Box>

            <Box>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                placeholder="$"
                type="number"
                min={0.01}
                max={9999}
                step="0.01"
                required
              />
            </Box>
            <Box>
              <FormControl isInvalid={!!error}>
                <HStack justify="space-between">
                  <FormLabel>Media</FormLabel>
                  <Text fontSize="13px" color="face.tertiary" pr={4}>
                    128x128px
                  </Text>
                </HStack>
                <Box
                  borderRadius="16px"
                  p={4}
                  boxSizing="border-box"
                  sx={{
                    borderWidth: 1,
                    borderColor: 'border.secondary',
                  }}
                >
                  {image ? (
                    <HStack>
                      <Image
                        sx={{
                          borderRadius: 5,
                          objectFit: 'contain',
                        }}
                        width={39}
                        height={39}
                        src={image}
                        alt="preview"
                      />
                      <Button
                        color="face.negative"
                        fontSize="13px"
                        p="0px"
                        m={0}
                        onClick={onRemoveMedia}
                        sx={{ textDecoration: 'underline' }}
                        variant="unstyled"
                      >
                        Remove file
                      </Button>
                    </HStack>
                  ) : (
                    <>
                      <label style={{ cursor: 'pointer' }} htmlFor="file">
                        <Button
                          variant="mini"
                          height="32px"
                          isLoading={isProcessingFile}
                          style={{ pointerEvents: 'none' }}
                        >
                          Add File
                        </Button>
                      </label>
                    </>
                  )}
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    id="file"
                    name="image"
                    onChange={onChange}
                    accept="image/png, image/jpeg"
                  />
                </Box>
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
            </Box>
          </Group>
        </Flex>
        <Flex direction="column">
          <Button type="submit">Save product</Button>
          <Button mt={4} variant="outline" onClick={() => router.push(`/home`)}>
            Discard
          </Button>
        </Flex>
      </Page>
    </form>
  );
};
