import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ModalUI from "../../Components/Modal";
import { getCall, postCall, putCall } from "../../Helpers/api";

export default function DispatchInvoice(props) {
  const id = props.match.params.id;

  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<any>();
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formDetails, setFormDetails] = useState({
    noOfUnits: "",
    productCode: "",
    invoiceNumber: id,
  });
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const customersList = customers.map((customer, i) => {
    return (
      <option key={i} value={customer.id}>
        {customer.name}
      </option>
    );
  });

  const productsList = products.map((product, i) => {
    return (
      <option key={i} value={product.code}>
        {product.description}
      </option>
    );
  });

  const invoiceItemsList = invoiceItems.map((invoice, i) => (
    <Tr>
      <Td>{i + 1}</Td>
      <Td>{invoice.product.description}</Td>
      <Td>{invoice.noOfUnits}</Td>
      <Td>
        {(invoice.product.salesPrice * invoice.noOfUnits).toLocaleString(
          "en-UK",
          { style: "currency", currency: "GBP" }
        )}
      </Td>
    </Tr>
  ));

  const handleItemSubmit = (e) => {
    e.preventDefault();
    postCall("invoice-item", {
      ...formDetails,
      noOfUnits: parseFloat(formDetails.noOfUnits),
    }).then((response: any) => {
      toast({
        status: "success",
        title: response.message,
        position: "top-right",
      });
      onClose();
      getInvoice();
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getInvoice = () => {
    getCall(`invoice/${id}`).then(
      (response: any) => {
        setInvoice(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
    getCall(`invoice-item/${id}`).then(
      (response: any) => {
        console.log(response.data);

        setInvoiceItems(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getCustomers = () => {
    getCall("customer").then((response: any) => setCustomers(response.data));
  };

  const getProducts = () => {
    getCall("product").then((response: any) => setProducts(response.data));
  };

  const dispatchInvoice = () => {
    putCall(`invoice/dispatch/${id}`, {}).then(
      (response: any) => {
        toast({
          status: "success",
          title: response.message,
          position: "top-right",
        });
        history.push(`/dispatch/`)
      },
      (err) =>
        toast({ status: "error", title: err.message, position: "top-right" })
    );
  };

  useEffect(() => {
    getInvoice();
    getCustomers();
    getProducts();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Spinner thickness="4px" color="blue.500" size="xl" />
      </Flex>
    );
  }
  return (
    <div>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Heading>{invoice?.invoiceNumber}</Heading>
        <Stack spacing="1" direction="row">
          {/* <Button variant="outline" colorScheme="facebook">
            Edit Invoice
          </Button> */}
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => dispatchInvoice()}
            disabled={invoice?.dispatchStatus}
          >
            Dispatch Invoice
          </Button>
        </Stack>
      </Flex>
      <Box mt={4}>
        <form>
          <Stack direction={["column", "row"]}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                placeholder="Date"
                type="date"
                name="date"
                value={dayjs(invoice?.date).format("YYYY-MM-DD")}
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
                value={invoice?.invoiceNumber}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Customer</FormLabel>
              <Select
                placeholder="Customer"
                type="text"
                name="customerId"
                value={invoice?.customer.id}
                onChange={handleChange}
                required
              >
                {customersList}
              </Select>
            </FormControl>
          </Stack>
        </form>
      </Box>
      <Box mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {invoiceItemsList}
            <Tr>
              <Td></Td>
              <Td>Total</Td>
              <Td></Td>
              <Td>
                {invoiceItems
                  .reduce(
                    (total, item) =>
                      total + item.product.salesPrice * item.noOfUnits,
                    0
                  )
                  .toLocaleString("en-UK", {
                    style: "currency",
                    currency: "GBP",
                  })}
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button
          variant="outline"
          colorScheme="facebook"
          type="button"
          mt={4}
          onClick={() => onOpen()}
          disabled={invoice?.dispatchStatus}
        >
          Add Items
        </Button>
      </Box>
      <ModalUI
        isOpen={isOpen}
        onClose={onClose}
        title="Add Invoice"
        initialFocusRef={initialRef}
      >
        <form onSubmit={handleItemSubmit}>
          <FormControl mt={4}>
            <FormLabel>Product</FormLabel>
            <Select
              placeholder="Product"
              name="productCode"
              onChange={handleChange}
              required
            >
              {productsList}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Number of Units</FormLabel>
            <Input
              placeholder="Number of Units"
              type="number"
              name="noOfUnits"
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
            Add Invoice
          </Button>
        </form>
      </ModalUI>
    </div>
  );
}
