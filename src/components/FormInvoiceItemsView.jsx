import { useEffect, useState } from "react";

export const FormInvoiceItemsView = ({ handler }) => {
  const [formItemsState, setFormItemsState] = useState({
    product: "",
    price: "",
    quantity: "",
  });

  const { product, price, quantity } = formItemsState;

  useEffect(() => {
    // console.log("precio modificado");
  }, [price]);

  useEffect(() => {
    // console.log("precio formItemsState modificado");
  }, [formItemsState]);

  const onInputChange = ({ target: { name, value } }) => {
    //console.log(value);
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

    handler(formItemsState);

    setFormItemsState({
      product: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <>
      <form className="w-50" onSubmit={(event) => onInvoiceItemsSubmit(event)}>
        <input
          type="text"
          required={true}
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
          required={true}
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
          required={true}
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
      ;
    </>
  );
};
