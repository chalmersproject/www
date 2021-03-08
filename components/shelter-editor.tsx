import React, { FC, ReactNode } from "react";
import { call } from "utils/function";
import { formatError } from "utils/error";
import { validate as isValidEmail } from "email-validator";
import { isValidNumber as isValidPhone } from "libphonenumber-js";
import { validateURL, validateNumber, handleNumberInput } from "utils/input";

import { useQuery, useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useTypedController } from "@hookform/strictly-typed";

import {
  HiLink,
  HiMail,
  HiPencil,
  HiPhone,
  HiPhotograph,
} from "react-icons/hi";

import { Box, BoxProps, HStack, VStack, Spacer } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

import {
  NumberInput,
  NumberInputField,
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
import { Repeat } from "components/repeat";
import { useToast } from "components/toast";

import { ShelterFood, ShelterTag } from "schema";
import { ShelterEditorQuery, ShelterEditorQueryVariables } from "schema";

import {
  CreateShelterInput,
  CreateShelterMutation,
  CreateShelterMutationVariables,
  CreateShelterMutation_payload,
  CreateShelterMutation_payload_shelter_capacity,
} from "schema";

import {
  UpdateShelterMutation,
  UpdateShelterMutationVariables,
  UpdateShelterMutation_payload,
} from "schema";

import { DeleteShelterMutation, DeleteShelterMutationVariables } from "schema";

const CREATE_SHELTER_MUTATION = gql`
  mutation CreateShelterMutation($input: CreateShelterInput!) {
    payload: createShelter(input: $input) {
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
        capacity {
          spots
          beds
        }
        occupancy {
          spots
          beds
        }
        food
        tags
      }
    }
  }
`;

const UPDATE_SHELTER_MUTATION = gql`
  mutation UpdateShelterMutation($input: UpdateShelterInput!) {
    payload: updateShelter(input: $input) {
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
        capacity {
          spots
          beds
        }
        occupancy {
          spots
          beds
        }
        food
        tags
      }
    }
  }
`;

const DELETE_SHELTER_MUTATION = gql`
  mutation DeleteShelterMutation($input: DeleteShelterInput!) {
    payload: deleteShelter(input: $input)
  }
`;

const SHELTER_EDITOR_QUERY = gql`
  query ShelterEditorQuery($id: ID!) {
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
      capacity {
        spots
        beds
      }
      occupancy {
        spots
        beds
      }
      food
      tags
    }
  }
`;

export interface ShelterEditorProps extends BoxProps {
  readonly shelterId?: string;
  readonly isReadOnly?: boolean;
  readonly onCreate?: (payload: CreateShelterMutation_payload) => void;
  readonly onUpdate?: (payload: UpdateShelterMutation_payload) => void;
  readonly onDelete?: () => void;
  readonly children: (disclosure: UseDisclosureReturn) => ReactNode;
}

interface ShelterEditorFieldValues
  extends Omit<CreateShelterInput, "location" | "spots" | "capacity" | "food"> {
  location: (number | "")[];
  capacity: {
    spots: number | "";
    beds: number | "";
  };
  food: CreateShelterInput["food"] | null;
}

export const ShelterEditor: FC<ShelterEditorProps> = ({
  shelterId,
  isReadOnly,
  onCreate,
  onUpdate,
  onDelete,
  children,
  ...otherProps
}) => {
  const isNew = !shelterId;
  const toast = useToast();
  const disclosure = useDisclosure();
  const { onClose: closeModal } = disclosure;

  const { data } = useQuery<ShelterEditorQuery, ShelterEditorQueryVariables>(
    SHELTER_EDITOR_QUERY,
    {
      variables: shelterId ? { id: shelterId } : undefined,
      skip: !shelterId,
      onError: error =>
        toast({
          status: "error",
          title: "Failed to load shelter",
          description: formatError(error),
        }),
    },
  );
  const { shelter } = data ?? {};

  const [createShelter, { loading: isCreating }] = useMutation<
    CreateShelterMutation,
    CreateShelterMutationVariables
  >(CREATE_SHELTER_MUTATION, {
    onCompleted: ({ payload }) => {
      const { name } = payload.shelter;
      call(onCreate, payload);
      toast({
        status: "success",
        title: "Shelter created!",
        description: `${name} was successfully created.`,
      });
    },
    onError: error =>
      toast({
        status: "error",
        title: "Failed to create shelter",
        description: formatError(error),
      }),
  });

  const [updateShelter, { loading: isUpdating }] = useMutation<
    UpdateShelterMutation,
    UpdateShelterMutationVariables
  >(UPDATE_SHELTER_MUTATION, {
    onCompleted: ({ payload }) => {
      const { name } = payload.shelter;
      call(onUpdate, payload);
      toast({
        status: "success",
        title: "Shelter updated!",
        description: `${name} has been successfully updated.`,
      });
    },
  });

  const [deleteShelter, { loading: isDeleting }] = useMutation<
    DeleteShelterMutation,
    DeleteShelterMutationVariables
  >(DELETE_SHELTER_MUTATION, {
    onCompleted: () => {
      call(onDelete);
      const { name } = shelter!;
      toast({
        status: "success",
        title: "Shelter deleted!",
        description: `${name} has been successfully deleted.`,
      });
    },
    onError: error =>
      toast({
        status: "error",
        title: "Failed to delete shelter",
        description: formatError(error),
      }),
  });

  const {
    register,
    watch,
    control,
    errors: formErrors,
    formState: { isValid },
    handleSubmit,
  } = useForm<ShelterEditorFieldValues>({ mode: "all" });

  const onSubmit = handleSubmit(
    async ({ imageUrl, location, capacity, food, ...otherFields }) => {
      const params = {
        imageUrl: imageUrl || null,
        location: location as number[],
        capacity: capacity as CreateShelterMutation_payload_shelter_capacity,
        food: food!,
        ...otherFields,
      };
      if (shelterId) {
        await updateShelter({
          variables: {
            input: {
              shelterId,
              ...params,
            },
          },
        });
      } else {
        await createShelter({
          variables: {
            input: {
              ...params,
            },
          },
        });
      }
      closeModal();
    },
  );

  const Controller = useTypedController<ShelterEditorFieldValues>({ control });
  const sectionColumns = useBreakpointValue({ base: 1, sm: 2 });
  const sectionBg = useColorModeValue("gray.100", "gray.800");

  const renderNameField = () => {
    return (
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
            defaultValue={shelter?.name ?? ""}
            placeholder="St. Felix House"
            isRequired
            isReadOnly={isReadOnly}
          />
        </InputGroup>
        <FormErrorMessage errors={formErrors} name="name" />
      </FormControl>
    );
  };

  const renderEmailField = () => {
    return (
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
            defaultValue={shelter?.email ?? ""}
            placeholder="info@stfelixcentre.com"
            isRequired
            isReadOnly={isReadOnly}
          />
        </InputGroup>
        <FormErrorMessage errors={formErrors} name="email" />
      </FormControl>
    );
  };

  const renderPhoneField = () => {
    return (
      <FormControl isInvalid={!!formErrors.phone}>
        <FormLabel>Phone</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <InputIcon as={HiPhone} />
          </InputLeftElement>
          <Input
            ref={register({
              required: true,
              validate: value => isValidPhone(value) || "Invalid phone number.",
            })}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={shelter?.phone ?? ""}
            placeholder="+1 (416) 203-1624"
            isRequired
            isReadOnly={isReadOnly}
          />
        </InputGroup>
        <FormErrorMessage errors={formErrors} name="phone" />
      </FormControl>
    );
  };

  const renderWebsiteURLField = () => {
    return (
      <FormControl isInvalid={!!formErrors.websiteUrl}>
        <FormLabel>Website URL</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <InputIcon as={HiLink} />
          </InputLeftElement>
          <Input
            ref={register({ validate: validateURL })}
            name="websiteUrl"
            type="url"
            defaultValue={shelter?.websiteUrl ?? ""}
            autoComplete="url"
            placeholder="https://stfelixcentre.org"
            isReadOnly={isReadOnly}
          />
        </InputGroup>
        <FormErrorMessage errors={formErrors} name="websiteUrl" />
      </FormControl>
    );
  };

  const renderImageURLField = () => {
    const imageUrl = watch("imageUrl", shelter?.imageUrl);
    return (
      <FormControl isInvalid={!!formErrors.imageUrl}>
        <FormLabel>Image URL</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <InputIcon as={HiPhotograph} />
          </InputLeftElement>
          <Input
            ref={register({ validate: validateURL })}
            name="imageUrl"
            type="url"
            autoComplete="url"
            defaultValue={shelter?.imageUrl ?? ""}
            placeholder="https://stfelixcentre.org/wp-content/uploads/2018/10/The-Story-Page-Photo-web-new.jpg"
            isReadOnly={isReadOnly}
          />
        </InputGroup>
        <FormErrorMessage errors={formErrors} name="imageUrl" />
        {imageUrl && (
          <HStack align="start" p={3} rounded="md" bg={sectionBg} mt={2}>
            <Text fontSize="sm" fontWeight="medium">
              Preview:
            </Text>
            <Spacer />
            <Image
              src={imageUrl}
              alt="Shelter Image Preview"
              fit="cover"
              boxSize={32}
              rounded="md"
            />
          </HStack>
        )}
      </FormControl>
    );
  };

  const renderAboutField = () => {
    return (
      <FormControl isInvalid={!!formErrors.about}>
        <FormLabel>About</FormLabel>
        <Textarea
          ref={register}
          name="about"
          type="text"
          defaultValue={shelter?.about ?? ""}
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
    );
  };

  const renderAddressFields = () => {
    return (
      <FormControl isInvalid={!!formErrors.address}>
        <FormLabel>Address</FormLabel>
        <VStack align="stretch" spacing={2} rounded="md" p={3} bg={sectionBg}>
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
              defaultValue={shelter?.address?.line1 ?? ""}
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
              defaultValue={shelter?.address?.line2 ?? ""}
              isReadOnly={isReadOnly}
            />
            <FormErrorMessage errors={formErrors} name="address.line2" />
          </FormControl>
          <SimpleGrid columns={sectionColumns} spacing={2}>
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
                defaultValue={shelter?.address?.city ?? ""}
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
                defaultValue={shelter?.address?.region ?? ""}
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
                defaultValue={shelter?.address?.country ?? ""}
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
                defaultValue={shelter?.address?.postcode ?? ""}
                placeholder="M5T 2K7"
                isRequired
                isReadOnly={isReadOnly}
              />
              <FormErrorMessage errors={formErrors} name="address.postcode" />
            </FormControl>
          </SimpleGrid>
        </VStack>
      </FormControl>
    );
  };

  const renderLocationFields = () => {
    return (
      <FormControl isInvalid={!!formErrors.location}>
        <FormLabel>Location</FormLabel>
        <SimpleGrid
          columns={sectionColumns}
          spacing={2}
          rounded="md"
          p={3}
          bg={sectionBg}
        >
          <FormControl isInvalid={!!(formErrors.location ?? [])[1]}>
            <FormLabel fontSize="sm" mb={0}>
              Latitude
            </FormLabel>
            <Controller
              name={["location", 1]}
              rules={{ required: true, validate: validateNumber }}
              defaultValue={shelter?.location[1] ?? ""}
              render={({ onChange, ...otherProps }) => (
                <NumberInput
                  pattern="-?[0-9]*(.[0-9]+)?"
                  onChange={handleNumberInput(onChange)}
                  isReadOnly={isReadOnly}
                  allowMouseWheel={false}
                  size="sm"
                  {...otherProps}
                >
                  <NumberInputField
                    type="number"
                    step="any"
                    placeholder="43.649265"
                  />
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
              defaultValue={shelter?.location[0] ?? ""}
              render={({ onChange, ...otherProps }) => (
                <NumberInput
                  pattern="-?[0-9]*(.[0-9]+)?"
                  onChange={handleNumberInput(onChange)}
                  isReadOnly={isReadOnly}
                  size="sm"
                  allowMouseWheel={false}
                  {...otherProps}
                >
                  <NumberInputField
                    type="number"
                    step="any"
                    placeholder="-79.399421"
                  />
                </NumberInput>
              )}
            />
            <FormErrorMessage errors={formErrors} name="location[0]" />
          </FormControl>
        </SimpleGrid>
      </FormControl>
    );
  };

  const renderCapacityFields = () => {
    return (
      <FormControl>
        <FormLabel>Capacity</FormLabel>
        <SimpleGrid
          columns={sectionColumns}
          spacing={2}
          rounded="md"
          p={3}
          bg={sectionBg}
        >
          <FormControl isInvalid={!!formErrors.capacity?.spots}>
            <FormLabel fontSize="sm" mb={0}>
              Spots
            </FormLabel>
            <Controller
              name={["capacity", "spots"]}
              rules={{
                required: true,
                validate: validateNumber,
                min: { value: 0, message: "Must be non-negative." },
              }}
              defaultValue={shelter?.capacity.spots ?? ""}
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
            <FormErrorMessage errors={formErrors} name="capacity.spots" />
          </FormControl>
          <FormControl isInvalid={!!formErrors.capacity?.beds}>
            <FormLabel fontSize="sm" mb={0}>
              Beds
            </FormLabel>
            <Controller
              name={["capacity", "beds"]}
              rules={{
                required: true,
                validate: validateNumber,
                min: { value: 0, message: "Must be non-negative." },
              }}
              defaultValue={shelter?.capacity.beds ?? ""}
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
            <FormErrorMessage errors={formErrors} name="capacity.beds" />
          </FormControl>
        </SimpleGrid>
      </FormControl>
    );
  };

  const renderFoodOptionsField = () => {
    return (
      <FormControl isInvalid={!!formErrors.food} isReadOnly={isReadOnly}>
        <FormLabel>Food Options</FormLabel>
        <Controller
          name="food"
          rules={{ required: true }}
          defaultValue={shelter?.food ?? null}
          render={({ value, onChange }) => (
            <RadioGroup value={value ?? undefined} onChange={onChange}>
              <HStack spacing={4} p={3} rounded="md" bg={sectionBg}>
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
    );
  };

  const renderTagsField = () => {
    return (
      <FormControl isInvalid={!!formErrors.tags}>
        <FormLabel>Tags</FormLabel>
        <Controller
          name="tags"
          rules={{ required: true }}
          defaultValue={shelter?.tags ?? []}
          render={({ value, onChange }) => (
            <CheckboxGroup value={value} onChange={onChange}>
              <SimpleGrid
                columns={sectionColumns}
                rounded="md"
                p={3}
                bg={sectionBg}
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
    );
  };

  const renderFields = () => {
    if (shelterId && !data) {
      return <Repeat count={5}>{key => <Skeleton key={key} h={20} />}</Repeat>;
    }
    return (
      <>
        {renderNameField()}
        {renderEmailField()}
        {renderPhoneField()}
        {renderWebsiteURLField()}
        {renderAboutField()}
        {renderImageURLField()}
        {renderAddressFields()}
        {renderLocationFields()}
        {renderCapacityFields()}
        {renderFoodOptionsField()}
        {renderTagsField()}
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
                {renderFields()}
              </VStack>
            </ModalBody>
            <ModalFooter>
              {!isReadOnly && (
                <HStack>
                  <Button
                    type="submit"
                    colorScheme="pink"
                    isLoading={isCreating || isUpdating}
                    isDisabled={!isValid}
                  >
                    {isNew ? "Create" : "Update"}
                  </Button>
                  {shelterId && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        deleteShelter({
                          variables: {
                            input: { shelterId },
                          },
                        });
                      }}
                      isLoading={isDeleting}
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
