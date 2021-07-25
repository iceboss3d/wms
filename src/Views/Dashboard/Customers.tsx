import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import ModalUI from "../../Components/Modal";
import { AuthContext } from "../../Context";
import { getCall, postCall } from "../../Helpers/api";

export default function Customers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [customers, setCustomers] = useState([]);
  const [formDetails, setFormDetails] = useState({
    name: "",
    address: "",
    email: "",
    postCode: "",
    phoneNumber: "",
  });

  const initialRef = useRef();

  const customersList = customers.map((customer, i) => (
    <Tr key={i}>
      <Td>{customer.name}</Td>
      <Td>{customer.email}</Td>
      <Td>{customer.phoneNumber}</Td>
      <Td>{customer.address}</Td>
      <Td>{customer.postCode}</Td>
    </Tr>
  ));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCall("customer", formDetails).then((response: any) => {
      toast({
        status: "success",
        title: response.message,
        position: "top-right",
      });
      onClose();
      getCustomers();
    });
  };

  const getCustomers = () => {
    getCall("customer").then(
      (response: any) => {
        setCustomers(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <Button onClick={onOpen} mb={3}>
        Add Customer
      </Button>
      <InputGroup size="sm" mb={3}>
        <Input placeholder="Search Products" />
        <InputRightAddon children={<SearchIcon />} />
      </InputGroup>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Address</Th>
            <Th>Postal Code</Th>
          </Tr>
        </Thead>
        <Tbody>{customersList}</Tbody>
      </Table>
      <ModalUI
        isOpen={isOpen}
        onClose={onClose}
        title="Add Customer"
        initialFocusRef={initialRef}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Name"
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Phone Number"
              type="tel"
              name="phoneNumber"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="Address"
              type="text"
              name="address"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Postal Code</FormLabel>
            <Input
              placeholder="Postal Code"
              type="text"
              name="postCode"
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            type="submit"
            variant="solid"
            color="primary"
            mt={4}
            isFullWidth
          >
            Add Customer
          </Button>
        </form>
      </ModalUI>
    </div>
  );
}
