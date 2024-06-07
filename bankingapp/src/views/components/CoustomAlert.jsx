

// eslint-disable-next-line react/prop-types
const CoustomAlert = ({title}) => {
  return (
    <div role="alert" className="alert alert-success" >
      <span>{title}</span>
    </div>
  );
};

export default CoustomAlert;
