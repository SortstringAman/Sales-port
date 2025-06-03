export const reactSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '50px',
    height: '44px',
    width: '100%',
    fontSize: '14px',
    borderColor: state.isFocused ? '#7F56DA' : base.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #7F56DA' : base.boxShadow,
    '&:hover': {
      borderColor: '#7F56DA',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    height: '40px',
    padding: '0 8px',
    fontSize: '14px',
  }),
  placeholder: (base) => ({
    ...base,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#999',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '14px',
    backgroundColor: state.isSelected
      ? '#ddd'
      : state.isFocused
      ? '#f0f0f0'
      : 'white',
    color: 'black',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};
