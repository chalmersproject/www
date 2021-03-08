import React, { FC, ReactNode } from "react";
import { call } from "utils/function";
import { formatError } from "utils/error";

import { useQuery, useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useTypedController } from "@hookform/strictly-typed";

import { HiPencil } from "react-icons/hi";

import { Box, HStack, VStack } from "@chakra-ui/react";
import { BoxProps } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";

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

import {
  ShelterMeasure,
  SignalEditorQuery,
  SignalEditorQueryVariables,
} from "schema";

import {
  CreateSignalMutation,
  CreateSignalMutationVariables,
  CreateSignalMutation_payload,
  CreateSignalInput,
} from "schema";

import {
  DeleteSignalMutation,
  DeleteSignalMutationVariables,
  DeleteSignalMutation_payload,
} from "schema";

const CREATE_SIGNAL_MUTATION = gql`
  mutation CreateSignalMutation($input: CreateSignalInput!) {
    payload: createSignal(input: $input) {
      signal {
        id
        name
        slug
        measure
        value
        shelter {
          id
          signals {
            id
          }
        }
      }
    }
  }
`;

const DELETE_SIGNAL_MUTATION = gql`
  mutation DeleteSignalMutation($input: DeleteSignalInput!) {
    payload: deleteSignal(input: $input) {
      shelter {
        id
        signals {
          id
        }
      }
    }
  }
`;

const SIGNAL_EDITOR_QUERY = gql`
  query SignalEditorQuery($id: ID!) {
    signal(id: $id) {
      id
      name
      measure
      shelter {
        id
      }
    }
  }
`;

export interface SignalEditorProps extends BoxProps {
  readonly shelterId: string | undefined;
  readonly signalId?: string;
  readonly isReadOnly?: boolean;
  readonly onCreate?: (payload: CreateSignalMutation_payload) => void;
  readonly onDelete?: (payload: DeleteSignalMutation_payload) => void;
  readonly children: (disclosure: UseDisclosureReturn) => ReactNode;
}

interface SignalEditorFieldValues
  extends Omit<CreateSignalInput, "shelterId" | "measure"> {
  measure: ShelterMeasure | null;
}

export const SignalEditor: FC<SignalEditorProps> = ({
  shelterId,
  signalId,
  isReadOnly,
  onCreate,
  onDelete,
  children,
  ...otherProps
}) => {
  const isNew = !signalId;
  const toast = useToast();
  const disclosure = useDisclosure();
  const { onClose: closeModal } = disclosure;

  const { data } = useQuery<SignalEditorQuery, SignalEditorQueryVariables>(
    SIGNAL_EDITOR_QUERY,
    {
      variables: signalId ? { id: signalId } : undefined,
      skip: !signalId,
      onError: error =>
        toast({
          status: "error",
          title: "Failed to load signal",
          description: formatError(error),
        }),
    },
  );
  const { signal } = data ?? {};

  const [createSignal, { loading: isCreating }] = useMutation<
    CreateSignalMutation,
    CreateSignalMutationVariables
  >(CREATE_SIGNAL_MUTATION, {
    onCompleted: ({ payload }) => {
      const { name } = payload?.signal;
      call(onCreate, payload);
      toast({
        status: "success",
        title: "Signal created!",
        description: `${name} has been successfully created.`,
      });
    },
    onError: error =>
      toast({
        status: "error",
        title: "Failed to create signal",
        description: formatError(error),
      }),
  });

  const [deleteSignal, { loading: isDeleting }] = useMutation<
    DeleteSignalMutation,
    DeleteSignalMutationVariables
  >(DELETE_SIGNAL_MUTATION, {
    onCompleted: ({ payload }) => {
      const { name } = signal!;
      call(onDelete, payload);
      toast({
        status: "success",
        title: "Signal created!",
        description: `${name} has been successfully created.`,
      });
    },
    onError: error =>
      toast({
        status: "error",
        title: "Failed to delete signal",
        description: formatError(error),
      }),
  });

  const {
    register,
    control,
    errors: formErrors,
    formState: { isValid },
    handleSubmit,
  } = useForm<SignalEditorFieldValues>({ mode: "all" });

  const onSubmit = handleSubmit(async ({ name, measure }) => {
    if (!shelterId) {
      throw new Error("Missing shelter ID.");
    }
    if (!measure) {
      throw new Error("Missing signal measure.");
    }
    await createSignal({
      variables: {
        input: {
          shelterId,
          name,
          measure,
        },
      },
    });
    closeModal();
  });

  const Controller = useTypedController<SignalEditorFieldValues>({ control });
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
            defaultValue={signal?.name ?? ""}
            placeholder="Bed Tracker"
            isRequired
            isReadOnly={isReadOnly}
          />
        </InputGroup>
        <FormErrorMessage errors={formErrors} name="name" />
      </FormControl>
    );
  };

  const renderMeasureField = () => {
    return (
      <FormControl isInvalid={!!formErrors.name}>
        <FormLabel>Measure</FormLabel>
        <Controller
          name="measure"
          rules={{ required: true }}
          defaultValue={signal?.measure ?? null}
          render={({ value, onChange }) => (
            <RadioGroup value={value ?? undefined} onChange={onChange}>
              <HStack spacing={4} p={3} rounded="md">
                <Radio value={ShelterMeasure.SPOTS} isReadOnly={isReadOnly}>
                  Spots
                </Radio>
                <Radio value={ShelterMeasure.BEDS} isReadOnly={isReadOnly}>
                  Beds
                </Radio>
              </HStack>
            </RadioGroup>
          )}
        />
        <FormErrorMessage errors={formErrors} name="name" />
      </FormControl>
    );
  };

  const renderFields = () => {
    if (!shelterId || (signalId && !data)) {
      return <Repeat count={2}>{key => <Skeleton key={key} h={20} />}</Repeat>;
    }
    return (
      <>
        {renderNameField()}
        {renderMeasureField()}
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
                <>Signal Info</>
              ) : (
                <>{isNew ? "Register" : "Edit"} Signal</>
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
                    isLoading={isCreating}
                    isDisabled={!isValid}
                  >
                    {isNew ? "Create" : "Update"}
                  </Button>
                  {signalId && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        deleteSignal({
                          variables: {
                            input: { signalId },
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
