import { RowItemView } from "./rowItemView";
import { PropTypes } from "prop-types";

export const ListItemsVies = ({ items, title }) => {
  return (
    <>
      <h4>{title}</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, product, price, quantity }) => (
            <RowItemView
              key={id}
              product={product}
              price={price}
              quantity={quantity}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

ListItemsVies.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
