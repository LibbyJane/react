import PropTypes from 'prop-types'

function Button({ children, version, type, onClick, isDisabled }) {
    return (
        <button
            type={type}
            className={`btn ${version ? 'is-' + version : ''}`}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false,
    onClick: null
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button