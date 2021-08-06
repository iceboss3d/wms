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
import React, { useEffect, useRef, useState } from "react";
import ModalUI from "../../Components/Modal";
import { getCall, postCall } from "../../Helpers/api";

export default function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [formDetails, setFormDetails] = useState({
    code: "",
    salesPrice: "",
    description: "",
    location: "",
    quantity: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const initialRef = useRef();

  const productsList = products
    .filter(
      (product) =>
        product.code.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
    )
    .map((product, i) => (
      <Tr key={i}>
        <Td>{product.code}</Td>
        <Td>{product.description}</Td>
        <Td>{product.quantityInStock}</Td>
        <Td>
          {product.salesPrice.toLocaleString("en-UK", {
            style: "currency",
            currency: "GBP",
          })}
        </Td>
        <Td>{product.location}</Td>
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
    postCall("product", {
      ...formDetails,
      salesPrice: parseFloat(formDetails.salesPrice),
      quantityInStock: parseInt(formDetails.quantity),
    }).then((response: any) => {
      toast({
        status: "success",
        title: response.message,
        position: "top-right",
      });
      onClose();
      getProducts();
    });
  };

  const getProducts = () => {
    getCall("product").then(
      (response: any) => {
        setProducts(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Button onClick={onOpen} mb={3}>
        Add Product
      </Button>
      <InputGroup size="sm" mb={3}>
        <Input placeholder="Search Products" onChange={(e) => setSearchQuery(e.target.value)} />
        <InputRightAddon children={<SearchIcon />} />
      </InputGroup>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Description</Th>
            <Th>Qty</Th>
            <Th>Sales Price</Th>
            <Th>Location</Th>
          </Tr>
        </Thead>
        <Tbody>{productsList}</Tbody>
      </Table>
      <ModalUI
        isOpen={isOpen}
        onClose={onClose}
        title="Add Product"
        initialFocusRef={initialRef}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Code</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Code"
              type="text"
              name="code"
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              type="text"
              name="description"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Sales Price</FormLabel>
            <Input
              placeholder="Sales Price"
              type="number"
              name="salesPrice"
              step=".01"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location"
              type="text"
              name="location"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Input
              placeholder="Quantity"
              type="number"
              name="quantity"
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
            Add Product
          </Button>
        </form>
      </ModalUI>
    </div>
  );
}
