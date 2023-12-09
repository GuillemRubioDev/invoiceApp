import { getInvoice } from "./services/getInvoice";
import { InvoiceView } from "./components/invoiceView";
import { ClientView } from "./components/clientView";
import { CompanyView } from "./components/comanyView";
import { ListItemsVies } from "./components/listItemsView";
import { useState } from "react";
import { TotalView } from "./components/totalView";

export const InvoiceApp = () => {
  const {
    total,
    id,
    name,
    client,
    company,
    items: itemsInitial,
  } = getInvoice();

  const [formItemsState, setFormItemsState] = useState({
    product: "",
    price: "",
    quantity: "",
  });

  const { product, price, quantity } = formItemsState;

  const [items, setItems] = useState(itemsInitial);

  const [counter, setCounter] = useState(4);

  const onInputChange = ({ target: { name, value } }) => {
    console.log(value);
    setFormItemsState({
      ...formItemsState,
      [name]: value,
    });
  };

  const onInvoiceItemsSubmit = (event) => {
    event.preventDefault();

    if (product.trim().length == 0) return;
    if (price.trim().length == 0) return;
    if (quantity.trim().length == 0) return;
    if (isNaN(price.trim())) {
      alert("El precio tiene que ser numérico");
      return;
    }
    if (isNaN(quantity.trim())) {
      alert("La cantidad tiene que ser numérica");
      return;
    }
    setItems([
      ...items,
      {
        id: counter,
        product: product.trim(),
        price: +price.trim(),
        quantity: parseInt(quantity.trim(), 10),
      },
    ]);

    setFormItemsState({
      product: "",
      price: "",
      quantity: "",
    });
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
            <form className="w-50" onSubmit={(event) => onInputChange(event)}>
              <input
                type="text"
                required="true"
                name="product"
                value={product}
                placeholder="Producto"
                className="form-control m-3"
                onChange={(event) => {
                  onInputChange(event);
                }}
              ></input>
              <input
                type="text"
                required="true"
                name="price"
                value={price}
                placeholder="Precio"
                className="form-control m-3"
                onChange={(event) => {
                  onInputChange(event);
                }}
              ></input>
              <input
                type="text"
                required="true"
                name="quantity"
                value={quantity}
                placeholder="Cantidad"
                className="form-control m-3"
                onChange={(event) => {
                  onInputChange(event);
                  event;
                }}
              ></input>
              <button type="submite" className="btn btn-primary m-3">
                Nuevo item
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
