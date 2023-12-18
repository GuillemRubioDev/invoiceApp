import { getInvoice, calculateTotal } from "./services/getInvoice";
import { InvoiceView } from "./components/invoiceView";
import { ClientView } from "./components/clientView";
import { CompanyView } from "./components/comanyView";
import { ListItemsVies } from "./components/listItemsView";
import { useEffect, useState } from "react";
import { TotalView } from "./components/totalView";
import { FormInvoiceItemsView } from "./components/FormInvoiceItemsView";

const invoiceInitial = {
  id: 0,
  name: "",
  client: {
    name: "",
    lastName: "",
    address: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
  },
  company: {
    name: "",
    fiscalNumber: 0,
  },
  items: [{ id: 0, product: "", price: 0, quantity: 0 }],
};

export const InvoiceApp = () => {
  const [counter, setCounter] = useState(4);

  const [invoice, setInvoice] = useState(invoiceInitial);

  const [items, setItems] = useState([]);

  const [total, setTotal] = useState(0);

  const { id, name, client, company } = invoice;

  useEffect(() => {
    const data = getInvoice();
    console.log(data);
    setInvoice(data);
    setItems(data.items);
  }, []);

  useEffect(() => {
    //  console.log("counter modificado");
  }, [counter]);

  useEffect(() => {
    console.log("items cambio");
    // const newTotal = items.reduce(
    //   (acc, item) => acc + item.price * item.quantity,
    //   0
    // );
    // setInvoice((prevInvoice) => ({ ...prevInvoice, total: newTotal }));

    setTotal(calculateTotal(items));
  }, [items]);

  const handlerAddInvoiceItems = ({ product, price, quantity }) => {
    setItems([
      ...items,
      {
        id: counter,
        product: product.trim(),
        price: +price.trim(),
        quantity: parseInt(quantity.trim(), 10),
      },
    ]);

    setCounter(counter + 1);
  };

  return (
    <>
      <div className="container">
        <div className="card my-3">
          <div className="card-header">Ejemplo factura</div>
          <div className="card-body">
            <InvoiceView id={id} name={name} />
            <div className="row my-3">
              <div className="col">
                <ClientView client={client} title="Datos del cliente" />
              </div>
              <div className="col">
                <CompanyView company={company} title="Datos de la empresa" />
              </div>
            </div>
            <ListItemsVies title="Productos de factura" items={items} />
            <TotalView total={total} />
            <FormInvoiceItemsView handler={handlerAddInvoiceItems} />
          </div>
        </div>
      </div>
    </>
  );
};
