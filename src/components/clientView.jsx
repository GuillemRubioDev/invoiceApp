import { PropTypes } from "prop-types";

export const ClientView = ({ client, title }) => {
  const {
    name: nameClient,
    lastName,
    address: { country, city, street, number },
  } = client;

  let nombreCompleto = nameClient + " " + lastName;

  return (
    <>
      <h3>{title}</h3>
      <ul className="list-group">
        <li className="list-group-item active">Name: {nombreCompleto}</li>
        <li className="list-group-item">
          Name: {country} / {city}
        </li>
        <li className="list-group-item">
          {street}, {number}
        </li>
      </ul>
    </>
  );
};

ClientView.propTypes = {
  client: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
