import propTypes from 'prop-types';

function Menu({ children }) {
    return <nav>{children}</nav>;
}

Menu.propTypes = {
    children: propTypes.node.isRequired,
};

export default Menu;
