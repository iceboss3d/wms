import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ModalUI from "../../Components/Modal";
import { getCall, postCall } from "../../Helpers/api";

export default function Dispatch() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formDetails, setFormDetails] = useState({
    date: "",
    invoiceNumber: "",
    customerId: "",
  });

  const history = useHistory();
  const initialRef = useRef();

  const invoicesList = invoices.map((invoice, i) => (
    <Tr key={i}>
      <Td>{new Date(invoice.date).toLocaleDateString("en-UK")}</Td>
      <Td>{invoice.invoiceNumber}</Td>
      <Td>{invoice.customer.name}</Td>
      <Td>
        <IconButton
          aria-label="Edit Invoice"
          icon={<EditIcon />}
          onClick={() => {
            history.push(`/dispatch/${invoice.invoiceNumber}`);
          }}
        />
      </Td>
    </Tr>
  ));

  const customersList = customers.map((customer, i) => (
    <option key={i} value={customer.id}>
      {customer.name}
    </option>
  ));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCall("invoice", {
      ...formDetails,
      customerId: parseFloat(formDetails.customerId),
      date: formDetails.date,
    }).then((response: any) => {
      toast({
        status: "success",
        title: response.message,
        position: "top-right",
      });
      onClose();
      history.push(`/dispatch/${response.data.id}`);
    });
  };

  const getInvoices = () => {
    getCall("invoice").then(
      (response: any) => {
        console.log(response);
        setInvoices(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getCall("customer").then((response: any) => setCustomers(response.data));
    getInvoices();
  }, []);

  return (
    <div>
      <Button onClick={onOpen} mb={3}>
        Add Invoice
      </Button>
      <InputGroup size="sm" mb={3}>
        <Input placeholder="Search Products" />
        <InputRightAddon children={<SearchIcon />} />
      </InputGroup>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Invoice Number</Th>
            <Th>Customer</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{invoicesList}</Tbody>
      </Table>
      <ModalUI
        isOpen={isOpen}
        onClose={onClose}
        title="Add Invoice"
        initialFocusRef={initialRef}
      >
        <form onSubmit={handleSubmit}>
          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Date"
              type="date"
              name="date"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Invoice Number</FormLabel>
            <Input
              placeholder="Invoice Number"
              type="text"
              name="invoiceNumber"
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Customer</FormLabel>
            <Select
              placeholder="Customer"
              type="text"
              name="customerId"
              onChange={handleChange}
              required
            >
              {customersList}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="solid"
            color="primary"
            mt={4}
            isFullWidth
          >
            Add Invoice
          </Button>
        </form>
      </ModalUI>
    </div>
  );
}
