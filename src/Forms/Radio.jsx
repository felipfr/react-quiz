import PropTypes from 'prop-types';

const Radio = ({ options, value, setValue, ...props }) => {
  return (
    <>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={({ target }) => setValue(target.value)}
            {...props}
          />
          {option}
        </label>
      ))}
    </>
  );
};

Radio.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default Radio;
