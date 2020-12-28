import React, { FC, ReactNode } from "react";
import { call } from "utils/function";
import { gql, useMutation, useQuery } from "@apollo/client";

import { useForm } from "react-hook-form";
import { useTypedController } from "@hookform/strictly-typed";
import { validate as isValidEmail } from "email-validator";
import { isValidNumber as isValidPhone } from "libphonenumber-js";
import { validateURL, validateNumber, handleNumberInput } from "utils/input";

import {
  HiLink,
  HiMail,
  HiPencil,
  HiPhone,
  HiPhotograph,
} from "react-icons/hi";

import {
  Box,
  BoxProps,
  HStack,
  VStack,
  SimpleGrid,
  Center,
  Tag,
  Spacer,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { NumberInput, NumberInputField } from "@chakra-ui/react";
import {
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

import { InputIcon } from "components/input";
import { FormErrorMessage } from "components/form";

import { ShelterFood, ShelterTag } from "schema";
import { ShelterFormQuery, ShelterFormQueryVariables } from "schema";

import {
  CreateShelterInput,
  CreateShelterMutation,
  CreateShelterMutationVariables,
  CreateShelterMutation_createShelter_shelter,
} from "schema";

import {
  UpdateShelterMutation,
  UpdateShelterMutationVariables,
  UpdateShelterMutation_updateShelter_shelter,
} from "schema";

import { DeleteShelterMutation, DeleteShelterMutationVariables } from "schema";

const CREATE_SHELTER_MUTATION = gql`
  mutation CreateShelterMutation($input: CreateShelterInput!) {
    createShelter(input: $input) {
      shelter {
        id
        slug
        name
        about
        imageUrl
        email
        phone
        websiteUrl
        address {
          line1
          line2
          city
          region
          country
          postcode
        }
        location
        spots
        beds
        food
        tags
      }
    }
  }
`;

const UPDATE_SHELTER_MUTATION = gql`
  mutation UpdateShelterMutation($input: UpdateShelterInput!) {
    updateShelter(input: $input) {
      shelter {
        id
        slug
        name
        about
        imageUrl
        email
        phone
        websiteUrl
        address {
          line1
          line2
          city
          region
          country
          postcode
        }
        location
        spots
        beds
        food
        tags
      }
    }
  }
`;

const DELETE_SHELTER_MUTATION = gql`
  mutation DeleteShelterMutation($input: DeleteShelterInput!) {
    deleteShelter(input: $input)
  }
`;

const SHELTER_FORM_QUERY = gql`
  query ShelterFormQuery($id: ID!) {
    shelter(id: $id) {
      id
      name
      about
      imageUrl
      email
      phone
      websiteUrl
      address {
        line1
        line2
        city
        region
        country
        postcode
      }
      location
      spots
      beds
      food
      tags
    }
  }
`;

export interface ShelterFormProps extends BoxProps {
  readonly shelterId?: string;
  readonly isReadOnly?: boolean;
  readonly onCreate?: (
    shelter: CreateShelterMutation_createShelter_shelter,
  ) => void;
  readonly onUpdate?: (
    shelter: UpdateShelterMutation_updateShelter_shelter,
  ) => void;
  readonly onDelete?: () => void;
  readonly children: (disclosure: UseDisclosureReturn) => ReactNode;
}

interface ShelterFormValues
  extends Omit<CreateShelterInput, "location" | "spots" | "beds" | "food"> {
  location: (number | "")[];
  spots: number | "";
  beds: number | "";
  food: CreateShelterInput["food"] | null;
}

export const ShelterForm: FC<ShelterFormProps> = ({
  shelterId,
  isReadOnly,
  onCreate,
  onUpdate,
  onDelete,
  children,
  ...otherProps
}) => {
  const numColumns = useBreakpointValue({ base: 1, sm: 2 });
  const disclosure = useDisclosure();
  const { onClose: closeModal } = disclosure;

  const { data, loading: queryLoading } = useQuery<
    ShelterFormQuery,
    ShelterFormQueryVariables
  >(SHELTER_FORM_QUERY, {
    variables: {
      id: shelterId!,
    },
    skip: !shelterId,
  });
  const defaults = data?.shelter;

  const [createShelter, { loading: createLoading }] = useMutation<
    CreateShelterMutation,
    CreateShelterMutationVariables
  >(CREATE_SHELTER_MUTATION, {
    onCompleted: ({ createShelter }) => call(onCreate, createShelter.shelter),
  });

  const [updateShelter, { loading: updateLoading }] = useMutation<
    UpdateShelterMutation,
    UpdateShelterMutationVariables
  >(UPDATE_SHELTER_MUTATION, {
    onCompleted: ({ updateShelter }) => call(onUpdate, updateShelter.shelter),
  });

  const [deleteShelter, { loading: deleteLoading }] = useMutation<
    DeleteShelterMutation,
    DeleteShelterMutationVariables
  >(DELETE_SHELTER_MUTATION, {
    onCompleted: () => call(onDelete),
  });

  const {
    register,
    watch,
    control,
    errors: formErrors,
    formState: { isValid },
    handleSubmit,
  } = useForm<ShelterFormValues>({ mode: "all" });

  const onSubmit = handleSubmit(
    async ({ imageUrl, location, spots, beds, food, ...otherFields }) => {
      const params = {
        imageUrl: imageUrl || null,
        location: location as number[],
        spots: spots as number,
        beds: beds as number,
        food: food!,
        ...otherFields,
      };
      if (shelterId) {
        await updateShelter({
          variables: {
            input: { shelterId, ...params },
          },
        });
      } else {
        await createShelter({
          variables: {
            input: { ...params },
          },
        });
      }
      closeModal();
    },
  );

  const isNew = !shelterId;
  const imageUrl = watch("imageUrl", defaults?.imageUrl);
  const Controller = useTypedController<ShelterFormValues>({ control });
  const renderForm = () => {
    if (queryLoading) {
      return [...Array(5)].map((_, index) => <Skeleton key={index} h={16} />);
    }
    return (
      <>
        <FormControl isInvalid={!!formErrors.name}>
          <FormLabel>Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InputIcon as={HiPencil} />
            </InputLeftElement>
            <Input
              ref={register({ required: true })}
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={defaults?.name ?? ""}
              placeholder="St. Felix House"
              isRequired
              isReadOnly={isReadOnly}
            />
          </InputGroup>
          <FormErrorMessage errors={formErrors} name="name" />
        </FormControl>
        <FormControl isInvalid={!!formErrors.email}>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InputIcon as={HiMail} />
            </InputLeftElement>
            <Input
              ref={register({
                required: true,
                validate: value =>
                  isValidEmail(value) || "Invalid email address.",
              })}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={defaults?.email ?? ""}
              placeholder="info@stfelixcentre.com"
              isRequired
              isReadOnly={isReadOnly}
            />
          </InputGroup>
          <FormErrorMessage errors={formErrors} name="email" />
        </FormControl>
        <FormControl isInvalid={!!formErrors.phone}>
          <FormLabel>Phone</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InputIcon as={HiPhone} />
            </InputLeftElement>
            <Input
              ref={register({
                required: true,
                validate: value =>
                  isValidPhone(value) || "Invalid phone number.",
              })}
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={defaults?.phone ?? ""}
              placeholder="+1 (416) 203-1624"
              isRequired
              isReadOnly={isReadOnly}
            />
          </InputGroup>
          <FormErrorMessage errors={formErrors} name="phone" />
        </FormControl>
        <FormControl isInvalid={!!formErrors.websiteUrl}>
          <FormLabel>Website Link</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InputIcon as={HiLink} />
            </InputLeftElement>
            <Input
              ref={register({ validate: validateURL })}
              name="websiteUrl"
              type="url"
              defaultValue={defaults?.websiteUrl ?? ""}
              autoComplete="url"
              placeholder="https://stfelixcentre.org"
              isReadOnly={isReadOnly}
            />
          </InputGroup>
          <FormErrorMessage errors={formErrors} name="websiteUrl" />
        </FormControl>
        <FormControl isInvalid={!!formErrors.about}>
          <FormLabel>About</FormLabel>
          <Textarea
            ref={register}
            name="about"
            type="text"
            defaultValue={defaults?.about ?? ""}
            placeholder={
              "A non-profit community centre in downtown Toronto " +
              "that is dedicated to providing compassionate service " +
              "and safe, welcoming and respectful environment " +
              "inclusive of all religions, genders, cultures and " +
              "abilities."
            }
            isReadOnly={isReadOnly}
            minH={32}
          />
          <FormErrorMessage errors={formErrors} name="about" />
        </FormControl>
        <FormControl isInvalid={!!formErrors.imageUrl}>
          <FormLabel>Image Link</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InputIcon as={HiPhotograph} />
            </InputLeftElement>
            <Input
              ref={register({ validate: validateURL })}
              name="imageUrl"
              type="url"
              autoComplete="url"
              defaultValue={defaults?.imageUrl ?? ""}
              placeholder="https://stfelixcentre.org/wp-content/uploads/2018/10/The-Story-Page-Photo-web-new.jpg"
              isReadOnly={isReadOnly}
            />
          </InputGroup>
          <FormErrorMessage errors={formErrors} name="imageUrl" />
          {imageUrl && (
            <HStack align="flex-start" mt={3}>
              <Text fontSize="sm" fontWeight="medium">
                Preview:
              </Text>
              <Spacer />
              <Image
                src={imageUrl}
                alt="Shelter Image Preview"
                fit="cover"
                boxSize={32}
                borderRadius="md"
              />
            </HStack>
          )}
        </FormControl>
        <FormControl isInvalid={!!formErrors.address}>
          <FormLabel>Address</FormLabel>
          <VStack spacing={2} p={3} borderRadius="md" bg="gray.50">
            <FormControl isInvalid={!!formErrors.address?.line1}>
              <FormLabel fontSize="sm" mb={0}>
                Line 1
              </FormLabel>
              <Input
                ref={register({ required: true })}
                name="address.line1"
                type="text"
                size="sm"
                autoComplete="address-line1"
                defaultValue={defaults?.address?.line1 ?? ""}
                placeholder="25 Augusta Ave"
                isRequired
                isReadOnly={isReadOnly}
              />
              <FormErrorMessage errors={formErrors} name="address.line1" />
            </FormControl>
            <FormControl isInvalid={!!formErrors.address?.line2}>
              <FormLabel fontSize="sm" mb={0}>
                Line 2
              </FormLabel>
              <Input
                ref={register}
                name="address.line2"
                type="text"
                size="sm"
                autoComplete="address-line2"
                defaultValue={defaults?.address?.line2 ?? ""}
                isReadOnly={isReadOnly}
              />
              <FormErrorMessage errors={formErrors} name="address.line2" />
            </FormControl>
            <SimpleGrid columns={numColumns} spacing={2}>
              <FormControl isInvalid={!!formErrors.address?.city}>
                <FormLabel fontSize="sm" mb={0}>
                  City
                </FormLabel>
                <Input
                  ref={register({ required: true })}
                  name="address.city"
                  type="text"
                  size="sm"
                  autoComplete="address-level2"
                  defaultValue={defaults?.address?.city ?? ""}
                  placeholder="Toronto"
                  isRequired
                  isReadOnly={isReadOnly}
                />
                <FormErrorMessage errors={formErrors} name="address.city" />
              </FormControl>
              <FormControl isInvalid={!!formErrors.address?.region}>
                <FormLabel fontSize="sm" mb={0}>
                  Region
                </FormLabel>
                <Input
                  ref={register({ required: true })}
                  name="address.region"
                  type="text"
                  size="sm"
                  autoComplete="address-level1"
                  defaultValue={defaults?.address?.region ?? ""}
                  placeholder="Ontario"
                  isRequired
                  isReadOnly={isReadOnly}
                />
                <FormErrorMessage errors={formErrors} name="address.region" />
              </FormControl>
              <FormControl isInvalid={!!formErrors.address?.country}>
                <FormLabel fontSize="sm" mb={0}>
                  Country
                </FormLabel>
                <Input
                  ref={register({ required: true })}
                  name="address.country"
                  type="text"
                  size="sm"
                  autoComplete="country"
                  defaultValue={defaults?.address?.country ?? ""}
                  placeholder="Canada"
                  isRequired
                  isReadOnly={isReadOnly}
                />
                <FormErrorMessage errors={formErrors} name="address.country" />
              </FormControl>
              <FormControl isInvalid={!!formErrors.address?.postcode}>
                <FormLabel fontSize="sm" mb={0}>
                  Postal Code
                </FormLabel>
                <Input
                  ref={register({ required: true })}
                  name="address.postcode"
                  type="text"
                  size="sm"
                  autoComplete="postal-code"
                  defaultValue={defaults?.address?.postcode ?? ""}
                  placeholder="M5T 2K7"
                  isRequired
                  isReadOnly={isReadOnly}
                />
                <FormErrorMessage errors={formErrors} name="address.postcode" />
              </FormControl>
            </SimpleGrid>
          </VStack>
        </FormControl>
        <FormControl isInvalid={!!formErrors.location}>
          <FormLabel>Location</FormLabel>
          <HStack align="flex-start" p={3} borderRadius="md" bg="gray.50">
            <FormControl isInvalid={!!(formErrors.location ?? [])[1]}>
              <FormLabel fontSize="sm" mb={0}>
                Latitude
              </FormLabel>
              <Controller
                name={["location", 1]}
                rules={{ required: true, validate: validateNumber }}
                defaultValue={defaults?.location[0] ?? ""}
                render={({ onChange, ...otherProps }) => (
                  <NumberInput
                    pattern="-?[0-9]*(.[0-9]+)?"
                    precision={6}
                    defaultValue={defaults?.location[1]}
                    onChange={handleNumberInput(onChange)}
                    isReadOnly={isReadOnly}
                    allowMouseWheel={false}
                    size="sm"
                    {...otherProps}
                  >
                    <NumberInputField type="number" placeholder="43.649265" />
                  </NumberInput>
                )}
              />
              <FormErrorMessage errors={formErrors} name="location[1]" />
            </FormControl>
            <FormControl isInvalid={!!(formErrors.location ?? [])[0]}>
              <FormLabel fontSize="sm" mb={0}>
                Longitude
              </FormLabel>
              <Controller
                name={["location", 0]}
                rules={{ required: true, validate: validateNumber }}
                defaultValue={defaults?.location[1] ?? ""}
                render={({ onChange, ...otherProps }) => (
                  <NumberInput
                    pattern="-?[0-9]*(.[0-9]+)?"
                    precision={6}
                    defaultValue={defaults?.location[0]}
                    onChange={handleNumberInput(onChange)}
                    isReadOnly={isReadOnly}
                    size="sm"
                    allowMouseWheel={false}
                    {...otherProps}
                  >
                    <NumberInputField type="number" placeholder="-79.399421" />
                  </NumberInput>
                )}
              />
              <FormErrorMessage errors={formErrors} name="location[0]" />
            </FormControl>
          </HStack>
        </FormControl>
        <FormControl>
          <FormLabel>Capacity</FormLabel>
          <HStack align="flex-start" p={3} borderRadius="md" bg="gray.50">
            <FormControl isInvalid={!!formErrors.spots}>
              <FormLabel fontSize="sm" mb={0}>
                Spots
              </FormLabel>
              <Controller
                name="spots"
                rules={{
                  required: true,
                  validate: validateNumber,
                  min: { value: 0, message: "Must be non-negative." },
                }}
                defaultValue={defaults?.spots ?? ""}
                render={({ onChange, ...otherProps }) => (
                  <NumberInput
                    inputMode="numeric"
                    min={0}
                    onChange={handleNumberInput(onChange)}
                    isReadOnly={isReadOnly}
                    size="sm"
                    {...otherProps}
                  >
                    <NumberInputField type="number" placeholder="50" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <FormErrorMessage errors={formErrors} name="spots" />
            </FormControl>
            <FormControl isInvalid={!!formErrors.beds}>
              <FormLabel fontSize="sm" mb={0}>
                Beds
              </FormLabel>
              <Controller
                name="beds"
                rules={{
                  required: true,
                  validate: validateNumber,
                  min: { value: 0, message: "Must be non-negative." },
                }}
                defaultValue={defaults?.beds ?? ""}
                render={({ onChange, ...otherProps }) => (
                  <NumberInput
                    inputMode="numeric"
                    min={0}
                    onChange={handleNumberInput(onChange)}
                    isReadOnly={isReadOnly}
                    size="sm"
                    {...otherProps}
                  >
                    <NumberInputField type="number" placeholder="25" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <FormErrorMessage errors={formErrors} name="beds" />
            </FormControl>
          </HStack>
        </FormControl>
        <FormControl isInvalid={!!formErrors.food} isReadOnly={isReadOnly}>
          <FormLabel>Food Options</FormLabel>
          <Controller
            name="food"
            rules={{ required: true }}
            defaultValue={defaults?.food ?? null}
            render={({ value, onChange }) => (
              <RadioGroup value={value ?? undefined} onChange={onChange}>
                <HStack spacing={4} p={3} borderRadius="md" bg="gray.50">
                  <Radio value={ShelterFood.MEALS} isReadOnly={isReadOnly}>
                    Meals
                  </Radio>
                  <Radio value={ShelterFood.SNACKS} isReadOnly={isReadOnly}>
                    Snacks
                  </Radio>
                  <Radio value={ShelterFood.NONE} isReadOnly={isReadOnly}>
                    None
                  </Radio>
                </HStack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage errors={formErrors} name="food" />
        </FormControl>
        <FormControl isInvalid={!!formErrors.tags}>
          <FormLabel>Tags</FormLabel>
          <Controller
            name="tags"
            rules={{ required: true }}
            defaultValue={defaults?.tags ?? []}
            render={({ value, onChange }) => (
              <CheckboxGroup value={value} onChange={onChange}>
                <SimpleGrid
                  columns={numColumns}
                  p={3}
                  borderRadius="md"
                  bg="gray.50"
                >
                  <Checkbox value={ShelterTag.ADULT} isReadOnly={isReadOnly}>
                    Accepts Adults
                  </Checkbox>
                  <Checkbox value={ShelterTag.YOUTH} isReadOnly={isReadOnly}>
                    Accepts Youths
                  </Checkbox>
                  <Checkbox value={ShelterTag.MALE} isReadOnly={isReadOnly}>
                    Accepts Males
                  </Checkbox>
                  <Checkbox value={ShelterTag.FEMALE} isReadOnly={isReadOnly}>
                    Accepts Females
                  </Checkbox>
                  <Checkbox value={ShelterTag.LGBTQ} isReadOnly={isReadOnly}>
                    Accepts LGBTQ
                  </Checkbox>
                  <Checkbox value={ShelterTag.PETS} isReadOnly={isReadOnly}>
                    Pet Friendly
                  </Checkbox>
                </SimpleGrid>
              </CheckboxGroup>
            )}
          />
          <FormErrorMessage errors={formErrors} name="food" />
        </FormControl>
      </>
    );
  };

  return (
    <>
      <Box {...otherProps}>{children(disclosure)}</Box>
      <Modal {...disclosure} {...otherProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              {isReadOnly ? (
                <>Shelter Info</>
              ) : (
                <>{isNew ? "Register" : "Edit"} Shelter</>
              )}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="stretch" spacing={4}>
                {renderForm()}
              </VStack>
            </ModalBody>
            <ModalFooter>
              {!isReadOnly && (
                <HStack>
                  <Button
                    type="submit"
                    colorScheme="pink"
                    isLoading={createLoading || updateLoading}
                    isDisabled={!isValid}
                  >
                    {isNew ? "Submit" : "Update"}
                  </Button>
                  {shelterId && (
                    <Button
                      onClick={() => {
                        deleteShelter({
                          variables: {
                            input: { shelterId },
                          },
                        });
                      }}
                      isLoading={deleteLoading}
                    >
                      Delete
                    </Button>
                  )}
                </HStack>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
